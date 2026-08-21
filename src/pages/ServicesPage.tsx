import { ArrowUpRight, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";
import { services } from "../data/services";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-(--color-surface) text-(--color-on-surface)">
      <Container className="pb-24 pt-28 sm:pb-32 sm:pt-36 lg:pb-40">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-(--color-on-surface)/60 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to home
        </Link>

        <header className="mt-16 max-w-3xl sm:mt-20">
          <p className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
            SERVICES
          </p>
          <h1 className="mt-6 max-w-[10ch] font-display text-6xl font-semibold leading-[0.84] tracking-[-0.08em] sm:text-8xl lg:text-9xl">
            Digital work with a reason to exist.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-(--color-on-surface)/65 sm:text-lg">
            We help ambitious businesses become easier to understand, easier to
            trust, and easier to choose through thoughtful digital work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/start-project"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-trilot-coral px-5 py-3 text-sm font-bold text-trilot-navy transition-colors hover:bg-trilot-coral-strong hover:text-trilot-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
            >
              Start a project
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a
              href="https://wa.me/2348149798764?text=Hello%20Trilot%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-(--color-on-surface)/25 px-5 py-3 text-sm font-medium transition-colors hover:border-trilot-coral hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
            >
              <MessageCircle size={17} aria-hidden="true" />
              Ask on WhatsApp
            </a>
          </div>
        </header>

        <div className="mt-20 divide-y divide-(--color-on-surface)/15 border-t border-(--color-on-surface)/15 sm:mt-28">
          {services.map((service) => (
            <article
              key={service.number}
              className="grid gap-8 py-10 sm:py-14 lg:grid-cols-[0.3fr_0.7fr] lg:gap-16"
            >
              <div className="flex items-start justify-between gap-4 lg:block">
                <span className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
                  {service.number}
                </span>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-(--color-on-surface)/40 lg:mt-8 lg:block">
                  {service.details.join(" / ")}
                </span>
              </div>

              <div>
                <h2 className="max-w-[12ch] font-display text-5xl font-semibold leading-[0.88] tracking-[-0.07em] sm:text-7xl">
                  {service.title}
                </h2>
                <p className="mt-6 max-w-2xl font-display text-2xl font-semibold leading-[1.02] tracking-tight sm:text-3xl">
                  {service.headline}
                </p>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-(--color-on-surface)/65 sm:text-lg">
                  {service.description}
                </p>
                <ul className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-3">
                  {service.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex items-start gap-2 text-sm leading-relaxed text-(--color-on-surface)/70"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-trilot-coral"
                      />
                      {outcome}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/start-project"
                  className="group mt-8 inline-flex items-center gap-3 border-b border-trilot-coral pb-2 text-sm font-medium transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
                >
                  Discuss this service
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
