"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import VehicleImage from "@/components/vehicle/VehicleImage";

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden diagonal-divider pb-20 sm:pb-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-concrete">
            Heavy equipment,
            <br />
            booked by the hour.
          </h1>
          <p className="mt-5 text-concrete/70 text-base sm:text-lg max-w-md">
            JCBs, cranes, tractors, excavators and more — from verified local
            drivers. See the price before you book, no calls needed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" href="/vehicles">
              Browse the fleet
            </Button>
            <Button variant="outline" href="/signup" className="!border-concrete/30 !text-concrete hover:!bg-concrete hover:!text-ink">
              List your vehicle
            </Button>
          </div>

          <dl className="mt-10 flex gap-8">
            <div>
              <dt className="text-2xl font-display text-signal">8+</dt>
              <dd className="text-xs text-concrete/60 mt-1">Equipment types</dd>
            </div>
            <div>
              <dt className="text-2xl font-display text-signal">₹/hr</dt>
              <dd className="text-xs text-concrete/60 mt-1">Transparent pricing</dd>
            </div>
            <div>
              <dt className="text-2xl font-display text-signal">Instant</dt>
              <dd className="text-xs text-concrete/60 mt-1">Driver notification</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative h-64 sm:h-80 lg:h-96 group"
        >
          <VehicleImage imageKey="crane" alt="Crane" className="absolute inset-0 rounded-sm" />
        </motion.div>
      </div>
    </section>
  );
}
