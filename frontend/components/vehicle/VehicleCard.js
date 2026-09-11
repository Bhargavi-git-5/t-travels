import Link from "next/link";
import VehicleImage from "@/components/vehicle/VehicleImage";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function VehicleCard({ vehicle }) {
  const isAvailable = vehicle.availabilityStatus === "available";

  return (
    <div className="group border border-ink/10 rounded-sm bg-concrete overflow-hidden flex flex-col hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-shadow">
      <VehicleImage imageKey={vehicle.imageKey} alt={vehicle.name} className="h-36 sm:h-40 bg-steel/10" />

      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-lg text-ink leading-tight">{vehicle.name}</p>
            <p className="text-xs text-ink/50">{vehicle.type}</p>
          </div>
          <Badge status={vehicle.availabilityStatus} />
        </div>

        <div className="text-sm text-ink/70 space-y-1">
          <p>Driver: {vehicle.driverName}</p>
          <p>Contact: {vehicle.driverPhone}</p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <p className="font-display text-xl text-ink">
            ₹{vehicle.pricePerHour}
            <span className="text-xs text-ink/50 font-body">/hour</span>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" href={`/vehicles/${vehicle._id}`}>
              Details
            </Button>
            <Button
              variant={isAvailable ? "primary" : "ghost"}
              href={`/vehicles/${vehicle._id}`}
              disabled={!isAvailable}
            >
              Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
