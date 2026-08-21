import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";

import { SplashScreen } from "./components/SplashScreen";
import { ThemeProvider } from "./context/ThemeContext";

import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import TrustStrip from "./sections/TrustStrip";
import Services from "./sections/Services";
import Process from "./sections/Process";
import Work from "./sections/Work";
import ContactCta from "./sections/Contact";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";
import ProjectPage from "./pages/ProjectPage";
import StartProject from "./pages/StartProject";
import ServicesPage from "./pages/ServicesPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import SecurityPage from "./pages/SecurityPage";
import About from "./sections/About";
import AboutPage from "./pages/AboutPage";

function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const targetId = hash.slice(1);

    if (!targetId) {
      window.scrollTo(0, 0);
      return;
    }

    window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, [pathname, hash]);

  return null;
}

function HomePage({ showSplash }: { showSplash: boolean }) {
  return (
    <>
      <Navbar />

      <main>
        <Hero key={showSplash ? "hero-hidden" : "hero-visible"} />
        <TrustStrip />
        <About />
        <Services />
        <Process />
        <Work />
        <Faq />
        <ContactCta />
      </main>

      <Footer />
    </>
  );
}

function StartProjectPage() {
  return (
    <>
      <Navbar />
      <StartProject />
      <Footer />
    </>
  );
}

function ProjectPageLayout() {
  return (
    <>
      <Navbar />
      <ProjectPage />
      <Footer />
    </>
  );
}

function ServicesPageLayout() {
  return (
    <>
      <Navbar />
      <ServicesPage />
      <Footer />
    </>
  );
}

function LegalPageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  const splashActive = showSplash && location.pathname === "/";

  const completeSplash = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = splashActive ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [splashActive]);

  return (
    <>
      <HashScroll />
      <ThemeProvider>
        <AnimatePresence mode="wait">
          {splashActive && <SplashScreen onComplete={completeSplash} />}
        </AnimatePresence>

        <div
          aria-hidden={splashActive}
          className={splashActive ? "pointer-events-none" : ""}
        >
          <Routes>
            <Route path="/" element={<HomePage showSplash={showSplash} />} />

            <Route path="/start-project" element={<StartProjectPage />} />

            <Route path="/services" element={<ServicesPageLayout />} />

            <Route
              path="/about"
              element={
                <LegalPageLayout>
                  <AboutPage />
                </LegalPageLayout>
              }
            />

            <Route
              path="/privacy"
              element={
                <LegalPageLayout>
                  <PrivacyPage />
                </LegalPageLayout>
              }
            />

            <Route
              path="/terms"
              element={
                <LegalPageLayout>
                  <TermsPage />
                </LegalPageLayout>
              }
            />

            <Route
              path="/security"
              element={
                <LegalPageLayout>
                  <SecurityPage />
                </LegalPageLayout>
              }
            />

            <Route path="/work/:slug" element={<ProjectPageLayout />} />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export function App() {
  return <AppContent />;
}

export default App;
