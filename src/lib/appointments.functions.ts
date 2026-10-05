import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const APPOINTMENT_STATUSES = [
  "Pending",
  "Confirmed",
  "Cancelled",
  "Completed",
] as const;

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
  full_name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(120),

  phone: z
    .string()
    .trim()
    .min(6, "Please enter a valid phone number")
    .max(40),

  email: z
    .union([
      z.string().trim().email("Please enter a valid email"),
      z.literal(""),
    ])
    .optional(),

  preferred_date: z
    .string()
    .trim()
    .min(1, "Please choose a preferred date"),

  preferred_service: z
    .string()
    .trim()
    .min(1, "Please select a service")
    .max(120),

  message: z
    .string()
    .trim()
    .max(2000)
    .optional(),
});

export const submitAppointment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => submitSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    // =========================================================
    // 1. SAVE APPOINTMENT TO SUPABASE
    // =========================================================

    const { error } = await supabaseAdmin
      .from("appointments")
      .insert({
        full_name: data.full_name,
        phone: data.phone,
        email: data.email ? data.email : null,
        preferred_date: data.preferred_date,
        preferred_service: data.preferred_service,
        message: data.message ? data.message : null,
        status: "Pending",
      });

    if (error) {
      console.error(
        "[Appointment] Insert failed:",
        error.message,
      );

      throw new Error(
        "We couldn't save your request. Please try again or call the hospital.",
      );
    }

    console.log(
      "[Appointment] Appointment saved successfully.",
    );

    // =========================================================
    // 2. GET RESEND ENVIRONMENT VARIABLES
    // =========================================================

    const resendApiKey = process.env["RESEND_API_KEY"];
    const doctorEmail = process.env["DOCTOR_EMAIL"];
    const notificationEmail = process.env["NOTIFICATION_EMAIL"];

    console.log(
      "[Resend] API key loaded:",
      Boolean(resendApiKey),
    );

    console.log(
      "[Resend] Doctor email configured:",
      Boolean(doctorEmail),
    );

    // =========================================================
    // 3. CHECK RESEND CONFIGURATION
    // =========================================================

    if (!resendApiKey || !doctorEmail || !notificationEmail) {
      console.error(
        "[Resend] Missing RESEND_API_KEY, DOCTOR_EMAIL, or NOTIFICATION_EMAIL.",
      );

      // The appointment was already saved successfully,
      // so don't make the patient's booking fail.
      return { ok: true as const };
    }

    // =========================================================
    // 4. SEND EMAIL DIRECTLY THROUGH RESEND API
    // =========================================================

    try {
      console.log(
        "[Resend] Sending appointment notification...",
      );

      const response = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            from: "Medifix Hospital Limited <no-reply@medifixhospital.com>",

            to: [doctorEmail, notificationEmail],

            subject: `New Appointment Request - ${data.full_name}`,

            text: `
New Appointment Request

Patient Name: ${data.full_name}
Phone Number: ${data.phone}
Email: ${data.email || "Not provided"}

Preferred Date:
${data.preferred_date}

Preferred Service:
${data.preferred_service}

Message:
${data.message || "No message provided"}

Status:
Pending

Please log in to the Medifix Hospital appointment dashboard to review this request.
            `.trim(),
          }),
        },
      );

      const responseText = await response.text();

      console.log(
        "[Resend] HTTP status:",
        response.status,
      );

      console.log(
        "[Resend] Response:",
        responseText,
      );

      // =======================================================
      // 5. CHECK WHETHER RESEND ACCEPTED THE EMAIL
      // =======================================================

      if (!response.ok) {
        console.error(
          "[Resend] Email sending failed:",
          responseText,
        );
      } else {
        try {
          const result = JSON.parse(responseText);

          console.log(
            "[Resend] Email sent successfully.",
          );

          console.log(
            "[Resend] Email ID:",
            result.id,
          );
        } catch {
          console.log(
            "[Resend] Email request succeeded.",
          );
        }
      }
    } catch (error) {
      console.error(
        "[Resend] Request failed:",
        error,
      );
    }

    // =========================================================
    // 6. APPOINTMENT WAS SAVED SUCCESSFULLY
    // =========================================================

    return {
      ok: true as const,
    };
  });

// =============================================================
// STAFF ACCESS
// =============================================================

async function assertStaff(context: {
  supabase: unknown;
  userId: string;
}) {
  const supabase = context.supabase as {
    rpc: (
      fn: "is_staff",
      args: { _user_id: string },
    ) => Promise<{
      data: boolean | null;
      error: { message: string } | null;
    }>;
  };

  const { data, error } = await supabase.rpc(
    "is_staff",
    {
      _user_id: context.userId,
    },
  );

  if (error || !data) {
    throw new Error("Forbidden");
  }
}

// =============================================================
// GET STAFF ACCESS
// =============================================================

export const getStaffAccess = createServerFn({
  method: "GET",
})
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc(
      "is_staff",
      {
        _user_id: context.userId,
      },
    );

    return {
      isStaff: Boolean(data),
    };
  });

// =============================================================
// LIST APPOINTMENTS
// =============================================================

export const listAppointments = createServerFn({
  method: "GET",
})
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context);

    const { data, error } = await context.supabase
      .from("appointments")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as AppointmentRow[];
  });

// =============================================================
// UPDATE APPOINTMENT STATUS
// =============================================================

export const updateAppointmentStatus = createServerFn({
  method: "POST",
})
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(APPOINTMENT_STATUSES),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertStaff(context);

    const { error } = await context.supabase
      .from("appointments")
      .update({
        status: data.status,
      })
      .eq("id", data.id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      ok: true as const,
    };
  });

// =============================================================
// DELETE APPOINTMENT
// =============================================================

export const deleteAppointment = createServerFn({
  method: "POST",
})
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertStaff(context);

    const { error } = await context.supabase
      .from("appointments")
      .delete()
      .eq("id", data.id);

    if (error) {
      throw new Error(error.message);
    }

    return {
      ok: true as const,
    };
  });