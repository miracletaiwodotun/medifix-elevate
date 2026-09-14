import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useMemo, useState } from "react";
import { CalendarDays, LogOut, Mail, Phone, Trash2, X } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import {
  APPOINTMENT_STATUSES,
  type AppointmentRow,
  type AppointmentStatus,
  deleteAppointment,
  getStaffAccess,
  listAppointments,
  updateAppointmentStatus,
} from "@/lib/appointments.functions";

export const Route = createFileRoute("/_authenticated/admin/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments Dashboard | Medifix Hospital Limited" },
      {
        name: "description",
        content: "Internal dashboard for Medifix Hospital staff to manage appointment requests.",
      },
      { property: "og:title", content: "Appointments Dashboard | Medifix Hospital Limited" },
      {
        property: "og:description",
        content: "Internal dashboard for managing Medifix Hospital appointment requests.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppointmentsDashboard,
});

const STATUS_STYLES: Record<string, string> = {
  Pending: "border-amber-300 bg-amber-50 text-amber-800",
  Confirmed: "border-teal/40 bg-teal-soft text-brand",
  Cancelled: "border-destructive/30 bg-destructive/10 text-destructive",
  Completed: "border-border bg-surface text-muted-foreground",
};

function AppointmentsDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchAccess = useServerFn(getStaffAccess);
  const fetchList = useServerFn(listAppointments);
  const setStatus = useServerFn(updateAppointmentStatus);
  const removeOne = useServerFn(deleteAppointment);

  const [filter, setFilter] = useState<"All" | AppointmentStatus>("All");
  const [selected, setSelected] = useState<AppointmentRow | null>(null);

  const access = useQuery({
    queryKey: ["staff-access"],
    queryFn: async () => {
      console.log("getStaffAccess is being called");
  
      const { data: sessionData } = await supabase.auth.getSession();
  
      console.log("BROWSER SESSION USER ID:", sessionData.session?.user?.id);
      console.log("BROWSER SESSION EMAIL:", sessionData.session?.user?.email);
      console.log("HAS ACCESS TOKEN:", !!sessionData.session?.access_token);
  
      try {
        const result = await fetchAccess();
        console.log("getStaffAccess result:", result);
        return result;
      } catch (error) {
        console.error("getStaffAccess ERROR:", error);
        throw error;
      }
    },
  });
  const isStaff = access.data?.isStaff === true;

  const appointments = useQuery({
    queryKey: ["appointments"],
    queryFn: () => fetchList(),
    enabled: isStaff,
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: AppointmentStatus }) => setStatus({ data: vars }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["appointments"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => removeOne({ data: { id } }),
    onSuccess: () => {
      setSelected(null);
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  const rows = useMemo(() => {
    const all = appointments.data ?? [];
    return filter === "All" ? all : all.filter((a) => a.status === filter);
  }, [appointments.data, filter]);

  const counts = useMemo(() => {
    const all = appointments.data ?? [];
    return APPOINTMENT_STATUSES.reduce<Record<string, number>>(
      (acc, s) => ({ ...acc, [s]: all.filter((a) => a.status === s).length }),
      {},
    );
  }, [appointments.data]);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (access.isLoading) {
    return <Shell onSignOut={signOut}>Checking your access…</Shell>;
  }

  if (!isStaff) {
    return (
      <Shell onSignOut={signOut}>
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="font-display text-xl font-bold text-brand">Access not granted</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account is signed in but has not been granted hospital staff access. Ask an
            administrator to assign your account the <strong>staff</strong> or{" "}
            <strong>admin</strong> role.
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell onSignOut={signOut}>
      <div className="flex flex-wrap items-center gap-2">
        {(["All", ...APPOINTMENT_STATUSES] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              filter === s
                ? "border-teal bg-teal-soft text-brand"
                : "border-border bg-card text-muted-foreground hover:border-teal/50"
            }`}
          >
            {s}
            {s !== "All" ? ` (${counts[s] ?? 0})` : ` (${appointments.data?.length ?? 0})`}
          </button>
        ))}
      </div>

      {appointments.isLoading ? (
        <p className="mt-8 text-sm text-muted-foreground">Loading appointment requests…</p>
      ) : appointments.isError ? (
        <p className="mt-8 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Could not load appointment requests.
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-border bg-card px-5 py-8 text-center text-sm text-muted-foreground">
          No appointment requests {filter === "All" ? "yet" : `with status "${filter}"`}.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Service</th>
                <th className="px-5 py-4">Preferred date</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-border/60 last:border-0">
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelected(row)}
                      className="font-semibold text-brand underline-offset-4 hover:underline"
                    >
                      {row.full_name}
                    </button>
                    <span className="block text-xs text-muted-foreground">{row.phone}</span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {row.preferred_service ?? "—"}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{row.preferred_date ?? "—"}</td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={row.status}
                      onChange={(e) =>
                        statusMutation.mutate({
                          id: row.id,
                          status: e.target.value as AppointmentStatus,
                        })
                      }
                      className={`rounded-full border px-3 py-1.5 text-xs font-semibold outline-none ${
                        STATUS_STYLES[row.status] ?? "border-border bg-surface"
                      }`}
                    >
                      {APPOINTMENT_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setSelected(row)}
                      className="mr-2 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-brand hover:border-teal hover:text-teal"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete request from ${row.full_name}`}
                      onClick={() => {
                        if (window.confirm(`Delete the request from ${row.full_name}?`)) {
                          deleteMutation.mutate(row.id);
                        }
                      }}
                      className="rounded-full border border-destructive/30 p-2 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-brand-deep/50 px-4 py-10">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-7 shadow-lift">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-brand">{selected.full_name}</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Submitted {new Date(selected.created_at).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close details"
                onClick={() => setSelected(null)}
                className="rounded-full border border-border p-2 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <dl className="mt-6 space-y-3 text-sm">
              <DetailRow icon={Phone} label="Phone" value={selected.phone} />
              <DetailRow icon={Mail} label="Email" value={selected.email ?? "—"} />
              <DetailRow
                icon={CalendarDays}
                label="Preferred date"
                value={selected.preferred_date ?? "—"}
              />
              <DetailRow
                icon={CalendarDays}
                label="Service"
                value={selected.preferred_service ?? "—"}
              />
            </dl>

            <div className="mt-5 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
              {selected.message?.trim() ? selected.message : "No message provided."}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {APPOINTMENT_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    statusMutation.mutate({ id: selected.id, status: s });
                    setSelected({ ...selected, status: s });
                  }}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                    selected.status === s
                      ? "border-teal bg-teal-soft text-brand"
                      : "border-border text-muted-foreground hover:border-teal/50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Delete the request from ${selected.full_name}?`)) {
                  deleteMutation.mutate(selected.id);
                }
              }}
              className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete this request
            </button>
          </div>
        </div>
      ) : null}
    </Shell>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-soft text-brand">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
        <dd className="font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}

function Shell({
  children,
  onSignOut,
}: {
  children: React.ReactNode;
  onSignOut: () => void;
}) {
  return (
    <main className="min-h-screen bg-surface px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="eyebrow">Medifix Hospital Limited</p>
            <h1 className="mt-2 font-display text-2xl font-bold text-brand sm:text-3xl">
              Appointment requests
            </h1>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-brand hover:border-teal hover:text-teal"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </header>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}
