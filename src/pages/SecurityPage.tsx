import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";

export default function SecurityPage() {
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
            SECURITY
          </p>
          <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-8xl">
            Careful with the important details.
          </h1>
          <p className="mt-8 text-base leading-relaxed text-(--color-on-surface)/65 sm:text-lg">
            We take reasonable technical and operational steps to protect
            information shared with us. Security also depends on the hosting,
            platforms, integrations, and access practices used for each project.
          </p>
          <div className="mt-14 space-y-10 border-t border-(--color-on-surface)/15 pt-10 text-base leading-relaxed text-(--color-on-surface)/70 sm:text-lg">
            <section>
              <h2 className="font-display text-3xl font-semibold text-(--color-on-surface)">
                Access
              </h2>
              <p className="mt-3">
                Access is shared only when needed for the agreed work. Clients
                should use strong, unique passwords and enable multi-factor
                authentication where available.
              </p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-semibold text-(--color-on-surface)">
                Hosting and services
              </h2>
              <p className="mt-3">
                Hosting providers, domains, analytics, payment tools, and other
                third-party services have their own security practices and
                terms. We can help configure them, but they remain separate
                services.
              </p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-semibold text-(--color-on-surface)">
                Reporting an issue
              </h2>
              <p className="mt-3">
                If you believe a project or communication contains a security
                issue, email trilottechnologies@gmail.com with the relevant
                details so we can review it.
              </p>
            </section>
          </div>
        </article>
      </Container>
    </main>
  );
}
