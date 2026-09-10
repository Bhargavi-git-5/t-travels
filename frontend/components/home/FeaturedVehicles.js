import { api } from "@/lib/api";
import { FALLBACK_VEHICLES } from "@/lib/data";
import VehicleCard from "@/components/vehicle/VehicleCard";
import Button from "@/components/ui/Button";

// Server Component: fetches directly from the Express API at request
// time. If the backend isn't running yet (e.g. you're only working on
// the frontend so far), we fall back to demo data instead of crashing
// the page - useful while you're still wiring things up.
export default async function FeaturedVehicles() {
  let vehicles = FALLBACK_VEHICLES;
  try {
    const data = await api.getVehicles();
    if (Array.isArray(data) && data.length > 0) vehicles = data.slice(0, 4);
  } catch {
    // API not reachable yet - fallback data above is used instead
  }

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-20 sm:mt-28">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-ink">Available right now</h2>
          <p className="text-ink/60 text-sm mt-1">Equipment ready to book near you</p>
        </div>
        <Button variant="ghost" href="/vehicles" className="hidden sm:inline-flex">
          View all
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {vehicles.map((v) => (
          <VehicleCard key={v._id} vehicle={v} />
        ))}
      </div>
    </section>
  );
}
