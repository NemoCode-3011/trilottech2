import { useState } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ChevronDown, Send } from "lucide-react";
import { Container } from "../components/Container";
import { easeOut } from "../lib/motion";

type ProjectFormData = {
  name: string;
  email: string;
  business: string;
  service: string;
  details: string;
  budget: string;
  timeline: string;
};

const initialFormData: ProjectFormData = {
  name: "",
  email: "",
  business: "",
  service: "",
  details: "",
  budget: "",
  timeline: "",
};

const WHATSAPP_NUMBER = "2348149798764";
const CONTACT_EMAIL = "trilottechnologies@gmail.com";
const EMAILJS_PUBLIC_KEY = "UtDMrfguFimDekRUr";
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function StartProject() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  function updateField(field: keyof ProjectFormData, value: string) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function buildContactMessage() {
    return [
      "Hello Trilot, I would like to discuss a project.",
      "",
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Business: ${formData.business || "Not provided"}`,
      `Service: ${formData.service}`,
      `Budget: ${formData.budget || "Not provided"}`,
      `Timeline: ${formData.timeline || "Not provided"}`,
      "",
      `Project details: ${formData.details}`,
    ].join("\n");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitState("sending");

    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            name: formData.name,
            email: formData.email,
            business: formData.business || "Not provided",
            service: formData.service,
            budget: formData.budget || "Not provided",
            timeline: formData.timeline || "Not provided",
            details: formData.details,
            message: buildContactMessage(),
            to_email: CONTACT_EMAIL,
          },
          EMAILJS_PUBLIC_KEY,
        );
        setSubmitState("sent");
        setFormData(initialFormData);
        return;
      }

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildContactMessage())}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setSubmitState("sent");
    } catch {
      setSubmitState("error");
    }
  }

  return (
    <main className="min-h-screen bg-trilot-paper text-trilot-navy dark:bg-trilot-ink dark:text-trilot-paper">
      <Container className="py-8 sm:py-10 lg:py-12">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-trilot-navy/60 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral dark:text-trilot-paper/60"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to home
        </Link>

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <motion.header
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: easeOut,
            }}
            className="lg:sticky lg:top-12 lg:h-fit"
          >
            <p className="font-mono text-[0.65rem] tracking-[0.14em] text-trilot-coral">
              START A PROJECT
            </p>

            <h1 className="mt-6 max-w-[8ch] font-display text-5xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
              Have a digital project in mind?
            </h1>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-trilot-navy/60 dark:text-trilot-paper/60 sm:text-lg">
              Whether you need a clearer website, a useful web application, or
              support for something you already have, tell us what you’re
              working on.
            </p>

            <p className="mt-10 max-w-sm font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/45 dark:text-trilot-paper/45">
              Fields marked with an asterisk are required.
            </p>
          </motion.header>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduceMotion ? 0 : 0.08,
              duration: reduceMotion ? 0 : 0.6,
              ease: easeOut,
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="overflow-hidden border border-trilot-navy/15 bg-trilot-paper/50 dark:border-trilot-paper/15 dark:bg-trilot-navy/30"
            >
              <div className="divide-y divide-trilot-navy/15 dark:divide-trilot-paper/15">
                <fieldset className="px-5 py-7 sm:px-8 sm:py-10">
                  <legend className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/45 dark:text-trilot-paper/45">
                    About you
                  </legend>

                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium"
                      >
                        Name{" "}
                        <span aria-hidden="true" className="text-trilot-coral">
                          *
                        </span>
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(event) =>
                          updateField("name", event.target.value)
                        }
                        className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-trilot-navy/35 focus:border-trilot-coral dark:border-trilot-paper/30 dark:placeholder:text-trilot-paper/35"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium"
                      >
                        Email{" "}
                        <span aria-hidden="true" className="text-trilot-coral">
                          *
                        </span>
                      </label>

                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        required
                        value={formData.email}
                        onChange={(event) =>
                          updateField("email", event.target.value)
                        }
                        className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-trilot-navy/35 focus:border-trilot-coral dark:border-trilot-paper/30 dark:placeholder:text-trilot-paper/35"
                        placeholder="you@business.com"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="business"
                      className="block text-sm font-medium"
                    >
                      Business name{" "}
                      <span className="font-normal text-trilot-navy/45 dark:text-trilot-paper/45">
                        (optional)
                      </span>
                    </label>

                    <input
                      id="business"
                      name="business"
                      type="text"
                      autoComplete="organization"
                      value={formData.business}
                      onChange={(event) =>
                        updateField("business", event.target.value)
                      }
                      className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-trilot-navy/35 focus:border-trilot-coral dark:border-trilot-paper/30 dark:placeholder:text-trilot-paper/35"
                      placeholder="Your business or organisation"
                    />
                  </div>
                </fieldset>

                <fieldset className="px-5 py-7 sm:px-8 sm:py-10">
                  <legend className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/45 dark:text-trilot-paper/45">
                    About the work
                  </legend>

                  <div className="mt-7">
                    <label
                      htmlFor="service"
                      className="block text-sm font-medium"
                    >
                      What do you need help with?{" "}
                      <span aria-hidden="true" className="text-trilot-coral">
                        *
                      </span>
                    </label>

                    <div className="relative mt-3">
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={(event) =>
                          updateField("service", event.target.value)
                        }
                        className="form-select w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 pr-8 text-base outline-none transition-colors focus:border-trilot-coral dark:border-trilot-paper/30"
                      >
                        <option value="" disabled>
                          Choose one
                        </option>

                        <option value="Website">A new website</option>
                        <option value="Website redesign">
                          A website redesign
                        </option>
                        <option value="Web application">
                          A web application or digital tool
                        </option>
                        <option value="Support">
                          Ongoing support or improvements
                        </option>
                        <option value="Not sure yet">I’m not sure yet</option>
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-trilot-coral"
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <label
                      htmlFor="details"
                      className="block text-sm font-medium"
                    >
                      Tell us a little about it{" "}
                      <span aria-hidden="true" className="text-trilot-coral">
                        *
                      </span>
                    </label>

                    <p
                      id="details-hint"
                      className="mt-2 text-sm leading-relaxed text-trilot-navy/50 dark:text-trilot-paper/50"
                    >
                      What are you trying to achieve, and what would a useful
                      outcome look like?
                    </p>

                    <textarea
                      id="details"
                      name="details"
                      rows={7}
                      required
                      aria-describedby="details-hint"
                      value={formData.details}
                      onChange={(event) =>
                        updateField("details", event.target.value)
                      }
                      className="mt-4 w-full resize-y border border-trilot-navy/25 bg-transparent p-4 text-base leading-relaxed outline-none transition-colors placeholder:text-trilot-navy/35 focus:border-trilot-coral dark:border-trilot-paper/25 dark:placeholder:text-trilot-paper/35"
                      placeholder="Tell us about your business, what you need, and anything else that would be helpful."
                    />
                  </div>
                </fieldset>

                <fieldset className="px-5 py-7 sm:px-8 sm:py-10">
                  <legend className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/45 dark:text-trilot-paper/45">
                    Optional details
                  </legend>

                  <div className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="budget"
                        className="block text-sm font-medium"
                      >
                        Budget range{" "}
                        <span className="font-normal text-trilot-navy/45 dark:text-trilot-paper/45">
                          (optional)
                        </span>
                      </label>

                      <div className="relative mt-3">
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={(event) =>
                            updateField("budget", event.target.value)
                          }
                          className="form-select w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 pr-8 text-base outline-none transition-colors focus:border-trilot-coral dark:border-trilot-paper/30"
                        >
                          <option value="">Prefer not to say</option>
                          <option value="Under ₦500k">Under ₦500k</option>
                          <option value="₦500k–₦1M">₦500k–₦1M</option>
                          <option value="₦1M–₦3M">₦1M–₦3M</option>
                          <option value="₦3M–₦5M">₦3M–₦5M</option>
                          <option value="Above ₦5M">Above ₦5M</option>
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-trilot-coral"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="block text-sm font-medium"
                      >
                        Timeline{" "}
                        <span className="font-normal text-trilot-navy/45 dark:text-trilot-paper/45">
                          (optional)
                        </span>
                      </label>

                      <div className="relative mt-3">
                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={(event) =>
                            updateField("timeline", event.target.value)
                          }
                          className="form-select w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 pr-8 text-base outline-none transition-colors focus:border-trilot-coral dark:border-trilot-paper/30"
                        >
                          <option value="">Not sure yet</option>
                          <option value="As soon as possible">
                            As soon as possible
                          </option>
                          <option value="Within one month">
                            Within one month
                          </option>
                          <option value="In 1–3 months">In 1–3 months</option>
                          <option value="In 3–6 months">In 3–6 months</option>
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-trilot-coral"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="flex flex-col items-stretch gap-4 bg-trilot-navy/3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8 dark:bg-trilot-paper/4">
                  <button
                    type="submit"
                    disabled={submitState === "sending"}
                    className="group inline-flex min-h-12 items-center justify-center gap-3 bg-trilot-coral px-5 py-3 text-sm font-bold text-trilot-navy transition-colors hover:bg-trilot-coral-strong hover:text-trilot-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral disabled:cursor-wait disabled:opacity-60 sm:px-6"
                  >
                    {submitState === "sending"
                      ? "Sending details..."
                      : EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID
                        ? "Send project details"
                        : "Continue on WhatsApp"}
                    <Send size={17} aria-hidden="true" />
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      ↗
                    </span>
                  </button>

                  {submitState === "sent" ? (
                    <p className="text-sm text-trilot-coral" role="status">
                      Thanks. Your project details have been sent.
                    </p>
                  ) : submitState === "error" ? (
                    <p className="text-sm text-trilot-coral" role="alert">
                      We could not send that yet. Please try again or contact us
                      on WhatsApp.
                    </p>
                  ) : null}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
