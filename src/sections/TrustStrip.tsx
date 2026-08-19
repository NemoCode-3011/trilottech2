import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Container } from "../components/Container";
import { trustPoints } from "../data/trustpoints";
import { easeOut } from "../lib/motion";

const AUTO_ADVANCE_MS = 4500;

export default function TrustStrip() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activePoint = trustPoints[activeIndex];

  useEffect(() => {
    if (reduceMotion || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % trustPoints.length);
    }, AUTO_ADVANCE_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, reduceMotion]);

  function handleSelect(index: number) {
    setActiveIndex(index);
  }

  return (
    <section
      aria-labelledby="trust-strip-heading"
    className="relative z-20 mt-0 bg-(--color-surface) py-10 sm:py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[8%] top-0 h-40 w-40 rounded-full bg-trilot-blue/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-[10%] h-48 w-48 rounded-full bg-trilot-coral/10 blur-3xl"
      />

      <Container className="relative">
        <div className="overflow-hidden rounded-4xl border border-(--color-surface-inverse)/15 bg-(--color-surface-inverse) p-6 text-(--color-surface) shadow-[0_24px_80px_rgba(16,42,67,0.18)] sm:rounded-[2.5rem] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 border-b border-(--color-surface)/15 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[0.62rem] tracking-[0.14em] text-(--color-accent-on-inverse)">
                THE TRILOT APPROACH
              </p>

              <h2
                id="trust-strip-heading"
                className="mt-3 font-display text-3xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-4xl"
              >
                Built for what comes next.
              </h2>
            </div>

            <span className="font-mono text-[0.6rem] tracking-[0.12em] text-(--color-surface)/45">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(trustPoints.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div
              className="border-b border-(--color-surface)/15 lg:border-b-0 lg:border-r lg:pr-8"
              role="tablist"
              aria-label="Trilot approach principles"
            >
              {trustPoints.map((point, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={point.number}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`trust-panel-${point.number}`}
                    id={`trust-tab-${point.number}`}
                    onClick={() => handleSelect(index)}
                    className={[
                      "group relative flex w-full items-center gap-4 border-b border-(--color-surface)/10 py-5 text-left transition-colors last:border-b-0 focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-trilot-coral",
                      isActive
                        ? "text-(--color-surface)"
                        : "text-(--color-surface)/45 hover:text-(--color-surface)/80",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-mono text-[0.62rem] tracking-widest transition-colors",
                        isActive
                          ? "text-(--color-accent-on-inverse)"
                          : "text-(--color-surface)/35",
                      ].join(" ")}
                    >
                      {point.number}
                    </span>

                    <span className="font-display text-lg font-semibold tracking-[-0.04em] sm:text-xl">
                      {point.title}
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "ml-auto text-xl transition-transform duration-300",
                        isActive
                          ? "translate-x-0 text-(--color-accent-on-inverse)"
                          : "group-hover:translate-x-1",
                      ].join(" ")}
                    >
                      ↗
                    </span>

                    <span
                      aria-hidden="true"
                      className={[
                        "absolute bottom-0 left-0 h-px bg-trilot-coral transition-all",
                        isActive ? "w-full" : "w-0",
                      ].join(" ")}
                    >
                      {isActive && !reduceMotion ? (
                        <motion.span
                          className="absolute inset-y-0 left-0 bg-(--color-surface)/70"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: AUTO_ADVANCE_MS / 1000,
                            ease: "linear",
                          }}
                        />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative flex min-h-60 items-center px-0 py-8 n sm:py-10 lg:px-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activePoint.number}
                  id={`trust-panel-${activePoint.number}`}
                  role="tabpanel"
                  aria-labelledby={`trust-tab-${activePoint.number}`}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 12 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8 }
                  }
                  transition={{
                    duration: reduceMotion ? 0.15 : 0.35,
                    ease: easeOut,
                  }}
                  className="max-w-xl"
                >
                  <span className="font-mono text-[0.65rem] tracking-[0.12em] text-trilot-blue">
                    PRINCIPLE {activePoint.number}
                  </span>

                  <p className="mt-5 font-display text-3xl font-semibold leading-[0.95] tracking-[-0.06em] text-(--color-surface) sm:text-4xl lg:text-5xl">
                    {activePoint.shortDescription}
                  </p>

                  <p className="mt-6 max-w-lg text-sm leading-relaxed text-(--color-surface)/60 sm:text-base">
                    {activePoint.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 right-0 hidden h-24 w-24 rounded-full border border-trilot-coral/25 sm:block"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-10 right-5 hidden h-2 w-2 rounded-full bg-trilot-coral sm:block"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}