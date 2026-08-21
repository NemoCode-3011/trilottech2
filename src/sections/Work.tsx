import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Container } from "../components/Container";
import { Link } from "react-router-dom";
import { workItems } from "../data/works";
import { easeOut } from "../lib/motion";

function ProjectPreview({
  project,
  reduceMotion,
}: {
  project: (typeof workItems)[number];
  reduceMotion: boolean | null;
}) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={project.number}
        initial={
          reduceMotion
            ? { opacity: 1 }
            : {
                opacity: 0,
                y: 12,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={
          reduceMotion
            ? { opacity: 1 }
            : {
                opacity: 0,
                y: -10,
              }
        }
        transition={{
          duration: reduceMotion ? 0.1 : 0.35,
          ease: easeOut,
        }}
        className="relative aspect-4/3 overflow-hidden bg-trilot-navy/5 sm:aspect-5/4"
      >
        <motion.img
          src={project.image}
          alt={`${project.name} website preview`}
          loading="lazy"
          initial={reduceMotion ? false : { scale: 1.03 }}
          animate={{ scale: 1 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease: easeOut,
          }}
          className="h-full w-full object-cover object-top"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 border border-trilot-navy/10"
        />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between sm:bottom-5 sm:left-5 sm:right-5">
          <span className="bg-trilot-paper/90 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-widest text-trilot-navy dark:bg-trilot-ink/90 dark:text-trilot-paper">
            {project.number} / 04
          </span>

          <span className="bg-trilot-paper/90 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-widest text-trilot-navy dark:bg-trilot-ink/90 dark:text-trilot-paper">
            Preview
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProjectRow({
  project,
  isActive,
  onActivate,
}: {
  project: (typeof workItems)[number];
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      to={project.caseStudyHref}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={[
        "group block border-b border-trilot-navy/15 py-6 transition-colors dark:border-trilot-paper/15 sm:py-7",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral",
        isActive
          ? "text-trilot-navy dark:text-trilot-paper"
          : "text-trilot-navy/45 dark:text-trilot-paper/45",
      ].join(" ")}
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <span
          className={[
            "pt-1 font-mono text-[0.62rem] tracking-widest transition-colors",
            isActive
              ? "text-trilot-coral"
              : "text-trilot-navy/35 dark:text-trilot-paper/35",
          ].join(" ")}
        >
          {project.number}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-5">
            <h3 className="font-display text-3xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-4xl lg:text-5xl">
              {project.name}
            </h3>

            <span
              aria-hidden="true"
              className={[
                "pt-1 text-xl transition-all duration-300",
                isActive
                  ? "translate-x-1 text-trilot-coral"
                  : "text-trilot-navy/25 group-hover:translate-x-1 group-hover:text-trilot-navy/70 dark:text-trilot-paper/25 dark:group-hover:text-trilot-paper/70",
              ].join(" ")}
            >
              ↗
            </span>
          </div>

          <p
            className={[
              "mt-2 font-mono text-[0.58rem] uppercase tracking-widest transition-colors",
              isActive
                ? "text-trilot-navy/55 dark:text-trilot-paper/55"
                : "text-trilot-navy/35 dark:text-trilot-paper/35",
            ].join(" ")}
          >
            {project.category}
          </p>

          <p
            className={[
              "mt-4 max-w-md text-sm leading-relaxed transition-colors sm:text-base",
              isActive
                ? "text-trilot-navy/65 dark:text-trilot-paper/65"
                : "text-trilot-navy/40 dark:text-trilot-paper/40",
            ].join(" ")}
          >
            {project.description}
          </p>

          <span
            aria-hidden="true"
            className={[
              "mt-5 block h-px bg-trilot-coral transition-all duration-500",
              isActive ? "w-16" : "w-8 group-hover:w-12",
            ].join(" ")}
          />
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = workItems[activeIndex];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-28 bg-trilot-paper text-trilot-navy dark:bg-trilot-ink dark:text-trilot-paper"
    >
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20 xl:gap-28">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-trilot-coral">
              SELECTED BUILDS
            </p>

            <h2
              id="work-heading"
              className="mt-6 max-w-[9ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl lg:text-8xl"
            >
              Websites built for real businesses.
            </h2>

            <p className="mt-8 max-w-md text-base leading-relaxed text-trilot-navy/60 sm:text-lg">
              A selection of digital experiences for hospitality, property,
              construction, and local brands.
            </p>

            <div className="mt-12 border-t border-trilot-navy/15 dark:border-trilot-paper/15">
              {workItems.map((project, index) => (
                <ProjectRow
                  key={project.number}
                  project={project}
                  isActive={activeIndex === index}
                  onActivate={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-32">
            <div className="hidden lg:block">
              <ProjectPreview
                project={activeProject}
                reduceMotion={reduceMotion}
              />
            </div>

            <div className="mt-6 flex items-center justify-between font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/40 dark:text-trilot-paper/40">
              <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>

              <span>{activeProject.category}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:hidden">
          <ProjectPreview project={activeProject} reduceMotion={reduceMotion} />
        </div>
      </Container>
    </section>
  );
}
