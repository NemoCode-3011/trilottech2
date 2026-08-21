import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";

const principles = [
  {
    title: "Clarity before decoration",
    body: "We find the message, structure, and decision a digital experience needs to make before adding visual polish.",
  },
  {
    title: "Useful by design",
    body: "Every page, interaction, and feature should help a real person understand, trust, or move forward.",
  },
  {
    title: "Built for the next step",
    body: "We create considered foundations that can grow with the business instead of becoming another thing to replace.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-28 bg-(--color-surface) text-(--color-on-surface)"
    >
      <Container className="py-20 sm:py-28 lg:py-36">
        <div className="grid gap-14 xl:grid-cols-[0.8fr_1.2fr] xl:gap-24">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
              ABOUT TRILOT
            </p>
            <h2
              id="about-heading"
              className="mt-5 max-w-[8ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl"
            >
              A thoughtful partner for your next move.
            </h2>
          </div>

          <div className="max-w-2xl">
            <p className="font-display text-2xl font-semibold leading-[1.02] tracking-tight sm:text-4xl">
              Trilot helps businesses turn unclear digital problems into clear,
              useful experiences.
            </p>
            <p className="mt-7 text-base leading-relaxed text-(--color-on-surface)/65 sm:text-lg">
              We combine strategy, design, and development to create websites
              and digital products that make businesses easier to understand,
              trust, and choose. The work is collaborative, practical, and
              shaped around the people your business needs to reach.
            </p>

            <div className="mt-12 grid gap-8 border-t border-(--color-on-surface)/15 pt-8 sm:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.title}>
                  <span
                    aria-hidden="true"
                    className="mb-4 block size-2 rounded-full bg-trilot-coral"
                  />
                  <h3 className="font-display text-2xl font-semibold leading-none tracking-tighter">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-(--color-on-surface)/60">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-3 border-b border-trilot-coral pb-2 text-sm font-medium transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
            >
              More about how we work
              <ArrowUpRight
                aria-hidden="true"
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
