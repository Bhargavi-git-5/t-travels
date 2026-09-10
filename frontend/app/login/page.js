"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await login(form.email, form.password);
      const next = searchParams.get("next");
      router.push(next || (data.role === "driver" ? "/driver/dashboard" : "/dashboard"));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16 sm:py-24">
      <h1 className="font-display text-3xl text-ink mb-2">Log in</h1>
      <p className="text-ink/60 text-sm mb-8">
        Demo logins: driver@ttravels.demo / customer@ttravels.demo, password: password123
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>

        {error && <p className="text-sm text-rust">{error}</p>}

        <Button type="submit" variant="primary" disabled={submitting} className="w-full">
          {submitting ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <p className="text-sm text-ink/60 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-signal hover:underline">Sign up</Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
