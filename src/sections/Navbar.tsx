import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "../components/Button";
import { ThemeToggle } from "../components/ThemeToggle";
import { MobileMenu, type NavLink } from "../components/MobileMenu";
import { useScrollProgress } from "../hooks/useScrollProgress";

const easeOut = [0.22, 1, 0.36, 1] as const;

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "Portfolio", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

function Navbar() {
  const scrolled = useScrollProgress(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState<string>(NAV_LINKS[0].href);

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
      >
        {/* Desktop pill */}
        <div
          className={`nav-glass ${scrolled ? "nav-glass--scrolled" : ""} hidden w-full max-w-4xl items-center justify-between rounded-full md:flex ${
            scrolled ? "px-5 py-2" : "px-6 py-3.5"
          }`}
        >
          <Link
            to="/#home"
            className="flex shrink-0 items-center gap-2.5"
            aria-label="Trilot home"
          >
            <img src="/assets/logo2.png" alt="" className="h-6 w-auto" />
            <span
              className="font-display text-base font-semibold tracking-[-0.02em]"
              style={{ color: "var(--nav-text)" }}
            >
              Trilot
            </span>
          </Link>

          <nav
            className="relative flex items-center gap-1"
            onMouseLeave={() => setHovered(NAV_LINKS[0].href)}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onMouseEnter={() => setHovered(link.href)}
                className="relative px-4 py-2 text-sm font-semibold transition-colors duration-200"
                style={{
                  color:
                    hovered === link.href
                      ? "var(--nav-text)"
                      : "var(--nav-text-muted)",
                }}
              >
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-spotlight"
                    className="pointer-events-none absolute -top-3 left-1/2 z-0 h-11 w-24 -translate-x-1/2 rounded-full blur-md"
                    style={{
                      background:
                        "radial-gradient(closest-side, var(--nav-glass-highlight-scrolled), transparent 70%)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover-underline"
                    className="absolute inset-x-3 -bottom-0.5 z-10 h-0.5 rounded-full"
                    style={{ background: "var(--nav-underline)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Button
              href="/start-project"
              className="min-h-9! px-4! py-2! text-xs!"
            >
              Start a project
            </Button>
          </div>
        </div>

        {/* Mobile trigger bar */}
        <div
          className={`nav-glass ${scrolled || mobileOpen ? "nav-glass--scrolled" : ""} flex w-full items-center justify-between rounded-full border border-white/10 md:hidden ${
            scrolled || mobileOpen ? "px-4 py-2" : "px-5 py-2.5"
          }`}
          style={
            mobileOpen
              ? {
                  background: "rgba(17, 24, 39, 0.45)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  boxShadow: "0 18px 40px rgba(15, 23, 42, 0.18)",
                }
              : undefined
          }
        >
          <Link
            to="/#home"
            className="flex shrink-0 items-center"
            aria-label="Trilot home"
          >
            <img src="/assets/logo2.png" alt="" className="h-6 w-auto" />
          </Link>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex size-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-(--nav-hover-bg)"
              style={{ color: "var(--nav-text)" }}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            links={NAV_LINKS}
            onClose={() => setMobileOpen(false)}
            triggerRef={menuTriggerRef}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
