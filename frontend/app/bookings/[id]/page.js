"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const STATUS_COPY = {
  pending: "Waiting for the driver to confirm this booking.",
  confirmed: "Confirmed. The vehicle is reserved for your slot.",
  rejected: "The driver was unable to accept this booking.",
  cancelled: "This booking was cancelled.",
  completed: "This rental has been completed.",
};

export default function BookingConfirmationPage() {
  const { id } = useParams();
  const { token, loading: authLoading } = useAuth();
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!token) {
      setError("Log in to view this booking.");
      return;
    }
    api
      .getBooking(id, token)
      .then(setBooking)
      .catch((err) => setError(err.message));
  }, [id, token, authLoading]);

  if (error) {
    return (
      <div className="max-w-lg mx-auto px-5 py-16 text-center">
        <p className="text-ink/70">{error}</p>
        <Button variant="primary" href="/login" className="mt-5">
          Log in
        </Button>
      </div>
    );
  }

  if (!booking) {
    return <div className="max-w-lg mx-auto px-5 py-16 text-center text-ink/50">Loading booking…</div>;
  }

  return (
    <div className="max-w-lg mx-auto px-5 py-14 sm:py-20">
      <div className="border border-ink/10 rounded-sm p-6 sm:p-8 bg-concrete">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-moss" />
          <p className="text-sm text-ink/60">Booking confirmation</p>
        </div>
        <h1 className="font-display text-2xl text-ink mb-1">{booking.vehicle?.name}</h1>
        <Badge status={booking.status === "confirmed" ? "available" : booking.status === "pending" ? "offline" : "booked"} />

        <p className="text-sm text-ink/70 mt-4">{STATUS_COPY[booking.status]}</p>

        <div className="mt-6 pt-5 border-t border-ink/10 space-y-2.5 text-sm">
          <div className="flex justify-between">
            <span className="text-ink/50">Duration</span>
            <span className="text-ink">{booking.durationHours} hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/50">Rate</span>
            <span className="text-ink">₹{booking.pricePerHourAtBooking}/hour</span>
          </div>
          <div className="flex justify-between font-medium">
            <span className="text-ink/70">Total</span>
            <span className="text-ink">₹{booking.totalPrice.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div className="mt-6">
          <Link href="/dashboard" className="text-sm text-signal hover:underline">
            View all my bookings →
          </Link>
        </div>
      </div>
    </div>
  );
}
