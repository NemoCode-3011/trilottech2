import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../components/Container";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-(--color-surface) text-(--color-on-surface)">
      <Container className="pb-24 pt-28 sm:pb-32 sm:pt-36">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-(--color-on-surface)/60 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        <article className="mt-16 max-w-2xl sm:mt-20">
          <p className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
            PRIVACY
          </p>
          <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-8xl">
            Your details stay useful, not noisy.
          </h1>
          <p className="mt-8 text-base leading-relaxed text-(--color-on-surface)/65 sm:text-lg">
            When you contact Trilot, we use the information you share only to
            understand your project and respond to your enquiry. We do not sell
            your information or use it for unrelated marketing.
          </p>

          <div className="mt-14 space-y-10 border-t border-(--color-on-surface)/15 pt-10 text-base leading-relaxed text-(--color-on-surface)/70 sm:text-lg">
            <section>
              <h2 className="font-display text-3xl font-semibold tracking-tighter text-(--color-on-surface)">
                What we collect
              </h2>
              <p className="mt-3">
                We may receive your name, email address, business details, and
                project information when you use the project form or contact us
                directly.
              </p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-semibold tracking-tighter text-(--color-on-surface)">
                How we use it
              </h2>
              <p className="mt-3">
                We use your details to reply, discuss scope, prepare proposals,
                and provide the services you request.
              </p>
            </section>
            <section>
              <h2 className="font-display text-3xl font-semibold tracking-tighter text-(--color-on-surface)">
                Contact
              </h2>
              <p className="mt-3">
                For privacy questions, email trilottechnologies@gmail.com.
              </p>
            </section>
          </div>
        </article>
      </Container>
    </main>
  );
}
