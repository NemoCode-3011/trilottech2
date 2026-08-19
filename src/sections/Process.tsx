import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import { Container } from "../components/Container";
import { processSteps } from "../data/process";
import { easeOut } from "../lib/motion";
import {
  BriefArtifact,
  BuildArtifact,
  LaunchArtifact,
  ShapeArtifact,
} from "../sections/Process-Artifacts"

const artifacts = [
  BriefArtifact,
  ShapeArtifact,
  BuildArtifact,
  LaunchArtifact,
];

function ProcessArtifact({ index }: { index: number }) {
  const Artifact = artifacts[index];
  return <Artifact />;
}

function ProcessNav({
  activeIndex,
  overallProgress,
  onSelect,
}: {
  activeIndex: number;
  overallProgress: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="relative mt-8 pl-6">
      {/* Continuous rail: one line for the whole journey, not 4 separate
          per-step bars. Fills top to bottom as the visitor scrolls through
          all 4 stages. */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px bg-(--color-on-surface)/10"
      />
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 w-px bg-trilot-coral"
        style={{
          height: `${Math.min(100, Math.max(0, overallProgress * 100))}%`,
        }}
      />

      <div
        className="border-t border-(--color-on-surface)/15"
        role="tablist"
        aria-label="Process stages"
      >
        {processSteps.map((step, index) => {
          const active = activeIndex === index;

          return (
            <button
              key={step.number}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`process-panel-${step.number}`}
              onClick={() => onSelect(index)}
              className={[
                "group flex w-full items-center gap-4 border-b border-(--color-on-surface)/15 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral",
                active
                  ? "text-(--color-on-surface)"
                  : "text-(--color-on-surface)/40 hover:text-(--color-on-surface)/75",
              ].join(" ")}
            >
              <span
                className={[
                  "font-mono text-[0.62rem] tracking-widest",
                  active ? "text-(--color-accent)" : "text-(--color-on-surface)/35",
                ].join(" ")}
              >
                {step.number}
              </span>

              <span className="font-display text-xl font-semibold tracking-tighter">
                {step.title}
              </span>

              <span
                aria-hidden="true"
                className={[
                  "ml-auto text-lg transition-transform duration-300",
                  active
                    ? "translate-x-1 text-trilot-coral"
                    : "group-hover:translate-x-1",
                ].join(" ")}
              >
                ↗
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobileProcess() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-16 lg:hidden">
      {processSteps.map((step, index) => (
        <article key={step.number}>
          <div className="flex items-baseline gap-4 border-b border-(--color-on-surface)/15 pb-4">
            <span className="font-mono text-[0.62rem] tracking-widest text-(--color-accent)">
              {step.number}
            </span>

            <h3 className="font-display text-4xl font-semibold leading-none tracking-[-0.07em]">
              {step.title}
            </h3>
          </div>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-(--color-on-surface)/60">
            {step.description}
          </p>

          <p className="relative mt-4 inline-block font-mono text-[0.58rem] uppercase tracking-widest text-(--color-on-surface)/45">
            {step.note}
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-0 h-px w-[78%] -rotate-1 bg-trilot-coral"
            />
          </p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: reduceMotion ? 0 : index * 0.05,
              duration: reduceMotion ? 0 : 0.45,
              ease: easeOut,
            }}
            className="mt-8"
          >
            <ProcessArtifact index={index} />
          </motion.div>
        </article>
      ))}
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const manualOverride = useRef<number | null>(null);
  const lastIndexRef = useRef(0);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scrollIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, processSteps.length],
  );

  const overallProgress = (activeIndex + stepProgress) / processSteps.length;

  useMotionValueEvent(scrollIndex, "change", (latest) => {
    if (reduceMotion) return;

    const clamped = Math.min(processSteps.length - 0.001, Math.max(0, latest));
    const index = Math.floor(clamped);
    const fraction = clamped - index;

    // A click just jumped the active step ahead of where the scroll math
    // says it should be — let scroll catch back up before it takes over
    // again, instead of snapping the tab back immediately.
    if (manualOverride.current !== null) {
      if (index === manualOverride.current) {
        manualOverride.current = null;
      } else {
        return;
      }
    }

    if (index !== lastIndexRef.current) {
      setDirection(index > lastIndexRef.current ? 1 : -1);
      lastIndexRef.current = index;
    }

    setActiveIndex(index);
    setStepProgress(fraction);
  });

  function handleSelect(index: number) {
    if (index !== activeIndex) {
      setDirection(index > activeIndex ? 1 : -1);
    }
    lastIndexRef.current = index;
    manualOverride.current = index;
    setActiveIndex(index);
    setStepProgress(0);

    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollableHeight = rect.height - window.innerHeight;
    const targetFraction = (index + 0.15) / processSteps.length;
    const targetY =
      window.scrollY + rect.top + targetFraction * scrollableHeight;

    window.scrollTo({
      top: targetY,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative bg-(--color-surface) text-(--color-on-surface)"
    >
      <div className="hidden lg:block">
        <div className="relative h-[340vh]">
          <div className="sticky top-0 flex min-h-screen items-center">
            <Container className="py-16 lg:py-20">
              <div className="grid items-center gap-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
                <div>
                  <p className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
                    HOW WE WORK
                  </p>

                  <h2
                    id="process-heading"
                    className="mt-5 max-w-[8ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] lg:text-7xl"
                  >
                    Good work starts before the first pixel.
                  </h2>

                  <p className="mt-6 max-w-sm text-base leading-relaxed text-(--color-on-surface)/60 lg:text-lg">
                    We make room to understand the problem, shape the
                    direction, build the thing, and improve what comes next.
                  </p>

                  <ProcessNav
                    activeIndex={activeIndex}
                    overallProgress={overallProgress}
                    onSelect={handleSelect}
                  />
                </div>

                <div className="relative">
                  <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      id={`process-panel-${processSteps[activeIndex].number}`}
                      role="tabpanel"
                      aria-labelledby={`process-step-${processSteps[activeIndex].number}`}
                      initial={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: direction * 28 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      exit={
                        reduceMotion
                          ? { opacity: 1 }
                          : { opacity: 0, y: direction * -20 }
                      }
                      transition={{
                        duration: reduceMotion ? 0.1 : 0.42,
                        ease: easeOut,
                      }}
                    >
                      <ProcessArtifact index={activeIndex} />
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-5 flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.12em] text-(--color-on-surface)/40">
                    <span>
                      {processSteps[activeIndex].number} /{" "}
                      {String(processSteps.length).padStart(2, "0")}
                    </span>

                    <span>working notes</span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Container className="py-24 sm:py-32">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
              HOW WE WORK
            </p>

            <h2 className="mt-6 max-w-[9ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl">
              Good work starts before the first pixel.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-(--color-on-surface)/60 sm:text-lg">
              We make room to understand the problem, shape the direction,
              build the thing, and improve what comes next.
            </p>
          </div>

          <div className="mt-16">
            <MobileProcess />
          </div>
        </Container>
      </div>
    </section>
  );
}