import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { easeOut } from "../lib/motion";

type SplashScreenProps = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(
      onComplete,
      shouldReduceMotion ? 400 : 1900,
    );

    return () => window.clearTimeout(timer);
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden bg-trilot-navy"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: easeOut,
        },
      }}
    >
      {/* Soft ambient glow — same blurred-color-blob motif used behind
          cards in TrustStrip/Services, so the splash reads as this site's
          rather than a generic loading screen. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-14436rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-trilot-blue/20 blur-3xl"
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.4,
          ease: easeOut,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 translate-x-[-65%] translate-y-[-35%] rounded-full bg-trilot-coral/15 blur-3xl"
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.15,
          duration: shouldReduceMotion ? 0 : 1.4,
          ease: easeOut,
        }}
      />

      <motion.img
        src="/assets/logo2-transparent.png"
        alt="Trilot"
        className="relative w-12 sm:w-14"
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 220, damping: 18 }
        }
      />

      <motion.p
        className="relative mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-trilot-paper sm:text-3xl"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.2,
          duration: shouldReduceMotion ? 0 : 0.6,
          ease: easeOut,
        }}
      >
        Trilot Technologies
      </motion.p>

      <motion.span
        aria-hidden="true"
        className="relative mt-4 h-px w-10 origin-center bg-trilot-coral"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.6,
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: easeOut,
        }}
      />

      <motion.p
        aria-hidden="true"
        className="relative mt-4 font-mono text-[0.62rem] tracking-[0.2em] text-trilot-paper/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.95,
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: easeOut,
        }}
      >
        STRATEGY · DESIGN · DEVELOPMENT
      </motion.p>
    </motion.div>
  );
}