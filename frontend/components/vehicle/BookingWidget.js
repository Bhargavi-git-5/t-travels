"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import Button from "@/components/ui/Button";

export default function BookingWidget({ vehicle }) {
  const { user, token } = useAuth();
  const router = useRouter();

  const [hours, setHours] = useState(4);
  const [startTime, setStartTime] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Calculated client-side purely for instant feedback as the person
  // adjusts the slider. The backend recalculates this same number from
  // the vehicle's price at booking time and never trusts this value -
  // see booking.controller.js on the backend for why that matters.
  const totalPrice = useMemo(() => vehicle.pricePerHour * hours, [vehicle.pricePerHour, hours]);

  const isAvailable = vehicle.availabilityStatus === "available";

  async function handleBook() {
    setError("");

    if (!user) {
      router.push(`/login?next=/vehicles/${vehicle._id}`);
      return;
    }

    if (user.role !== "customer") {
      setError("Only customer accounts can book vehicles. Log in as a customer to continue.");
      return;
    }

    if (!startTime) {
      setError("Please choose a start date and time.");
      return;
    }

    setSubmitting(true);
    try {
      const booking = await api.createBooking(
        { vehicleId: vehicle._id, durationHours: hours, startTime },
        token
      );
      router.push(`/bookings/${booking._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border border-ink/10 rounded-sm bg-concrete p-5 sm:p-6 sticky top-24">
      <p className="font-display text-2xl text-ink">
        ₹{vehicle.pricePerHour}
        <span className="text-sm text-ink/50 font-body">/hour</span>
      </p>

      {!isAvailable && (
        <p className="mt-2 text-sm text-rust">
          This vehicle is currently {vehicle.availabilityStatus} and can&apos;t be booked right now.
        </p>
      )}

      <div className="mt-5">
        <label className="text-sm text-ink/70 flex justify-between mb-2">
          <span>Duration</span>
          <span className="font-medium text-ink">{hours} hour{hours > 1 ? "s" : ""}</span>
        </label>
        <input
          type="range"
          min="1"
          max="24"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          disabled={!isAvailable}
          className="w-full accent-signal"
        />
      </div>

      <div className="mt-4">
        <label className="text-sm text-ink/70 block mb-2" htmlFor="startTime">
          Start date &amp; time
        </label>
        <input
          id="startTime"
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          disabled={!isAvailable}
          className="w-full border border-ink/20 rounded-sm px-3 py-2 text-sm bg-white disabled:opacity-50"
        />
      </div>

      <div className="mt-5 pt-4 border-t border-ink/10 flex items-center justify-between">
        <span className="text-sm text-ink/60">Total</span>
        <span className="font-display text-xl text-ink">
          ₹{vehicle.pricePerHour} × {hours} = ₹{totalPrice.toLocaleString("en-IN")}
        </span>
      </div>

      {error && <p className="mt-3 text-sm text-rust">{error}</p>}

      <Button
        variant="primary"
        onClick={handleBook}
        disabled={!isAvailable || submitting}
        className="w-full mt-5"
      >
        {submitting ? "Booking…" : isAvailable ? "Book now" : "Unavailable"}
      </Button>

      {!user && (
        <p className="mt-3 text-xs text-ink/50 text-center">
          You&apos;ll need to log in or sign up to complete a booking.
        </p>
      )}
    </div>
  );
}
