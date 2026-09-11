import Image from "next/image";

// Real photos live in /public/images/vehicles/, one per vehicle type,
// named to match each vehicle's `imageKey` field from the database
// (e.g. imageKey: "jcb" -> /public/images/vehicles/jcb.jpg).
//
// Animation is intentionally simple: a slight zoom on hover, driven by
// a Tailwind transition class on the wrapper below - no continuous
// looping motion. The parent element needs the "group" class for the
// hover effect to trigger (already added on VehicleCard, Hero, Categories).
export default function VehicleImage({ imageKey, alt, className = "" }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={`/images/vehicles/${imageKey}.jpg`}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
      />
    </div>
  );
}
