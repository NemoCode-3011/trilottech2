import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Container } from "../components/Container";
import { easeOut } from "../lib/motion";

type FormStatus = "idle" | "submitting" | "success" | "error";

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

export default function StartProject() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  function updateField(
    field: keyof ProjectFormData,
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");
    setMessage("");

    try {
      /*
       * Replace this temporary block with your real endpoint.
       *
       * Example:
       * await fetch("/api/project-inquiry", {
       *   method: "POST",
       *   headers: { "Content-Type": "application/json" },
       *   body: JSON.stringify(formData),
       * });
       */

      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      console.log("Project inquiry:", formData);

      setStatus("success");
      setMessage(
        "Thanks — your project details have been received. We’ll be in touch soon.",
      );
      setFormData(initialFormData);
    } catch {
      setStatus("error");
      setMessage(
        "Something went wrong. Please try again or email hello@trilot.studio.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-trilot-paper text-trilot-navy">
      <Container className="py-8 sm:py-10 lg:py-12">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-trilot-navy/60 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
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

            <h1 className="mt-6 max-w-[8ch] font-display text-6xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
              Have a digital project in mind?
            </h1>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-trilot-navy/60 sm:text-lg">
              Whether you need a clearer website, a useful web application, or
              support for something you already have, tell us what you’re
              working on.
            </p>

            <p className="mt-10 max-w-sm font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/45">
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
              noValidate
              onSubmit={handleSubmit}
              className="border-t border-trilot-navy/20"
            >
              <div
                aria-live="polite"
                aria-atomic="true"
                role="status"
                className="sr-only"
              >
                {message}
              </div>

              {status === "success" ? (
                <div className="py-12 sm:py-16">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-trilot-coral">
                    Received
                  </p>

                  <h2 className="mt-5 max-w-[10ch] font-display text-5xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-6xl">
                    Thanks. We’ll be in touch.
                  </h2>

                  <p className="mt-6 max-w-lg text-base leading-relaxed text-trilot-navy/60">
                    Your project details are on their way. We’ll review them
                    and respond as soon as we can.
                  </p>

                  <Link
                    to="/"
                    className="mt-10 inline-flex items-center gap-3 border-b border-trilot-navy/40 pb-2 text-sm font-medium transition-colors hover:border-trilot-coral hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
                  >
                    Back to home
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-trilot-navy/15">
                  <fieldset className="py-8 sm:py-10">
                    <legend className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/45">
                      About you
                    </legend>

                    <div className="mt-7 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium"
                        >
                          Name <span aria-hidden="true" className="text-trilot-coral">*</span>
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
                          className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-trilot-navy/35 focus:border-trilot-coral"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium"
                        >
                          Email <span aria-hidden="true" className="text-trilot-coral">*</span>
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
                          className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-trilot-navy/35 focus:border-trilot-coral"
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
                        <span className="font-normal text-trilot-navy/45">
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
                        className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-trilot-navy/35 focus:border-trilot-coral"
                        placeholder="Your business or organisation"
                      />
                    </div>
                  </fieldset>

                  <fieldset className="py-8 sm:py-10">
                    <legend className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/45">
                      About the work
                    </legend>

                    <div className="mt-7">
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium"
                      >
                        What do you need help with?{" "}
                        <span aria-hidden="true" className="text-trilot-coral">*</span>
                      </label>

                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={(event) =>
                          updateField("service", event.target.value)
                        }
                        className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-trilot-coral"
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
                        <option value="Not sure yet">
                          I’m not sure yet
                        </option>
                      </select>
                    </div>

                    <div className="mt-8">
                      <label
                        htmlFor="details"
                        className="block text-sm font-medium"
                      >
                        Tell us a little about it{" "}
                        <span aria-hidden="true" className="text-trilot-coral">*</span>
                      </label>

                      <p
                        id="details-hint"
                        className="mt-2 text-sm leading-relaxed text-trilot-navy/50"
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
                        className="mt-4 w-full resize-y border border-trilot-navy/25 bg-transparent p-4 text-base leading-relaxed outline-none transition-colors placeholder:text-trilot-navy/35 focus:border-trilot-coral"
                        placeholder="Tell us about your business, what you need, and anything else that would be helpful."
                      />
                    </div>
                  </fieldset>

                  <fieldset className="py-8 sm:py-10">
                    <legend className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/45">
                      Optional details
                    </legend>

                    <div className="mt-7 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-sm font-medium"
                        >
                          Budget range{" "}
                          <span className="font-normal text-trilot-navy/45">
                            (optional)
                          </span>
                        </label>

                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={(event) =>
                            updateField("budget", event.target.value)
                          }
                          className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-trilot-coral"
                        >
                          <option value="">Prefer not to say</option>
                          <option value="Under ₦500k">Under ₦500k</option>
                          <option value="₦500k–₦1M">₦500k–₦1M</option>
                          <option value="₦1M–₦3M">₦1M–₦3M</option>
                          <option value="₦3M–₦5M">₦3M–₦5M</option>
                          <option value="Above ₦5M">Above ₦5M</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-sm font-medium"
                        >
                          Timeline{" "}
                          <span className="font-normal text-trilot-navy/45">
                            (optional)
                          </span>
                        </label>

                        <select
                          id="timeline"
                          name="timeline"
                          value={formData.timeline}
                          onChange={(event) =>
                            updateField("timeline", event.target.value)
                          }
                          className="mt-3 w-full border-b border-trilot-navy/30 bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-trilot-coral"
                        >
                          <option value="">Not sure yet</option>
                          <option value="As soon as possible">
                            As soon as possible
                          </option>
                          <option value="Within one month">
                            Within one month
                          </option>
                          <option value="In 1–3 months">
                            In 1–3 months
                          </option>
                          <option value="In 3–6 months">
                            In 3–6 months
                          </option>
                        </select>
                      </div>
                    </div>
                  </fieldset>

                  {status === "error" ? (
                    <p
                      role="alert"
                      className="py-5 text-sm leading-relaxed text-[#a33b2a]"
                    >
                      {message}
                    </p>
                  ) : null}

                  <div className="flex flex-col items-start gap-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex items-center gap-3 bg-trilot-navy px-6 py-3 text-sm font-medium text-trilot-paper transition-colors hover:bg-trilot-coral hover:text-trilot-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting"
                        ? "Sending details…"
                        : "Send project details"}

                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      >
                        ↗
                      </span>
                    </button>

                    <p className="max-w-xs text-sm leading-relaxed text-trilot-navy/45">
                      We’ll only use these details to respond to your project
                      enquiry.
                    </p>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}