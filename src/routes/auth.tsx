import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Sign In | Medifix Hospital Limited" },
      {
        name: "description",
        content:
          "Secure sign-in for authorised Medifix Hospital Limited staff to manage patient appointment requests.",
      },
      { property: "og:title", content: "Staff Sign In | Medifix Hospital Limited" },
      {
        property: "og:description",
        content: "Secure sign-in for authorised Medifix Hospital staff.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const FIELD =
  "mt-2 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/25";
const LABEL = "block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground";

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/appointments", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      if (mode === "signin") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
        navigate({ to: "/admin/appointments", replace: true });
      } else {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/appointments` },
        });
        if (err) throw err;
        setNotice(
          "Account created. An administrator must grant you staff access before the dashboard opens.",
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in failed. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin/appointments", replace: true });
  }

  return (
    <main className="grid min-h-screen place-items-center bg-surface px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-lift">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-brand"
        >
          <span aria-hidden="true">←</span> Back to home page
        </Link>

        <h1 className="mt-4 font-display text-2xl font-bold text-brand">Hospital staff sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access to appointment requests is restricted to authorised Medifix staff.
        </p>

        <form onSubmit={onSubmit} className="mt-7">
          <div>
            <label className={LABEL} htmlFor="auth-email">
              Work email
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={FIELD}
            />
          </div>
          <div className="mt-5">
            <label className={LABEL} htmlFor="auth-password">
              Password
            </label>
            <div className="relative">
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${FIELD} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-brand"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="mt-7 w-full rounded-full gradient-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create staff account"}
          </button>
        </form>

        <button
          type="button"
          onClick={onGoogle}
          className="mt-3 w-full rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-brand transition-colors hover:border-teal hover:text-teal"
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setNotice(null);
          }}
          className="mt-5 w-full text-xs font-medium text-muted-foreground underline underline-offset-4"
        >
          {mode === "signin"
            ? "Need a staff account? Create one"
            : "Already have an account? Sign in"}
        </button>

        {error ? (
          <p className="mt-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        {notice ? (
          <p className="mt-5 rounded-xl border border-teal/30 bg-teal-soft px-4 py-3 text-sm text-brand">
            {notice}
          </p>
        ) : null}
      </div>
    </main>
  );
}
