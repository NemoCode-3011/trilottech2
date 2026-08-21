import { motion, useReducedMotion } from "motion/react";
import { Container } from "../components/Container";
import { processSteps } from "../data/process";
import { easeOut } from "../lib/motion";

export default function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative scroll-mt-28 overflow-hidden bg-trilot-paper text-trilot-navy dark:bg-trilot-navy dark:text-trilot-paper"
    >
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="grid gap-16 xl:grid-cols-[0.68fr_1.32fr] xl:gap-24">
          <div className="xl:sticky xl:top-32 xl:h-fit">
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-trilot-coral">
              HOW WE WORK
            </p>

            <h2
              id="process-heading"
              className="mt-6 max-w-[8ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl xl:text-8xl"
            >
              From first idea to what comes next.
            </h2>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-trilot-navy/60 dark:text-trilot-paper/60 sm:text-lg">
              A straightforward process for turning unclear problems into useful
              digital work.
            </p>

            <div className="mt-12 hidden items-center gap-4 xl:flex">
              <span aria-hidden="true" className="h-px w-12 bg-trilot-coral" />

              <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/40 dark:text-trilot-paper/40">
                Four steps
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-3 top-8 hidden w-px bg-trilot-navy/15 dark:bg-trilot-paper/15 sm:block xl:left-1/2 xl:-translate-x-1/2"
            />

            <div className="space-y-16 sm:space-y-20 lg:space-y-24">
              {processSteps.map((step, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <motion.article
                    key={step.number}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 24,
                          }
                    }
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      margin: "-80px",
                    }}
                    transition={{
                      delay: reduceMotion ? 0 : index * 0.06,
                      duration: reduceMotion ? 0 : 0.6,
                      ease: easeOut,
                    }}
                    className={[
                      "group relative grid gap-6 sm:grid-cols-[4.5rem_1fr] sm:gap-8 xl:grid-cols-2 xl:gap-0",
                      isLeft ? "" : "xl:text-right",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "relative sm:col-span-2 xl:col-span-1",
                        isLeft
                          ? "xl:col-start-1 xl:pr-16"
                          : "xl:col-start-2 xl:row-start-1 xl:pl-16",
                      ].join(" ")}
                    >
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute top-2 hidden h-4 w-4 rounded-full border-4 border-trilot-paper bg-trilot-coral transition-transform duration-500 group-hover:scale-125 dark:border-trilot-navy sm:block xl:top-3",
                          isLeft ? "xl:-right-2" : "xl:-left-2",
                          isLeft ? "sm:left-[-2.1rem]" : "",
                        ].join(" ")}
                      />

                      <span
                        className={[
                          "block font-display text-[clamp(6rem,14vw,11rem)] font-semibold leading-[0.64] tracking-[-0.11em] text-trilot-navy/12 transition-colors duration-500 group-hover:text-trilot-coral dark:text-trilot-paper/12 sm:text-[clamp(7rem,11vw,10rem)]",
                          isLeft ? "" : "xl:text-right",
                        ].join(" ")}
                      >
                        {step.number}
                      </span>

                      <div
                        className={[
                          "mt-8",
                          isLeft ? "" : "xl:flex xl:flex-col xl:items-end",
                        ].join(" ")}
                      >
                        <h3 className="max-w-[10ch] font-display text-4xl font-semibold leading-[0.88] tracking-[-0.07em] sm:text-5xl xl:text-6xl">
                          {step.title}
                        </h3>

                        <p
                          className={[
                            "mt-5 max-w-md text-base leading-relaxed text-trilot-navy/60 dark:text-trilot-paper/60 sm:text-lg",
                            isLeft ? "" : "xl:ml-auto",
                          ].join(" ")}
                        >
                          {step.description}
                        </p>

                        <div
                          className={[
                            "mt-8 flex items-center gap-4",
                            isLeft ? "" : "xl:flex-row-reverse",
                          ].join(" ")}
                        >
                          <span
                            aria-hidden="true"
                            className="h-px w-10 bg-trilot-coral transition-all duration-500 group-hover:w-20"
                          />

                          <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/40 dark:text-trilot-paper/40">
                            Step {step.number}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
