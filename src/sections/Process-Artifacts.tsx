import { motion } from "motion/react";

const artifactTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
};

function ArtifactFrame({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative min-h-88 overflow-hidden border border-trilot-navy/15 bg-[#fbf8f1] p-6 text-trilot-navy shadow-[12px_16px_0_rgba(16,42,67,0.06)] sm:min-h-[min(28rem,54svh)] sm:p-8",
        className,
      ].join(" ")}
    >
      <div className="flex items-center justify-between border-b border-trilot-navy/15 pb-4">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/55">
          {label}
        </span>

        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-trilot-coral" />
          <span className="h-2 w-2 rounded-full bg-trilot-blue" />
          <span className="h-2 w-2 rounded-full bg-trilot-navy/20" />
        </span>
      </div>

      <div className="relative z-10">{children}</div>

      <span
        aria-hidden="true"
        className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full border border-trilot-coral/20"
      />
    </div>
  );
}

export function BriefArtifact() {
  return (
    <ArtifactFrame label="Project brief / 001">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={artifactTransition}
        className="pt-14"
      >
        <p className="font-display text-4xl leading-[0.92] tracking-[-0.07em] sm:text-5xl">
          What needs
          <br />
          to change?
        </p>

        <div className="mt-12 space-y-4 font-mono text-xs text-trilot-navy/55">
          <div className="flex justify-between border-b border-trilot-navy/10 pb-3">
            <span>Business</span>
            <span className="text-trilot-navy">direction</span>
          </div>

          <div className="flex justify-between border-b border-trilot-navy/10 pb-3">
            <span>Audience</span>
            <span className="text-trilot-navy">clarity</span>
          </div>

          <div className="flex justify-between border-b border-trilot-navy/10 pb-3">
            <span>Opportunity</span>
            <span className="text-trilot-navy">movement</span>
          </div>
        </div>

        <p className="absolute bottom-8 right-8 rotate-[-5deg] font-mono text-[0.58rem] uppercase tracking-widest text-trilot-coral">
          ask better
        </p>
      </motion.div>
    </ArtifactFrame>
  );
}

export function ShapeArtifact() {
  return (
    <ArtifactFrame label="Information architecture / 002">
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={artifactTransition}
        className="pt-12"
      >
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-trilot-navy/45">
          Site structure
        </p>

        <div className="mt-10 space-y-5 font-mono text-sm">
          <div className="flex items-center gap-4">
            <span className="text-trilot-coral">01</span>
            <span className="h-px w-8 bg-trilot-coral" />
            <span>Home</span>
          </div>

          <div className="ml-8 flex items-center gap-4">
            <span className="text-trilot-navy/45">02</span>
            <span className="h-px w-8 bg-trilot-navy/25" />
            <span>Services</span>
          </div>

          <div className="ml-8 flex items-center gap-4">
            <span className="text-trilot-navy/45">03</span>
            <span className="h-px w-8 bg-trilot-navy/25" />
            <span>Work</span>
          </div>

          <div className="ml-8 flex items-center gap-4">
            <span className="text-trilot-navy/45">04</span>
            <span className="h-px w-8 bg-trilot-navy/25" />
            <span>Contact</span>
          </div>
        </div>

        <div className="mt-12 max-w-56 border-l-2 border-trilot-coral pl-4 text-sm leading-relaxed text-trilot-navy/55">
          Content hierarchy follows the decision we want visitors to make.
        </div>
      </motion.div>
    </ArtifactFrame>
  );
}

export function BuildArtifact() {
  return (
    <ArtifactFrame label="Interface system / 003" className="bg-trilot-blue/45">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={artifactTransition}
        className="pt-12"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-trilot-navy/50">
              Component / 014
            </p>

            <p className="mt-3 font-display text-4xl leading-none tracking-[-0.07em]">
              Button
            </p>
          </div>

          <span className="font-mono text-[0.58rem] text-trilot-navy/45">
            v0.8
          </span>
        </div>

        <div className="mt-12 space-y-5">
          <div className="flex h-14 items-center justify-between bg-trilot-navy px-5 text-sm text-trilot-paper">
            <span>Start a project</span>
            <span aria-hidden="true">↗</span>
          </div>

          <div className="flex h-14 items-center justify-between border border-trilot-navy/40 px-5 text-sm">
            <span>Learn more</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between border-t border-trilot-navy/20 pt-4 font-mono text-[0.58rem] uppercase tracking-widest text-trilot-navy/50">
          <span>desktop</span>
          <span>mobile</span>
          <span>tested</span>
        </div>
      </motion.div>
    </ArtifactFrame>
  );
}

export function LaunchArtifact() {
  return (
    <ArtifactFrame label="Release notes / 004">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={artifactTransition}
        className="pt-12"
      >
        <p className="font-display text-4xl leading-[0.92] tracking-[-0.07em] sm:text-5xl">
          Ready for
          <br />
          the real world.
        </p>

        <div className="mt-12 space-y-5 font-mono text-xs">
          <p>
            <span className="text-trilot-coral">[x]</span>{" "}
            Responsive
          </p>

          <p>
            <span className="text-trilot-coral">[x]</span>{" "}
            Accessible
          </p>

          <p>
            <span className="text-trilot-coral">[x]</span>{" "}
            Tested
          </p>

          <p className="text-trilot-navy/50">
            <span className="text-trilot-coral">[ ]</span>{" "}
            Improve next
          </p>
        </div>

        <div className="mt-12 flex items-end justify-between border-t border-trilot-navy/15 pt-4">
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.12em] text-trilot-navy/45">
            Release
          </span>

          <span className="font-display text-3xl tracking-[-0.07em]">
            v1.0 → v1.1
          </span>
        </div>
      </motion.div>
    </ArtifactFrame>
  );
}