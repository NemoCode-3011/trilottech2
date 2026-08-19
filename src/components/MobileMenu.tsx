import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import type { RefObject } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export type NavLink = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  links: NavLink[];
  onClose: () => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ links, onClose,triggerRef, }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef?.current?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="nav-glass nav-glass--scrolled fixed inset-0 z-[60] flex min-h-0 flex-col overflow-y-auto rounded-none border-0 md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.25,
          ease: easeOut,
        },
      }}
      transition={{ duration: 0.4, ease: easeOut }}
    >
      <div className="flex shrink-0 items-center justify-between px-6 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <a
          href="#home"
          onClick={onClose}
          className="flex items-center gap-2"
          aria-label="Trilot home"
        >
          <img src="/assets/logo2.png" alt="" className="h-6 w-auto" />
        </a>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[var(--nav-hover-bg)]"
            style={{ color: "var(--nav-text)" }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

     <nav className="flex min-h-0 flex-1 flex-col justify-center gap-1 overflow-y-auto px-8 py-8">
        {links.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            onClick={onClose}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.12 + index * 0.06,
              duration: 0.55,
              ease: easeOut,
            }}
            className="group flex items-center gap-3 py-2 font-display text-[clamp(2.25rem,9vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-200"
            style={{ color: "var(--nav-text)" }}
          >
            <span
              aria-hidden="true"
              className="size-2 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{ background: "var(--color-trilot-coral)" }}
            />
            {link.label}
          </motion.a>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.12 + links.length * 0.06 + 0.05,
          duration: 0.5,
          ease: easeOut,
        }}
        className="shrink-0 px-8 pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-6"
      >
        <Button href="#contact" onClick={onClose} className="w-full">
          Start a project
        </Button>
      </motion.div>
    </motion.div>
  );
}