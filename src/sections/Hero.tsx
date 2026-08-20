import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { heroPaths } from "../data/heroPaths";
import { easeOut } from "../lib/motion";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();

  const activePath = heroPaths[activeIndex];

  function selectPath(index: number) {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % heroPaths.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + heroPaths.length) % heroPaths.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = heroPaths.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    selectPath(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-trilot-navy text-trilot-paper dark:bg-trilot-ink sm:min-h-[calc(100svh-6rem)]"
    >
      {/* Quiet atmosphere, not decoration: two large hollow rings, mostly
          off-canvas, barely visible — the same ring device the old hero
          used as a tiny corner accent, scaled up to actually carry the
          background instead of a photo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <span className="absolute -right-40 -top-56 h-16842rem] rounded-full border border-trilot-paper/10" />
        <span className="absolute -bottom-64 -left-48 h-144 w-xl rounded-full border border-trilot-blue/15" />
      </div>

      <Container className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-5 py-24 sm:px-8 sm:py-28">
        <div className="max-w-3xl">
          {/* Compact path switcher — secondary to the headline, not
              competing with it */}
          <div
            role="tablist"
            aria-label="Choose your project situation"
            className="flex flex-wrap gap-2"
          >
            {heroPaths.map((path, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={path.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`hero-tab-${path.id}`}
                  aria-controls={`hero-panel-${path.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectPath(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={[
                    "flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.04em] transition-colors focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-trilot-coral",
                    isActive
                      ? "border-trilot-coral bg-trilot-coral text-trilot-paper"
                      : "border-trilot-paper/25 text-trilot-paper/65 hover:border-trilot-paper/45 hover:text-trilot-paper",
                  ].join(" ")}
                >
                  <span className="opacity-70">{path.number}</span>
                  {path.label}
                </button>
              );
            })}
          </div>

          {/* Content panel */}
          <div
            id={`hero-panel-${activePath.id}`}
            role="tabpanel"
            aria-labelledby={`hero-tab-${activePath.id}`}
            tabIndex={0}
            className="relative mt-8 min-h-72 focus-visible:outline focus-visible:outline-trilot-coral focus-visible:outline-offset-4 sm:min-h-64"
          >
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activePath.id}
                initial={
                  reduceMotion
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: direction > 0 ? 28 : -28 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0, x: 0 }
                    : { opacity: 0, x: direction > 0 ? -28 : 28 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  ease: easeOut,
                }}
                className="absolute inset-x-0 top-0"
              >
                <h1 className="max-w-[16ch] font-display text-[clamp(2.6rem,6.4vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                  {activePath.headline}{" "}
                  <span className="text-trilot-coral">
                    {activePath.highlightedHeadline}
                  </span>
                </h1>

                <p className="mt-5 max-w-md text-sm leading-relaxed text-trilot-paper/70 sm:text-base">
                  {activePath.body}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Button href="/start-project" variant="coral">
                    {activePath.cta}
                    <ArrowUpRight size={17} strokeWidth={2.2} />
                  </Button>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-trilot-paper/45">
                    Strategy · Design · Development
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}