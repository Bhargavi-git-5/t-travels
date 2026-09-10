import Button from "@/components/ui/Button";

export default function CTA() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-24 sm:mt-32 mb-24">
      <div className="bg-ink rounded-sm px-6 sm:px-12 py-12 sm:py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div className="max-w-md">
          <h2 className="font-display text-2xl sm:text-3xl text-concrete leading-tight">
            Own a JCB, tractor, or crane sitting idle?
          </h2>
          <p className="text-concrete/60 text-sm mt-3">
            List it on T-Travels and start earning by the hour. You set the
            price, we bring the bookings.
          </p>
        </div>
        <Button variant="primary" href="/signup">
          List your vehicle
        </Button>
      </div>
    </section>
  );
}
