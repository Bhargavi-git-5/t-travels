import { HOW_IT_WORKS_STEPS } from "@/lib/data";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-5 sm:px-8 mt-24 sm:mt-32">
      <h2 className="font-display text-2xl sm:text-3xl text-ink mb-10">How T-Travels works</h2>

      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {HOW_IT_WORKS_STEPS.map((s, i) => (
          <li key={s.step} className="relative pl-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-display text-3xl text-signal">{s.step}</span>
              {i < HOW_IT_WORKS_STEPS.length - 1 && (
                <span className="hidden lg:block h-px flex-1 bg-ink/10" />
              )}
            </div>
            <p className="font-display text-lg text-ink mb-1.5">{s.title}</p>
            <p className="text-sm text-ink/60">{s.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
