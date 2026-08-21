import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import About from "../sections/About";
import { Container } from "../components/Container";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-(--color-surface) text-(--color-on-surface)">
      <Container className="pb-4 pt-28 sm:pt-36">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-(--color-on-surface)/60 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>
      </Container>
      <About />
      <Container className="pb-24 sm:pb-32">
        <Link
          to="/start-project"
          className="group inline-flex items-center gap-3 rounded-full bg-trilot-coral px-5 py-3 text-sm font-bold text-trilot-navy transition-colors hover:bg-trilot-coral-strong hover:text-trilot-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
        >
          Start a conversation
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </Container>
    </main>
  );
}
