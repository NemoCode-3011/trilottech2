import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-(--color-surface) text-(--color-on-surface)">
      <Container className="pb-24 pt-28 sm:pb-32 sm:pt-36">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-(--color-on-surface)/60 hover:text-trilot-coral"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
        <article className="mt-16 max-w-2xl sm:mt-20">
          <p className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
            TERMS
          </p>
          <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-8xl">
            Clear expectations make better work.
          </h1>
          <p className="mt-8 text-base leading-relaxed text-(--color-on-surface)/65 sm:text-lg">
            These terms describe the general basis for working with Trilot. Each
            project is confirmed by a written proposal or agreement that defines
            its specific scope, timing, fees, and deliverables.
          </p>
          <div className="mt-14 space-y-10 border-t border-(--color-on-surface)/15 pt-10 text-base leading-relaxed text-(--color-on-surface)/70 sm:text-lg">
            <section>
              <h2 className="font-display text-3xl font-semibold text-(--color-on-surface)">
                Scope and approval
              </h2>
              <p className="mt-3">
                Work begins after the scope, deliverables, payment schedule, and
                responsibilities have been agreed. Requests outside the agreed
                scope may require a revised estimate.
              </p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-semibold text-(--color-on-surface)">
                Fees and additional work
              </h2>
              <p className="mt-3">
                Project fees cover the agreed deliverables. Hosting, domains,
                paid tools, maintenance, content updates, and new features are
                separate unless explicitly included in the written agreement.
              </p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-semibold text-(--color-on-surface)">
                Launch and third parties
              </h2>
              <p className="mt-3">
                We aim to deliver carefully tested work, but third-party
                services, hosting providers, platforms, and client-supplied
                content may affect performance or availability.
              </p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-semibold text-(--color-on-surface)">
                Contact
              </h2>
              <p className="mt-3">
                For questions about a proposal or project, email
                trilottechnologies@gmail.com.
              </p>
            </section>
          </div>
        </article>
      </Container>
    </main>
  );
}
