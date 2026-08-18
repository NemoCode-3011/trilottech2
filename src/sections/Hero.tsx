// src/sections/Hero.tsx

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
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
  const onDark = activePath.contentTheme === "onDark";

  const theme = onDark
    ? {
        heading: "text-trilot-paper",
        muted: "text-trilot-paper/80",
        faint: "text-trilot-paper/60",
        border: "border-trilot-paper/25",
        inactiveLabel: "text-trilot-paper/65 group-hover:text-trilot-paper",
        activeSurface: "bg-trilot-paper/10",
        hoverSurface: "hover:bg-trilot-paper/5",
      }
    : {
        heading: "text-trilot-navy",
        muted: "text-trilot-navy/75",
        faint: "text-trilot-navy/60",
        border: "border-trilot-navy/20",
        inactiveLabel: "text-trilot-navy/65 group-hover:text-trilot-navy",
        activeSurface: "bg-trilot-navy/[0.06]",
        hoverSurface: "hover:bg-trilot-navy/[0.03]",
      };

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

  const imageTransition = reduceMotion
    ? { duration: 0 }
    : {
        duration: 0.9,
        ease: easeOut,
      };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col overflow-hidden bg-[#0b1118] text-trilot-paper sm:min-h-[calc(100svh-6rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activePath.id}
            initial={
              reduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 1.035 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: reduceMotion ? 1 : 1.015,
              transition: reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.55,
                    ease: easeOut,
                  },
            }}
            transition={imageTransition}
            className="absolute inset-0"
          >
            <img
              src={activePath.image}
              alt=""
              loading={activeIndex === 0 ? "eager" : "lazy"}
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
              className="h-full w-full object-cover"
              style={{
                objectPosition: activePath.imagePosition,
                filter: onDark
                  ? undefined
                  : "saturate(0.35) brightness(1.15) contrast(0.95)",
              }}
            />

            <div
              className="absolute inset-0"
              style={{ background: activePath.overlay }}
            />

            <div
              className={`absolute inset-0 sm:hidden ${
                onDark ? "bg-trilot-navy/25" : "bg-trilot-paper/20"
              }`}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.span
        key={`mark-${activePath.id}`}
        aria-hidden="true"
        initial={
          reduceMotion
            ? { opacity: 1, scale: 1, rotate: -12 }
            : { opacity: 0, scale: 0.65, rotate: -28 }
        }
        animate={{
          opacity: 1,
          scale: 1,
          rotate: -12,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.6,
          ease: easeOut,
          delay: reduceMotion ? 0 : 0.15,
        }}
        className={`pointer-events-none absolute right-7 top-24 z-10 hidden h-14 w-20 rounded-[50%] border-b-2 sm:block lg:top-28 ${
          onDark ? "border-trilot-coral" : "border-trilot-blue"
        }`}
      />

      <Container className="relative z-10 flex min-h-0 flex-1 flex-col px-5 pb-10 pt-24 sm:px-8 sm:pb-14 sm:pt-28">
        <div className="max-w-xl">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              ease: easeOut,
            }}
            className={`font-display text-[clamp(1.2rem,2.4vw,1.6rem)] font-semibold tracking-[-0.03em] ${theme.heading}`}
          >
            What are you trying to move forward?
          </motion.p>

          <div
            role="tablist"
            aria-label="Choose your project situation"
            className="mt-5 flex flex-col gap-1"
          >
            {heroPaths.map((path, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.button
                  key={path.id}
                  layout
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
                  transition={{
                    layout: {
                      duration: reduceMotion ? 0 : 0.35,
                      ease: easeOut,
                    },
                  }}
                  className={`group relative block w-full rounded-2xl px-3 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-trilot-coral ${
                    isActive
                      ? `${theme.activeSurface} text-trilot-coral`
                      : theme.hoverSurface
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.6rem] transition-colors ${
                        isActive
                          ? "bg-trilot-coral text-trilot-paper"
                          : `border ${theme.border} ${theme.faint}`
                      }`}
                    >
                      {path.number}
                    </span>

                    <span
                      className={`font-display text-sm font-semibold tracking-[-0.02em] transition-colors sm:text-base ${
                        isActive ? theme.heading : theme.inactiveLabel
                      }`}
                    >
                      {path.label}
                    </span>

                    <ChevronRight
                      size={16}
                      aria-hidden="true"
                      className={`ml-auto shrink-0 transition-all ${
                        isActive
                          ? "translate-x-0 text-trilot-coral opacity-100"
                          : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </span>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={
                          reduceMotion ? false : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={
                          reduceMotion
                            ? { opacity: 0 }
                            : { opacity: 0, height: 0 }
                        }
                        transition={{
                          duration: reduceMotion ? 0 : 0.3,
                          ease: easeOut,
                        }}
                        className="block overflow-hidden pl-9"
                      >
                        <span
                          className={`block pt-1 text-xs leading-relaxed ${theme.faint}`}
                        >
                          {path.description}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Stable content panel */}
        <div
          id={`hero-panel-${activePath.id}`}
          role="tabpanel"
          aria-labelledby={`hero-tab-${activePath.id}`}
          tabIndex={0}
          className="relative mt-10 min-h-88 max-w-2xl focus-visible:outline  focus-visible:outline-trilot-coral focus-visible:outline-offset-4 sm:min-h-72"
        >
          <AnimatePresence initial={!reduceMotion} mode="sync">
            <motion.div
              key={activePath.id}
              initial={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : {
                      opacity: 0,
                      x: direction > 0 ? 28 : -28,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0, x: 0 }
                  : {
                      opacity: 0,
                      x: direction > 0 ? -28 : 28,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                ease: easeOut,
              }}
              className="absolute inset-x-0 top-0"
            >
              <h1
                className={`max-w-[18ch] font-display text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.06em] ${theme.heading}`}
              >
                {activePath.headline}{" "}
                <span className="text-trilot-coral">
                  {activePath.highlightedHeadline}
                </span>
              </h1>

              <p
                className={`mt-4 max-w-lg text-sm leading-relaxed sm:text-base ${theme.muted}`}
              >
                {activePath.body}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Button href="#contact" variant="coral">
                  {activePath.cta}
                  <ArrowUpRight size={17} strokeWidth={2.2} />
                </Button>

                <span
                  className={`font-mono text-[0.62rem] uppercase tracking-[0.12em] ${theme.faint}`}
                >
                  Strategy · Design · Development
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
