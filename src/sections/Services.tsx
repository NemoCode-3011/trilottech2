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
      className="border-b border-trilot-navy/15"
    >
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={isActive}
        className="group flex w-full items-start gap-5 py-7 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral sm:gap-8 sm:py-9"
      >
        <span
          className={[
            "pt-1 font-mono text-[0.65rem] tracking-[0.12em] transition-colors",
            isActive ? "text-trilot-coral" : "text-trilot-navy/40",
          ].join(" ")}
        >
          {service.number}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={[
              "block font-display text-4xl font-semibold leading-[0.9] tracking-[-0.07em] transition-transform duration-500 sm:text-6xl lg:text-7xl",
              isActive
                ? "translate-x-0 text-trilot-navy"
                : "text-trilot-navy/45 group-hover:translate-x-2 group-hover:text-trilot-navy/75",
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
            "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xl leading-none transition-all duration-500",
            isActive
              ? "rotate-45 border-trilot-coral bg-trilot-coral text-trilot-navy"
              : "border-trilot-navy/20 text-trilot-navy/45 group-hover:border-trilot-navy/60",
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
          <div className="pb-8 pl-12 sm:pb-10 sm:pl-20">
            <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-lg text-sm leading-relaxed text-trilot-navy/60 sm:text-base">
                {service.description}
              </p>

              <a
                href={service.href}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-2 self-start border-b border-trilot-navy/40 pb-1 text-sm font-medium transition-colors hover:border-trilot-coral hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral sm:self-end"
              >
                Explore service
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {service.details.map((detail) => (
                <span
                  key={detail}
                  className="font-mono text-[0.6rem] uppercase tracking-widest text-trilot-navy/45"
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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-trilot-paper text-trilot-navy"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-trilot-blue/15 blur-3xl"
      />

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:flex lg:h-fit lg:flex-col lg:justify-between">
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-trilot-coral">
                WHAT WE DO
              </p>

              <h2
                id="services-heading"
                className="mt-6 max-w-[8ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl lg:text-8xl"
              >
                Digital work that moves things forward.
              </h2>

              <p className="mt-8 max-w-sm text-base leading-relaxed text-trilot-navy/60 sm:text-lg">
                Websites, applications, and support for businesses ready to
                make their next move.
              </p>
            </div>

            <div className="mt-12 hidden items-center gap-4 lg:flex">
              <span
                aria-hidden="true"
                className="h-px w-16 bg-trilot-coral"
              />

              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/45">
                Choose a direction
              </span>
            </div>
          </div>

          <div>
            {services.map((service, index) => (
              <ServiceRow
                key={service.number}
                service={service}
                index={index}
                isActive={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}