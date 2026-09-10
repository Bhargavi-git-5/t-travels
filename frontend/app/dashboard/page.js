"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

function bookingBadgeStatus(status) {
  if (status === "confirmed" || status === "completed") return "available";
  if (status === "pending") return "offline";
  return "booked"; // rejected / cancelled
}

export default function CustomerDashboard() {
  const { user, token, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading || !token) return;
    api
      .getMyBookings(token)
      .then(setBookings)
      .finally(() => setLoading(false));
  }, [token, authLoading]);

  if (!authLoading && !user) {
    return (
      <div className="max-w-lg mx-auto px-5 py-16 text-center">
        <p className="text-ink/70 mb-4">Log in to see your bookings.</p>
        <Button variant="primary" href="/login">Log in</Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <h1 className="font-display text-3xl text-ink mb-1">My bookings</h1>
      <p className="text-ink/60 text-sm mb-8">{user ? `Welcome back, ${user.name.split(" ")[0]}.` : ""}</p>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : bookings.length === 0 ? (
        <div className="border border-dashed border-ink/20 rounded-sm p-12 text-center">
          <p className="font-display text-lg text-ink mb-2">No bookings yet</p>
          <p className="text-sm text-ink/60 mb-5">Browse the fleet and book your first vehicle.</p>
          <Button variant="primary" href="/vehicles">Browse the fleet</Button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <Link
              key={b._id}
              href={`/bookings/${b._id}`}
              className="flex items-center justify-between border border-ink/10 rounded-sm p-4 sm:p-5 bg-concrete hover:border-signal transition-colors"
            >
              <div>
                <p className="font-display text-lg text-ink">{b.vehicle?.name}</p>
                <p className="text-xs text-ink/50 mt-0.5">
                  {b.durationHours} hours · ₹{b.totalPrice.toLocaleString("en-IN")}
                </p>
              </div>
              <Badge status={bookingBadgeStatus(b.status)} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
