import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const APPOINTMENT_STATUSES = ["Pending", "Confirmed", "Cancelled", "Completed"] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

export interface AppointmentRow {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  preferred_date: string | null;
  preferred_service: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const submitSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(40),
  email: z.union([z.string().trim().email("Please enter a valid email"), z.literal("")]).optional(),
  preferred_date: z.string().trim().min(1, "Please choose a preferred date"),
  preferred_service: z.string().trim().min(1, "Please select a service").max(120),
  message: z.string().trim().max(2000).optional(),
});

export const submitAppointment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("appointments").insert({
      full_name: data.full_name,
      phone: data.phone,
      email: data.email ? data.email : null,
      preferred_date: data.preferred_date,
      preferred_service: data.preferred_service,
      message: data.message ? data.message : null,
      status: "Pending",
    });

    if (error) {
      console.error("appointment insert failed", error.message);
      throw new Error("We couldn't save your request. Please try again or call the hospital.");
    }

    return { ok: true as const };
  });

async function assertStaff(context: { supabase: unknown; userId: string }) {
  const supabase = context.supabase as {
    rpc: (
      fn: "is_staff",
      args: { _user_id: string },
    ) => Promise<{ data: boolean | null; error: { message: string } | null }>;
  };
  const { data, error } = await supabase.rpc("is_staff", { _user_id: context.userId });
  if (error || !data) throw new Error("Forbidden");
}

export const getStaffAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("is_staff", { _user_id: context.userId });
    return { isStaff: Boolean(data) };
  });

export const listAppointments = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context);
    const { data, error } = await context.supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as AppointmentRow[];
  });

export const updateAppointmentStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(APPOINTMENT_STATUSES) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertStaff(context);
    const { error } = await context.supabase
      .from("appointments")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteAppointment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertStaff(context);
    const { error } = await context.supabase.from("appointments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
