import Link from "next/link";

const VEHICLE_TYPES = ["JCB", "Tractor", "Lorry", "Excavator", "Crane", "Bulldozer", "Loader", "Trailer"];

export default function Footer() {
  return (
    <footer className="bg-ink text-concrete mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid grid-cols-1 sm:grid-cols-4 gap-10">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-6 bg-signal" />
            <span className="font-display text-xl">T-TRAVELS</span>
          </div>
          <p className="text-concrete/70 text-sm max-w-sm">
            Hourly rental for heavy vehicles and equipment. Verified drivers,
            transparent pricing, booked in minutes.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium mb-3 text-concrete/90">Equipment</p>
          <ul className="space-y-2">
            {VEHICLE_TYPES.slice(0, 4).map((t) => (
              <li key={t}>
                <Link href={`/vehicles?type=${t}`} className="text-sm text-concrete/70 hover:text-concrete">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium mb-3 text-concrete/90">More equipment</p>
          <ul className="space-y-2">
            {VEHICLE_TYPES.slice(4).map((t) => (
              <li key={t}>
                <Link href={`/vehicles?type=${t}`} className="text-sm text-concrete/70 hover:text-concrete">
                  {t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-concrete/10 px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto">
        <p className="text-xs text-concrete/50">© {new Date().getFullYear()} T-Travels. Built as a learning project.</p>
        <p className="text-xs text-concrete/50">Demo data — not a live booking service.</p>
      </div>
    </footer>
  );
}
