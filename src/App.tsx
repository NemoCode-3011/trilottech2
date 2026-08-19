import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/SplashScreen";
import { ThemeProvider } from "./context/ThemeContext";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import TrustStrip from "./sections/TrustStrip";
import Services from "./sections/Services";
import Process from "./sections/Process";
import Work from "./sections/Work";

export function App() {
  const [showSplash, setShowSplash] = useState(true);

  const completeSplash = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSplash ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showSplash]);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreen onComplete={completeSplash} />}
      </AnimatePresence>

      <div
        aria-hidden={showSplash}
        className={showSplash ? "pointer-events-none" : ""}
      >
        <Navbar />

        <main>
          <Hero />
          <TrustStrip />
          <Services />
          <Process />
          <Work />

          <section id="contact" className="section-space bg-trilot-paper">
            <div className="container-trilot">
              <p className="eyebrow">Have a project?</p>

              <h2 className="mt-4 max-w-[10ch] font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-trilot-navy">
                Let’s make it real.
              </h2>
            </div>
          </section>
          <section id="contact" className="section-space bg-trilot-paper">
            <div className="container-trilot">
              <p className="eyebrow">Have a project?</p>

              <h2 className="mt-4 max-w-[10ch] font-display text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-trilot-navy">
                Let’s make it real.
              </h2>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
