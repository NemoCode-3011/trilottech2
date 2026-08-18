import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeUp } from "../lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({
  children,
  className = "",
}: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}