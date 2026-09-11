import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { FALLBACK_VEHICLES } from "@/lib/data";
import VehicleImage from "@/components/vehicle/VehicleImage";
import Badge from "@/components/ui/Badge";
import BookingWidget from "@/components/vehicle/BookingWidget";

export default async function VehicleDetailPage({ params }) {
  let vehicle = null;
  try {
    vehicle = await api.getVehicle(params.id);
  } catch {
    // Fall back to demo data so the detail page is still browsable
    // even without the backend running.
    vehicle = FALLBACK_VEHICLES.find((v) => v._id === params.id) || null;
  }

  if (!vehicle) notFound();

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-10">
        <div>
          <VehicleImage
            imageKey={vehicle.imageKey}
            alt={vehicle.name}
            className="h-56 sm:h-72 rounded-sm bg-steel/10 mb-6"
          />

          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="font-display text-3xl text-ink">{vehicle.name}</h1>
              <p className="text-ink/50 text-sm mt-1">{vehicle.type}</p>
            </div>
            <Badge status={vehicle.availabilityStatus} />
          </div>

          {vehicle.description && (
            <p className="text-ink/70 text-sm leading-relaxed mb-6">{vehicle.description}</p>
          )}

          <div className="border border-ink/10 rounded-sm p-5 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-ink/50">Driver</p>
              <p className="text-ink font-medium mt-0.5">{vehicle.driverName}</p>
            </div>
            <div>
              <p className="text-ink/50">Contact number</p>
              <p className="text-ink font-medium mt-0.5">{vehicle.driverPhone}</p>
            </div>
            {vehicle.location && (
              <div className="col-span-2">
                <p className="text-ink/50">Location</p>
                <p className="text-ink font-medium mt-0.5">{vehicle.location}</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <BookingWidget vehicle={vehicle} />
        </div>
      </div>
    </div>
  );
}
