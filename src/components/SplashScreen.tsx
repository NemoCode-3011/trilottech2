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
      className="fixed inset-0 z-100 overflow-hidden bg-trilot-navy text-trilot-paper"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.5,
          ease: easeOut,
        },
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute -right-24 -top-482rem] w-md rotate-18 rounded-[48%_52%_58%_42%] bg-trilot-coral"
        initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
        animate={{ opacity: 0.9, scale: 1, rotate: 18 }}
        transition={{ duration: shouldReduceMotion ? 0 : 1.2, ease: easeOut }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-40 -left-32 h-112 w-100 rotate-[-24deg] rounded-[58%_42%_45%_55%] bg-trilot-blue/80"
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 0.75, scale: 1, rotate: -24 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.15,
          duration: shouldReduceMotion ? 0 : 1.3,
          ease: easeOut,
        }}
      />

      <div className="relative flex min-h-full flex-col items-center justify-center px-5 py-8 text-center sm:px-10 sm:py-10">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.2,
            duration: 0.7,
            ease: easeOut,
          }}
        >
          <motion.img
            src="/assets/logo2-transparent.png"
            alt="Trilot"
            className="w-14 sm:w-16"
            initial={{ opacity: 0, scale: 0.75, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 180, damping: 16 }
            }
          />

          <p className="mt-6 font-body text-xs uppercase tracking-[0.16em] text-trilot-paper/60">
            Trilot Technologies
          </p>

          <h1 className="mt-6 max-w-[12ch] font-display text-5xl font-semibold leading-[0.88] tracking-[-0.07em] sm:mt-8 sm:text-7xl lg:text-8xl">
            Make your business
            <br />
            <span className="italic text-trilot-coral">stand out.</span>
          </h1>

          <motion.span
            aria-hidden="true"
            className="mt-7 h-1 w-16 rounded-full bg-trilot-coral sm:mt-9"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.75,
              duration: shouldReduceMotion ? 0 : 0.6,
              ease: easeOut,
            }}
          />

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-trilot-paper/70 sm:mt-7 sm:text-lg">
            Websites that earn attention, build trust, and bring the right
            customers closer.
          </p>

          <motion.p
            className="mt-8 font-body text-[0.6rem] uppercase tracking-[0.15em] text-trilot-paper/45 sm:mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 1,
              duration: 0.5,
              ease: easeOut,
            }}
          >
            Strategy · Design · Development
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}
