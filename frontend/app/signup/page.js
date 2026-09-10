"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", role: "customer" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const data = await signup(form);
      router.push(data.role === "driver" ? "/driver/dashboard" : "/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16 sm:py-24">
      <h1 className="font-display text-3xl text-ink mb-2">Create an account</h1>
      <p className="text-ink/60 text-sm mb-8">Book vehicles as a customer, or list your own as a driver.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {["customer", "driver"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setForm({ ...form, role: r })}
              className={`py-2.5 rounded-sm text-sm border capitalize ${
                form.role === r ? "bg-ink text-concrete border-ink" : "border-ink/20 text-ink/70"
              }`}
            >
              {r === "customer" ? "I want to book" : "I have a vehicle"}
            </button>
          ))}
        </div>

        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="name">Full name</label>
          <input
            id="name" type="text" required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="email">Email</label>
          <input
            id="email" type="email" required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="phone">Phone number</label>
          <input
            id="phone" type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>
        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="password">Password</label>
          <input
            id="password" type="password" required minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>

        {error && <p className="text-sm text-rust">{error}</p>}

        <Button type="submit" variant="primary" disabled={submitting} className="w-full">
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="text-sm text-ink/60 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-signal hover:underline">Log in</Link>
      </p>
    </div>
  );
}
