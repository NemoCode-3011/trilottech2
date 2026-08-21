import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle } from "lucide-react";
import { Container } from "../components/Container";
import { easeOut } from "../lib/motion";

export default function ContactCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-trilot-paper text-trilot-navy dark:bg-trilot-navy dark:text-trilot-paper"
    >
      <Container className="py-24 sm:py-32 lg:py-40">
        <motion.div
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
            duration: reduceMotion ? 0 : 0.65,
            ease: easeOut,
          }}
          className="border-t border-trilot-navy/20 pt-8 sm:pt-10 dark:border-trilot-paper/20"
        >
          <div className="grid gap-14 xl:grid-cols-[1.15fr_0.85fr] xl:items-end xl:gap-24">
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.14em] text-trilot-coral">
                READY WHEN YOU ARE
              </p>

              <h2
                id="contact-heading"
                className="mt-6 max-w-[9ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl xl:text-8xl"
              >
                Have a digital project in mind?
              </h2>
            </div>

            <div className="max-w-md xl:pb-2">
              <p className="text-base leading-relaxed text-trilot-navy/65 sm:text-lg dark:text-trilot-paper/65">
                Whether you need a clearer website, a useful web application, or
                support for what you already have, tell us what you’re working
                on.
              </p>

              <Link
                to="/start-project"
                className="group mt-8 inline-flex items-center gap-3 border-b border-trilot-coral pb-2 text-sm font-medium text-trilot-navy transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral dark:text-trilot-paper"
              >
                Start a project
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                >
                  ↗
                </span>
              </Link>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/2348149798764?text=Hello%20Trilot%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-trilot-coral px-4 py-2.5 text-sm font-medium text-trilot-navy transition-colors hover:bg-trilot-coral-strong hover:text-trilot-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href="mailto:trilottechnologies@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-current/25 px-4 py-2.5 text-sm font-medium transition-colors hover:border-trilot-coral hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
                >
                  <Mail size={16} aria-hidden="true" />
                  Email us
                </a>
              </div>

              <p className="mt-14 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/40 dark:text-trilot-paper/40">
                Websites / Web applications / Support
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
