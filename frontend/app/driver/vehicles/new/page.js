"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import Button from "@/components/ui/Button";

const VEHICLE_TYPES = ["JCB", "Tractor", "Lorry", "Excavator", "Crane", "Bulldozer", "Loader", "Trailer"];

export default function AddVehiclePage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    type: "JCB",
    pricePerHour: "",
    driverName: user?.name || "",
    driverPhone: user?.phone || "",
    description: "",
    location: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!authLoading && !user) {
    return (
      <div className="max-w-lg mx-auto px-5 py-16 text-center">
        <p className="text-ink/70 mb-4">Log in as a driver to list a vehicle.</p>
        <Button variant="primary" href="/login">Log in</Button>
      </div>
    );
  }

  if (!authLoading && user && user.role !== "driver") {
    return (
      <div className="max-w-lg mx-auto px-5 py-16 text-center">
        <p className="text-ink/70">Only driver accounts can list vehicles.</p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.pricePerHour || !form.driverName || !form.driverPhone) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      // The vehicle's photo is looked up by its type (jcb.jpg, crane.jpg,
      // etc - see public/images/vehicles/), so we derive imageKey from
      // the chosen type rather than asking the driver to pick an image.
      const payload = {
        ...form,
        imageKey: form.type.toLowerCase(),
        pricePerHour: Number(form.pricePerHour),
      };
      const vehicle = await api.createVehicle(payload, token);
      router.push(`/vehicles/${vehicle._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-14 sm:py-20">
      <h1 className="font-display text-3xl text-ink mb-2">List a vehicle</h1>
      <p className="text-ink/60 text-sm mb-8">
        These driver details are shown to customers and are where booking
        notifications go - they don&apos;t have to match your account
        email, so you can list on behalf of someone else if needed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="name">Vehicle name</label>
          <input
            id="name" type="text" required
            placeholder="e.g. JCB 3DX Super"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-ink/70 block mb-1.5" htmlFor="type">Type</label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
            >
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-ink/70 block mb-1.5" htmlFor="price">Price per hour (₹)</label>
            <input
              id="price" type="number" required min="1"
              value={form.pricePerHour}
              onChange={(e) => setForm({ ...form, pricePerHour: e.target.value })}
              className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-ink/70 block mb-1.5" htmlFor="driverName">Driver name</label>
            <input
              id="driverName" type="text" required
              value={form.driverName}
              onChange={(e) => setForm({ ...form, driverName: e.target.value })}
              className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
            />
          </div>
          <div>
            <label className="text-sm text-ink/70 block mb-1.5" htmlFor="driverPhone">Driver phone</label>
            <input
              id="driverPhone" type="tel" required
              value={form.driverPhone}
              onChange={(e) => setForm({ ...form, driverPhone: e.target.value })}
              className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="location">Location</label>
          <input
            id="location" type="text"
            placeholder="e.g. Machilipatnam, Andhra Pradesh"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>

        <div>
          <label className="text-sm text-ink/70 block mb-1.5" htmlFor="description">Description (optional)</label>
          <textarea
            id="description" rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-ink/20 rounded-sm px-3 py-2.5 text-sm bg-white"
          />
        </div>

        {error && <p className="text-sm text-rust">{error}</p>}

        <Button type="submit" variant="primary" disabled={submitting} className="w-full">
          {submitting ? "Listing…" : "List this vehicle"}
        </Button>
      </form>
    </div>
  );
}
