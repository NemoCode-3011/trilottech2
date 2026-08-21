import { Link } from "react-router-dom";
import { Container } from "../components/Container";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "How we work", href: "/#process" },
  { label: "Selected builds", href: "/#work" },
] as const;

const services = [
  { label: "Websites", href: "/services" },
  { label: "Web applications", href: "/services" },
  { label: "Support", href: "/services" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-trilot-paper text-[#0b1e30] dark:bg-[#0b1e30] dark:text-trilot-paper">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="flex items-start justify-between gap-6 border-b border-trilot-paper/15 pb-10 sm:pb-12">
          <Link
            to="/"
            aria-label="Trilot home"
            className="font-display text-4xl font-semibold leading-none tracking-[-0.08em] transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral sm:text-5xl"
          >
            TRILOT
          </Link>

          <span className="pt-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-paper/55">
            © {year}
          </span>
        </div>

        <div className="grid gap-12 py-12 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr] lg:py-16">
          <div className="max-w-sm">
            <p className="font-display text-2xl font-semibold leading-[0.95] tracking-[-0.06em] text-current sm:text-3xl">
              Digital work for businesses moving forward.
            </p>

            <a
              href="mailto:trilottechnologies@gmail.com"
              className="mt-8 inline-flex border-b border-current/40 pb-1 text-sm text-current transition-colors hover:border-trilot-coral hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
            >
              trilottechnologies@gmail.com
            </a>
          </div>

          <nav aria-label="Explore">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-paper/50">
              Explore
            </p>

            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-current/75 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services">
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-paper/50">
              Services
            </p>

            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-sm text-current/75 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-paper/50">
              Contact
            </p>

            <div className="mt-5 flex flex-col items-start gap-3">
              <Link
                to="/start-project"
                className="group inline-flex items-center gap-2 text-sm text-current transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
              >
                Start a project
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  ↗
                </span>
              </Link>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-current/75 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
              >
                LinkedIn
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-trilot-paper/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.56rem] uppercase tracking-widest text-current/45">
            © {year} Trilot. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              to="/privacy"
              className="font-mono text-[0.56rem] uppercase tracking-widest text-current/45 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="font-mono text-[0.56rem] uppercase tracking-widest text-current/45 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
            >
              Terms
            </Link>

            <Link
              to="/security"
              className="font-mono text-[0.56rem] uppercase tracking-widest text-current/45 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
            >
              Security
            </Link>

            <span className="font-mono text-[0.56rem] uppercase tracking-widest text-current/45">
              Nigeria
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
