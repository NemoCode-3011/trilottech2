import { useEffect, useState } from "react";

/**
 * Returns true once the page has scrolled past `threshold` px.
 * Used to switch the nav pill into its "scrolled" (denser glass) state.
 */
export function useScrollProgress(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(
    typeof window !== "undefined" ? window.scrollY > threshold : false,
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}