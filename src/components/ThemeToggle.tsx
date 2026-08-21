import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/useTheme";

const easeOut = [0.22, 1, 0.36, 1] as const;

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors duration-200 hover:bg-[var(--nav-hover-bg)] ${className}`}
      style={{ color: "var(--nav-text)" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.3, ease: easeOut }}
          className="flex"
        >
          {isDark ? (
            <Moon size={17} strokeWidth={2} />
          ) : (
            <Sun size={17} strokeWidth={2} />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
