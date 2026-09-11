"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { playChime } from "@/lib/playChime";
import VehicleImage from "@/components/vehicle/VehicleImage";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function DriverDashboard() {
  const { user, token, loading: authLoading } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState("");
  const [soundOn, setSoundOn] = useState(true);

  // Tracks notification IDs we've already seen/played a sound for, so we
  // only chime on genuinely NEW notifications - not on first load, and not
  // repeatedly for the same one every time the 15s poll re-fetches it.
  const seenIds = useRef(new Set());

  function applyNotifications(list, { isFirstLoad = false } = {}) {
    const newOnes = list.filter((n) => !seenIds.current.has(n._id));
    list.forEach((n) => seenIds.current.add(n._id));
    setNotifications(list);
    if (!isFirstLoad && newOnes.length > 0 && soundOn) {
      playChime();
    }
  }

  async function refresh({ isFirstLoad = false } = {}) {
    const [v, b, n] = await Promise.all([
      api.getMyVehicles(token),
      api.getDriverBookings(token),
      api.getNotifications(token),
    ]);
    setVehicles(v);
    setBookings(b);
    applyNotifications(n, { isFirstLoad });
  }

  useEffect(() => {
    if (authLoading || !token) return;
    refresh({ isFirstLoad: true }).finally(() => setLoading(false));
    // Simple polling for the MVP notification system - see the README
    // for how this gets swapped for Socket.IO push later without
    // changing the data shape.
    const interval = setInterval(() => {
      api.getNotifications(token).then((n) => applyNotifications(n));
    }, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, authLoading]);

  async function respond(bookingId, status) {
    setActionError("");
    try {
      await api.updateBookingStatus(bookingId, status, token);
      await refresh();
    } catch (err) {
      setActionError(err.message);
    }
  }

  if (!authLoading && !user) {
    return (
      <div className="max-w-lg mx-auto px-5 py-16 text-center">
        <p className="text-ink/70 mb-4">Log in as a driver to see your dashboard.</p>
        <Button variant="primary" href="/login">Log in</Button>
      </div>
    );
  }

  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const otherBookings = bookings.filter((b) => b.status !== "pending");

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <h1 className="font-display text-3xl text-ink mb-1">Driver dashboard</h1>
      <p className="text-ink/60 text-sm mb-8">{user ? `Welcome back, ${user.name.split(" ")[0]}.` : ""}</p>

      {loading ? (
        <p className="text-ink/50 text-sm">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          <div>
            <section className="mb-10">
              <h2 className="font-display text-xl text-ink mb-4">Booking requests</h2>
              {actionError && <p className="text-sm text-rust mb-3">{actionError}</p>}
              {pendingBookings.length === 0 ? (
                <p className="text-sm text-ink/50">No pending requests right now.</p>
              ) : (
                <div className="space-y-3">
                  {pendingBookings.map((b) => (
                    <div key={b._id} className="border border-signal/40 bg-signal/5 rounded-sm p-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-ink">{b.vehicle?.name}</p>
                        <p className="text-xs text-ink/60 mt-0.5">
                          {b.customer?.name} · {b.durationHours}h · ₹{b.totalPrice.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button variant="outline" onClick={() => respond(b._id, "rejected")}>Decline</Button>
                        <Button variant="primary" onClick={() => respond(b._id, "confirmed")}>Accept</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display text-xl text-ink">My vehicles</h2>
                <Button variant="outline" href="/driver/vehicles/new">+ List a vehicle</Button>
              </div>
              {vehicles.length === 0 ? (
                <p className="text-sm text-ink/50">No vehicles listed yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {vehicles.map((v) => (
                    <div key={v._id} className="border border-ink/10 rounded-sm p-4 flex gap-3 bg-concrete group">
                      <VehicleImage imageKey={v.imageKey} alt={v.name} className="w-16 h-16 shrink-0 rounded-sm bg-steel/10" />
                      <div>
                        <p className="font-medium text-ink text-sm">{v.name}</p>
                        <p className="text-xs text-ink/50 mb-1.5">₹{v.pricePerHour}/hour</p>
                        <Badge status={v.availabilityStatus} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="font-display text-xl text-ink mb-4">Booking history</h2>
              {otherBookings.length === 0 ? (
                <p className="text-sm text-ink/50">Nothing here yet.</p>
              ) : (
                <div className="space-y-2">
                  {otherBookings.map((b) => (
                    <div key={b._id} className="flex items-center justify-between border border-ink/10 rounded-sm p-3 text-sm">
                      <span className="text-ink/80">{b.vehicle?.name} · {b.customer?.name}</span>
                      <Badge status={b.status === "confirmed" || b.status === "completed" ? "available" : "booked"} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl text-ink">Notifications</h2>
              <button
                onClick={() => setSoundOn((s) => !s)}
                className="text-xs text-ink/60 border border-ink/15 rounded-sm px-2.5 py-1 hover:bg-concretedark"
                title={soundOn ? "Sound on - click to mute" : "Sound off - click to unmute"}
              >
                {soundOn ? "🔔 Sound on" : "🔕 Muted"}
              </button>
            </div>
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
