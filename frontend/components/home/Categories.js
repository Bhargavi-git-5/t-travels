import Link from "next/link";
import { VEHICLE_CATEGORIES } from "@/lib/data";
import VehicleImage from "@/components/vehicle/VehicleImage";

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 -mt-10 sm:-mt-14 relative z-10">
      <div className="bg-concrete rounded-sm shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-5 sm:p-7 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {VEHICLE_CATEGORIES.map((c) => (
          <Link
            key={c.type}
            href={`/vehicles?type=${c.type}`}
            className="group border border-ink/10 rounded-sm p-3 sm:p-4 hover:border-signal transition-colors"
          >
            <VehicleImage imageKey={c.imageKey} alt={c.type} className="h-24 sm:h-28 rounded-sm bg-steel/10" />
            <p className="mt-2 font-display text-sm sm:text-base text-ink">{c.type}</p>
            <p className="text-xs text-ink/50 hidden sm:block">{c.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
