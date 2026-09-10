import Link from "next/link";
import { api } from "@/lib/api";
import { FALLBACK_VEHICLES, VEHICLE_CATEGORIES } from "@/lib/data";
import VehicleCard from "@/components/vehicle/VehicleCard";

export const metadata = { title: "Browse the fleet — T-Travels" };

// Server Component - reads filters straight from the URL's search params
// (?type=JCB&status=available) so the page is shareable/bookmarkable
// and works even with JavaScript disabled.
export default async function VehiclesPage({ searchParams }) {
  const { type, status, search } = searchParams || {};

  const query = new URLSearchParams();
  if (type) query.set("type", type);
  if (status) query.set("status", status);
  if (search) query.set("search", search);
  const qs = query.toString() ? `?${query.toString()}` : "";

  let vehicles = FALLBACK_VEHICLES;
  try {
    const data = await api.getVehicles(qs);
    vehicles = data;
  } catch {
    // API not reachable - fall back to demo data so the page still renders
  }

  const statuses = ["available", "booked", "offline"];

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl text-ink mb-2">Browse the fleet</h1>
      <p className="text-ink/60 text-sm mb-8">{vehicles.length} vehicles found</p>

      <div className="flex flex-wrap gap-2 mb-8">
        <Link
          href="/vehicles"
          className={`px-3 py-1.5 rounded-sm text-sm border ${
            !type ? "bg-ink text-concrete border-ink" : "border-ink/20 text-ink/70"
          }`}
        >
          All types
        </Link>
        {VEHICLE_CATEGORIES.map((c) => (
          <Link
            key={c.type}
            href={`/vehicles?type=${c.type}${status ? `&status=${status}` : ""}`}
            className={`px-3 py-1.5 rounded-sm text-sm border ${
              type === c.type ? "bg-ink text-concrete border-ink" : "border-ink/20 text-ink/70"
            }`}
          >
            {c.type}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href={`/vehicles${type ? `?type=${type}` : ""}`}
          className={`px-3 py-1.5 rounded-sm text-xs border ${
            !status ? "bg-signal/20 border-signal text-ink" : "border-ink/20 text-ink/60"
          }`}
        >
          Any status
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/vehicles?status=${s}${type ? `&type=${type}` : ""}`}
            className={`px-3 py-1.5 rounded-sm text-xs border capitalize ${
              status === s ? "bg-signal/20 border-signal text-ink" : "border-ink/20 text-ink/60"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      {vehicles.length === 0 ? (
        <div className="border border-dashed border-ink/20 rounded-sm p-12 text-center">
          <p className="font-display text-lg text-ink mb-1">No vehicles match these filters</p>
          <p className="text-sm text-ink/60">Try a different type or status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map((v) => (
            <VehicleCard key={v._id} vehicle={v} />
          ))}
        </div>
      )}
    </div>
  );
}
