import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { processSteps } from "../data/process";
import { easeOut } from "../lib/motion";

const AUTO_ADVANCE_MS = 4200;

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % processSteps.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-trilot-paper text-trilot-navy"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-trilot-blue/15 blur-3xl"
      />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-trilot-coral">
              HOW WE WORK
            </p>

            <h2
              id="process-heading"
              className="mt-6 max-w-[8ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl lg:text-8xl"
            >
              Good work starts before the first pixel.
            </h2>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-trilot-navy/60 sm:text-lg">
              We make the path clear, collaborative, and grounded in what the
              work needs to achieve.
            </p>
          </div>

          <div className="relative">
            <div className="mb-10 hidden items-center justify-between sm:flex">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/40">
                The signal path
              </span>

              <span className="font-mono text-[0.6rem] tracking-[0.12em] text-trilot-navy/40">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(processSteps.length).padStart(2, "0")}
              </span>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute left-3 top-3 hidden h-px w-[calc(100%-1.5rem)] bg-trilot-navy/15 sm:block"
              />

              <motion.div
                aria-hidden="true"
                className="absolute left-3 top-3 hidden h-px origin-left bg-trilot-coral sm:block"
                initial={false}
                animate={{
                  width: `${(activeIndex / (processSteps.length - 1)) * 100}%`,
                }}
                transition={{
                  duration: reduceMotion ? 0 : 0.6,
                  ease: easeOut,
                }}
                style={{
                  maxWidth: "calc(100% - 1.5rem)",
                }}
              />

              <div className="grid gap-0 sm:grid-cols-4">
                {processSteps.map((step, index) => {
                  const isActive = index === activeIndex;
                  const isComplete = index < activeIndex;

                  return (
                    <button
                      key={step.number}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show step ${step.number}: ${step.title}`}
                      className="group relative flex gap-4 border-b border-trilot-navy/15 py-6 text-left sm:block sm:border-b-0 sm:px-3 sm:py-0 sm:first:pl-0 sm:last:pr-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
                    >
                      <span
                        className={[
                          "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-trilot-paper transition-all duration-500",
                          isActive
                            ? "border-trilot-coral bg-trilot-coral"
                            : isComplete
                              ? "border-trilot-coral"
                              : "border-trilot-navy/25 group-hover:border-trilot-navy/60",
                        ].join(" ")}
                      >
                        {isActive ? (
                          <span className="h-2 w-2 rounded-full bg-trilot-navy" />
                        ) : null}
                      </span>

                      <span className="block sm:mt-7">
                        <span
                          className={[
                            "block font-mono text-[0.6rem] tracking-[0.12em] transition-colors",
                            isActive
                              ? "text-trilot-coral"
                              : "text-trilot-navy/40",
                          ].join(" ")}
                        >
                          {step.number}
                        </span>

                        <span
                          className={[
                            "mt-2 block font-display text-xl font-semibold tracking-tighter transition-colors sm:text-2xl",
                            isActive
                              ? "text-trilot-navy"
                              : "text-trilot-navy/45 group-hover:text-trilot-navy/75",
                          ].join(" ")}
                        >
                          {step.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-10 min-h-36 border-t border-trilot-navy/15 pt-7 sm:mt-16">
              <motion.div
                key={activeIndex}
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 12 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.15 : 0.4,
                  ease: easeOut,
                }}
                className="max-w-xl"
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-trilot-navy/40">
                  Step {processSteps[activeIndex].number}
                </span>

                <p className="mt-4 max-w-lg font-display text-2xl font-semibold leading-[0.95] tracking-tighter sm:text-4xl">
                  {processSteps[activeIndex].description}
                </p>
              </motion.div>

              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 hidden h-28 w-28 rounded-full border border-trilot-blue/40 sm:block"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}