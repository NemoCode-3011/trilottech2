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
    let nextIndex: number;

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

  // Entrance choreography: rings, then pills, then headline block, then the
  // scroll cue — same top-to-bottom stagger rhythm the splash screen uses,
  // so opening the page reads as one continuous motion system.
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.14,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.6, ease: easeOut },
    },
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-trilot-navy text-trilot-paper dark:bg-trilot-ink sm:min-h-[calc(100svh-6rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {reduceMotion ? (
          <>
            <span className="absolute -right-40 -top-56 h-168 w-2xl rounded-full border border-trilot-paper/10" />
            <span className="absolute -bottom-64 -left-48 h-144 w-xl rounded-full border border-trilot-blue/15" />
          </>
        ) : (
          <>
            <motion.span
              className="absolute -right-40 -top-56 h-168 w-2xl rounded-full border border-trilot-paper/10"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.045, 1] }}
              transition={{
                duration: 46,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="absolute -bottom-64 -left-48 h-144 w-xl rounded-full border border-trilot-blue/15"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            />
          </>
        )}
      </div>

      <Container className="relative z-10 flex min-h-0 flex-1 flex-col justify-center px-5 py-16 sm:px-8 sm:py-24">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Compact path switcher — secondary to the headline, not
              competing with it */}
          <motion.div
            variants={item}
            role="tablist"
            aria-label="Choose your project situation"
            className="flex flex-wrap gap-2"
          >
            {heroPaths.map((path, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
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
                  whileHover={reduceMotion ? undefined : { scale: 1.035 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  transition={{ duration: 0.15, ease: easeOut }}
                  className={[
                    "flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[0.68rem] tracking-[0.04em] transition-colors focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-trilot-coral",
                    isActive
                      ? "border-trilot-coral bg-trilot-coral text-trilot-paper"
                      : "border-trilot-paper/25 text-trilot-paper/65 hover:border-trilot-paper/45 hover:text-trilot-paper",
                  ].join(" ")}
                >
                  <span className="opacity-70">{path.number}</span>
                  {path.label}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Content panel */}
          <motion.div
            variants={item}
            id={`hero-panel-${activePath.id}`}
            role="tabpanel"
            aria-labelledby={`hero-tab-${activePath.id}`}
            tabIndex={0}
            className="relative mt-8 min-h-64 focus-visible:outline focus-visible:outline-trilot-coral focus-visible:outline-offset-4 sm:min-h-104 lg:min-h-104"
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
          </motion.div>
        </motion.div>

        {/* Quiet scroll cue — invites visitors past the fold toward Process
            and Work instead of stopping here. Fades in last. */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          transition={{ delay: reduceMotion ? 0 : 0.6 }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center sm:flex"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="h-10 w-px bg-trilot-paper/25" />
            {!reduceMotion && (
              <motion.span
                className="size-1 rounded-full bg-trilot-paper/50"
                animate={{ y: [0, 10, 0], opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
