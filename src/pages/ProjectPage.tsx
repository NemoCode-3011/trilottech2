import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "../components/Container";
import { getProjectBySlug, projects } from "../data/projects";
import { easeOut } from "../lib/motion";

type ImageViewerProps = {
  image: { src: string; alt: string } | null;
  onClose: () => void;
};

function ImageViewer({ image, onClose }: ImageViewerProps) {
  useEffect(() => {
    if (!image) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-100 flex items-center justify-center bg-trilot-ink/90 p-5 sm:p-10"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image preview"
        className="absolute right-5 top-5 z-10 flex size-10 items-center justify-center rounded-full text-trilot-paper transition-colors hover:bg-trilot-paper/10 focus-visible:outline-2 focus-visible:outline-trilot-coral sm:right-8 sm:top-8"
      >
        <X size={22} />
      </button>

      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[90vh] max-w-full object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

function NotFoundProject() {
  return (
    <main className="min-h-screen bg-trilot-paper text-trilot-navy dark:bg-trilot-ink dark:text-trilot-paper">
      <Container className="py-24 sm:py-32">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-trilot-coral">
          Project not found
        </p>

        <h1 className="mt-6 max-w-[9ch] font-display text-5xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl">
          This project does not exist.
        </h1>

        <Link
          to="/#work"
          className="mt-10 inline-flex items-center gap-3 border-b border-trilot-navy/40 pb-2 text-sm font-medium transition-colors hover:border-trilot-coral hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
        >
          View selected builds
          <span aria-hidden="true">↗</span>
        </Link>
      </Container>
    </main>
  );
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const reduceMotion = useReducedMotion();
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  if (!project) {
    return <NotFoundProject />;
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);

  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="bg-trilot-paper text-trilot-navy dark:bg-trilot-ink dark:text-trilot-paper">
      <Container className="pb-8 pt-28 sm:pb-10 sm:pt-32 lg:pb-12 lg:pt-36">
        <Link
          to="/#work"
          className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-trilot-navy/60 transition-colors hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral dark:text-trilot-paper/60"
        >
          <ArrowLeft
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          Selected builds
        </Link>
      </Container>

      <Container className="pb-24 pt-10 sm:pb-32 sm:pt-16 lg:pb-40">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease: easeOut,
          }}
          className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-24"
        >
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-trilot-coral">
              {project.number} / {project.industry}
            </p>

            <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.82] tracking-[-0.09em] sm:text-8xl lg:text-9xl">
              {project.name}
            </h1>
          </div>

          <div className="max-w-xl lg:pb-2">
            <p className="font-display text-2xl font-semibold leading-[1.02] tracking-tight sm:text-3xl">
              {project.summary}
            </p>

            <p className="mt-6 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/45 dark:text-trilot-paper/45">
              {project.label}
            </p>
          </div>
        </motion.header>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: reduceMotion ? 0 : 0.1,
            duration: reduceMotion ? 0 : 0.7,
            ease: easeOut,
          }}
          className="mt-16 aspect-16/10 overflow-hidden bg-trilot-navy/5 sm:mt-20 sm:aspect-video"
        >
          <button
            type="button"
            aria-label={`View ${project.name} homepage image`}
            className="group block h-full w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-trilot-coral"
            onClick={() =>
              setSelectedImage({
                src: project.heroImage,
                alt: `${project.name} website homepage`,
              })
            }
          >
            <img
              src={project.heroImage}
              alt={`${project.name} website homepage`}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </button>
        </motion.div>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-navy/45 dark:text-trilot-paper/45">
              Project details
            </p>

            <dl className="mt-6 divide-y divide-trilot-navy/15 border-t border-trilot-navy/15 dark:divide-trilot-paper/15 dark:border-trilot-paper/15">
              <div className="flex items-start justify-between gap-5 py-4">
                <dt className="text-sm text-trilot-navy/55 dark:text-trilot-paper/55">
                  Industry
                </dt>
                <dd className="max-w-48 text-right text-sm">
                  {project.industry}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-5 py-4">
                <dt className="text-sm text-trilot-navy/55 dark:text-trilot-paper/55">
                  Type
                </dt>
                <dd className="text-right text-sm">{project.label}</dd>
              </div>

              <div className="py-4">
                <dt className="text-sm text-trilot-navy/55 dark:text-trilot-paper/55">
                  What I did
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span
                      key={service}
                      className="border border-trilot-navy/20 px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.08em] dark:border-trilot-paper/20"
                    >
                      {service}
                    </span>
                  ))}
                </dd>
              </div>

              <div className="py-4">
                <dt className="text-sm text-trilot-navy/55 dark:text-trilot-paper/55">
                  Built with
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[0.58rem] uppercase tracking-[0.08em] text-trilot-navy/55 dark:text-trilot-paper/55"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>

          <div>
            <section aria-labelledby="brief-heading">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-coral">
                The brief
              </p>

              <h2
                id="brief-heading"
                className="mt-5 max-w-[13ch] font-display text-4xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-5xl"
              >
                What the project needed to do.
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-relaxed text-trilot-navy/65 dark:text-trilot-paper/65 sm:text-lg">
                {project.brief}
              </p>
            </section>

            <section
              aria-labelledby="approach-heading"
              className="mt-20 border-t border-trilot-navy/15 pt-10 sm:mt-28 sm:pt-12 dark:border-trilot-paper/15"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-coral">
                The approach
              </p>

              <h2
                id="approach-heading"
                className="mt-5 max-w-[13ch] font-display text-4xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-5xl"
              >
                Designed around the real decision.
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-relaxed text-trilot-navy/65 dark:text-trilot-paper/65 sm:text-lg">
                {project.approach}
              </p>
            </section>

            <section
              aria-labelledby="screens-heading"
              className="mt-20 border-t border-trilot-navy/15 pt-10 sm:mt-28 sm:pt-12 dark:border-trilot-paper/15"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-coral">
                    Selected screens
                  </p>

                  <h2
                    id="screens-heading"
                    className="mt-5 font-display text-4xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-5xl"
                  >
                    The details in use.
                  </h2>
                </div>

                <span className="font-mono text-[0.58rem] uppercase tracking-widest text-trilot-navy/45 dark:text-trilot-paper/45">
                  {project.gallery.length} views
                </span>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {project.gallery.map((image, index) => (
                  <figure
                    key={image}
                    className={index === 0 ? "sm:col-span-2" : ""}
                  >
                    <button
                      type="button"
                      aria-label={`View ${project.name} screen ${index + 1}`}
                      className={`group block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-trilot-coral ${
                        index === 0
                          ? "aspect-16/10 overflow-hidden bg-trilot-navy/5 dark:bg-trilot-paper/5"
                          : "aspect-4/5 overflow-hidden bg-trilot-navy/5 dark:bg-trilot-paper/5"
                      }`}
                      onClick={() =>
                        setSelectedImage({
                          src: image,
                          alt: `${project.name} screen ${index + 1}`,
                        })
                      }
                    >
                      <img
                        src={image}
                        alt={`${project.name} screen ${index + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </button>
                  </figure>
                ))}
              </div>
            </section>

            <section
              aria-labelledby="outcome-heading"
              className="mt-20 border-t border-trilot-navy/15 pt-10 sm:mt-28 sm:pt-12 dark:border-trilot-paper/15"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-coral">
                The outcome
              </p>

              <h2
                id="outcome-heading"
                className="mt-5 max-w-[13ch] font-display text-4xl font-semibold leading-[0.9] tracking-[-0.07em] sm:text-5xl"
              >
                A useful digital foundation.
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-relaxed text-trilot-navy/65 dark:text-trilot-paper/65 sm:text-lg">
                {project.outcome}
              </p>
            </section>

            <div className="mt-16 flex flex-wrap gap-4 border-t border-trilot-navy/15 pt-8 sm:mt-20 dark:border-trilot-paper/15">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 bg-trilot-navy px-5 py-3 text-sm font-medium text-trilot-paper transition-colors hover:bg-trilot-coral hover:text-trilot-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
                >
                  Visit live website
                  <ArrowUpRight
                    aria-hidden="true"
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              ) : null}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border border-trilot-navy/25 px-5 py-3 text-sm font-medium transition-colors hover:border-trilot-coral hover:text-trilot-coral focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral dark:border-trilot-paper/25"
              >
                View source
                <ArrowUpRight
                  aria-hidden="true"
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-trilot-navy/15 pt-10 sm:mt-32 sm:pt-12 dark:border-trilot-paper/15">
          <Link
            to={`/work/${nextProject.slug}`}
            className="group flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-trilot-coral"
          >
            <div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-trilot-coral">
                Next project
              </p>

              <p className="mt-5 font-display text-5xl font-semibold leading-[0.86] tracking-[-0.08em] sm:text-7xl">
                {nextProject.name}
              </p>
            </div>

            <span
              aria-hidden="true"
              className="text-3xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-trilot-coral"
            >
              ↗
            </span>
          </Link>
        </div>
      </Container>

      <ImageViewer
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </main>
  );
}
