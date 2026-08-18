import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

type SplashScreenProps = {
  onComplete: () => void;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(
      onComplete,
      shouldReduceMotion ? 400 : 2200,
    );

    return () => window.clearTimeout(timer);
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-100 overflow-hidden bg-trilot-paper"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.7,
          ease: easeOut,
        },
      }}
    >
      {/* Background paper layers */}
      <motion.div
        aria-hidden="true"
        className="absolute -right-20 -top-24 h-[42vh] w-[54vw] rotate-[-8deg] bg-trilot-sky/70"
        initial={{ x: "18%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.1,
          ease: easeOut,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -bottom-32 -left-24 h-[38vh] w-[48vw] rotate-[8deg] bg-trilot-navy"
        initial={{ x: "-18%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.1,
          duration: shouldReduceMotion ? 0 : 1.1,
          ease: easeOut,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[min(70vw,34rem)] w-[min(70vw,34rem)] -translate-x-1/2 -translate-y-1/2 rotate-[-5deg] border border-trilot-navy/10 bg-white/40 shadow-[1.5rem_1.5rem_0_rgba(16,42,67,0.08)]"
        initial={{ opacity: 0, scale: 0.88, rotate: -12 }}
        animate={{ opacity: 1, scale: 1, rotate: -5 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.2,
          duration: shouldReduceMotion ? 0 : 0.9,
          ease: easeOut,
        }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 flex w-[min(86vw,30rem)] -translate-x-1/2 -translate-y-1/2 flex-col items-center bg-trilot-paper px-6 py-12 text-center shadow-[1rem_1rem_0_rgba(16,42,67,0.1)] sm:px-12 sm:py-16"
        initial={{ opacity: 0, y: 32, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 0.35,
          duration: shouldReduceMotion ? 0 : 0.9,
          ease: easeOut,
        }}
      >
        <motion.img
          src="/logo2.png"
          alt="Trilot"
          className="w-24 mix-blend-multiply sm:w-32"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.65,
            duration: shouldReduceMotion ? 0 : 0.7,
            ease: easeOut,
          }}
        />

        <motion.h1
          className="mt-8 font-display text-[clamp(2rem,7vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.07em] text-trilot-navy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.8,
            duration: shouldReduceMotion ? 0 : 0.7,
            ease: easeOut,
          }}
        >
          Trilot Technologies
        </motion.h1>

        {/* Coral studio annotation */}
        <motion.div
          aria-hidden="true"
          className="mt-8 h-1 w-28 origin-left rounded-full bg-trilot-coral"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            delay: shouldReduceMotion ? 0 : 1.25,
            duration: shouldReduceMotion ? 0 : 0.55,
            ease: easeOut,
          }}
        />
      </motion.div>

      {/* Small visual registration marks */}
      <motion.span
        aria-hidden="true"
        className="absolute left-[12%] top-[18%] size-3 rounded-full bg-trilot-blue"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 1,
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: easeOut,
        }}
      />

      <motion.span
        aria-hidden="true"
        className="absolute bottom-[16%] right-[12%] h-16 w-px rotate-45 bg-trilot-coral"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{
          delay: shouldReduceMotion ? 0 : 1.1,
          duration: shouldReduceMotion ? 0 : 0.45,
          ease: easeOut,
        }}
      />
    </motion.div>
  );
}