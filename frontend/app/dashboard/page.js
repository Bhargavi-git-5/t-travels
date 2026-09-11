"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { playChime } from "@/lib/playChime";
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
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [soundOn, setSoundOn] = useState(true);

  const seenIds = useRef(new Set());

  function applyNotifications(list, { isFirstLoad = false } = {}) {
    const newOnes = list.filter((n) => !seenIds.current.has(n._id));
    list.forEach((n) => seenIds.current.add(n._id));
    setNotifications(list);
    if (!isFirstLoad && newOnes.length > 0 && soundOn) {
      playChime();
    }
  }

  useEffect(() => {
    if (authLoading || !token) return;

    Promise.all([api.getMyBookings(token), api.getNotifications(token)])
      .then(([b, n]) => {
        setBookings(b);
        applyNotifications(n, { isFirstLoad: true });
      })
      .finally(() => setLoading(false));

    // Poll for updates (a booking getting confirmed/rejected by the
    // driver, or a new notification) every 15 seconds.
    const interval = setInterval(() => {
      Promise.all([api.getMyBookings(token), api.getNotifications(token)]).then(([b, n]) => {
        setBookings(b);
        applyNotifications(n);
      });
    }, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-3xl text-ink">My bookings</h1>
        <button
          onClick={() => setSoundOn((s) => !s)}
          className="text-xs text-ink/60 border border-ink/15 rounded-sm px-2.5 py-1 hover:bg-concretedark"
          title={soundOn ? "Sound on - click to mute" : "Sound off - click to unmute"}
        >
          {soundOn ? "🔔 Sound on" : "🔕 Muted"}
        </button>
      </div>
      <p className="text-ink/60 text-sm mb-8">{user ? `Welcome back, ${user.name.split(" ")[0]}.` : ""}</p>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          <div>
            {bookings.length === 0 ? (
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

          <aside>
            <h2 className="font-display text-lg text-ink mb-4">Notifications</h2>
            <div className="space-y-2">
              {notifications.length === 0 ? (
                <p className="text-sm text-ink/50">Nothing yet.</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    className={`text-sm rounded-sm p-3 border ${
                      n.isRead ? "border-ink/10 text-ink/60" : "border-signal/40 bg-signal/5 text-ink"
                    }`}
                  >
                    {n.message}
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
