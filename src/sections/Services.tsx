import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Container } from "../components/Container";
import { services } from "../data/services";
import { easeOut } from "../lib/motion";

type Service = (typeof services)[number];

function ServiceRow({
  service,
  index,
  isActive,
  onSelect,
  reduceMotion,
}: {
  service: Service;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  reduceMotion: boolean | null;
}) {
  const accentClass =
    service.accent === "blue"
      ? "bg-trilot-blue text-trilot-navy"
      : "bg-trilot-coral text-trilot-navy";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        delay: reduceMotion ? 0 : index * 0.08,
        duration: reduceMotion ? 0 : 0.55,
        ease: easeOut,
      }}
      className="min-w-0 border-b border-(--color-on-surface)/15"
    >
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={isActive}
        className="group flex min-w-0 w-full items-start gap-2 py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral sm:gap-5 sm:py-8 lg:gap-6"
      >
        <span
          className={[
            "pt-1 font-mono text-[0.65rem] tracking-[0.12em] transition-colors",
            isActive ? "text-(--color-accent)" : "text-(--color-on-surface)/40",
          ].join(" ")}
        >
          {service.number}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={[
              "block wrap-break-word font-display text-[clamp(1.75rem,7vw,3.25rem)] font-semibold leading-[0.9] tracking-[-0.07em] transition-transform duration-500 sm:text-5xl lg:text-6xl",
              isActive
                ? "translate-x-0 text-(--color-on-surface)"
                : "text-(--color-on-surface)/45 group-hover:translate-x-2 group-hover:text-(--color-on-surface)/75",
            ].join(" ")}
          >
            {service.title}
          </span>

          <span
            className={[
              "mt-3 block max-w-lg text-base leading-snug transition-all duration-500 sm:text-lg",
              isActive
                ? "max-h-20 opacity-100"
                : "max-h-0 overflow-hidden opacity-0",
            ].join(" ")}
          >
            {service.headline}
          </span>
        </span>

        <span
          aria-hidden="true"
          className={[
            "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-base leading-none transition-all duration-500 sm:h-8 sm:w-8 sm:text-lg",
            isActive
              ? "rotate-45 border-trilot-coral bg-trilot-coral text-trilot-navy"
              : "border-(--color-on-surface)/20 text-(--color-on-surface)/45 group-hover:border-(--color-on-surface)/60",
          ].join(" ")}
        >
          +
        </span>
      </button>

      <div
        className={[
          "grid transition-[grid-template-rows,opacity] duration-500",
          isActive
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-7 pl-9 sm:pb-9 sm:pl-16 lg:pl-14">
            <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-lg text-sm leading-relaxed text-(--color-on-surface)/60 sm:text-base">
                {service.description}
              </p>

              <a
                href={service.href}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-2 self-start border-b border-(--color-on-surface)/40 pb-1 text-sm font-medium transition-colors hover:border-trilot-coral hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral sm:self-end"
              >
                Explore service
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {service.details.map((detail) => (
                <span
                  key={detail}
                  className="font-mono text-[0.6rem] uppercase tracking-widest text-(--color-on-surface)/45"
                >
                  {detail}
                </span>
              ))}
            </div>

            <motion.div
              aria-hidden="true"
              initial={false}
              animate={{
                width: isActive ? "100%" : "0%",
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                ease: easeOut,
              }}
              className={`mt-7 h-1 max-w-xs ${accentClass}`}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative w-full min-w-0 overflow-x-hidden bg-(--color-surface) text-(--color-on-surface)"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-trilot-blue/15 blur-3xl"
      />

      <Container className="relative py-20 sm:py-28 lg:py-32">
        <div className="grid min-w-0 gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:gap-20">
          <div className="xl:sticky xl:top-32 xl:flex xl:h-fit xl:flex-col xl:justify-between">
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
                WHAT WE DO
              </p>

              <h2
                id="services-heading"
                className="mt-5 max-w-[9ch] wrap-break-word font-display text-[clamp(2.75rem,11vw,4.25rem)] font-semibold leading-[0.86] tracking-[-0.08em] sm:text-6xl xl:text-7xl"
              >
                Digital work that moves things forward.
              </h2>

              <p className="mt-6 max-w-sm text-base leading-relaxed text-(--color-on-surface)/60 sm:text-lg">
                Websites, applications, and support for businesses ready to make
                their next move.
              </p>
            </div>

            <div className="mt-12 hidden items-center gap-4 xl:flex">
              <span aria-hidden="true" className="h-px w-16 bg-trilot-coral" />

              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-(--color-on-surface)/45">
                Choose a direction
              </span>
            </div>
          </div>

          <div className="min-w-0">
            {services.map((service, index) => (
              <ServiceRow
                key={service.number}
                service={service}
                index={index}
                isActive={activeIndex === index}
                onSelect={() =>
                  setActiveIndex((currentIndex) =>
                    currentIndex === index ? null : index,
                  )
                }
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
