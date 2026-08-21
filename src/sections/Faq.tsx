import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../components/Container";

const faqs = [
  {
    question: "What kind of businesses do you work with?",
    answer:
      "We work with ambitious small businesses, founders, and growing teams that need a clearer, more credible digital presence or a practical digital tool.",
  },
  {
    question: "How long does a project usually take?",
    answer:
      "A focused website can take a few weeks, while larger applications and ongoing work depend on scope. We agree the shape, milestones, and next steps before work begins.",
  },
  {
    question: "Can you improve a website we already have?",
    answer:
      "Yes. We can help with positioning, structure, visual direction, performance, new features, or a full redesign depending on what is holding the current experience back.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes. Support can include maintenance, improvements, content changes, new features, and practical guidance as your business evolves. We will agree the scope and cost before any ongoing work begins.",
  },
  {
    question: "Are hosting, maintenance, and other ongoing costs included?",
    answer:
      "Project pricing covers the agreed work and deliverables. Hosting, domain renewals, paid third-party tools, maintenance, content updates, and new work requested after launch may involve additional fees. We will always discuss and approve those costs with you first.",
  },
  {
    question: "How do we get started?",
    answer:
      "Tell us a little about your business and what you need through the project form. You can then continue the conversation on WhatsApp or email directly.",
  },
] as const;

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-(--color-surface) text-(--color-on-surface)"
    >
      <Container className="py-20 sm:py-28 lg:py-32">
        <div className="grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:gap-20">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-(--color-accent)">
              A FEW ANSWERS
            </p>
            <h2
              id="faq-heading"
              className="mt-5 max-w-[8ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl"
            >
              Before we begin.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-(--color-on-surface)/60 sm:text-lg">
              The useful things to know before starting a conversation.
            </p>
          </div>

          <div className="border-t border-(--color-on-surface)/15">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-(--color-on-surface)/15"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-2xl font-semibold leading-tight tracking-[-0.04em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral sm:py-7 sm:text-3xl"
                  >
                    {faq.question}
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-trilot-coral transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="max-w-2xl pb-6 pr-8 text-base leading-relaxed text-(--color-on-surface)/65 sm:pb-7 sm:text-lg">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
