import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const MotionLink = motion(Link);

type ButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "coral";
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold leading-none transition-colors duration-200";

  const variantStyles =
    variant === "primary"
      ? "bg-trilot-blue text-trilot-paper hover:bg-trilot-navy"
      : variant === "coral"
        ? "bg-trilot-coral-strong text-trilot-paper hover:bg-trilot-navy"
        : "border border-trilot-navy/20 bg-transparent text-trilot-navy hover:bg-trilot-navy hover:text-trilot-paper dark:border-trilot-paper/25 dark:text-trilot-paper dark:hover:bg-trilot-paper dark:hover:text-trilot-navy";

  const buttonClassName = `${baseStyles} ${variantStyles} ${className}`;
  const { href, ...linkProps } = props;

  if (href?.startsWith("/")) {
    return (
      <MotionLink
        to={href}
        className={buttonClassName}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18 }}
        {...linkProps}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.a
      className={buttonClassName}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      href={href}
      {...linkProps}
    >
      {children}
    </motion.a>
  );
}
