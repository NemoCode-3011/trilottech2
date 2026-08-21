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

const SITE_URL = "https://trilot.studio";

const routeMetadata: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Trilot | Websites that move businesses forward",
    description:
      "Distinctive websites and digital products that help ambitious businesses earn attention, trust, and enquiries.",
  },
  "/about": {
    title: "About Trilot | Digital work with purpose",
    description:
      "Meet Trilot, a strategy, design, and development partner for businesses ready to move forward.",
  },
  "/services": {
    title: "Services | Trilot Technologies",
    description:
      "Websites, web applications, and ongoing digital support built around real business goals.",
  },
  "/start-project": {
    title: "Start a Project | Trilot Technologies",
    description:
      "Tell Trilot what you are building and start a practical conversation about your next digital project.",
  },
  "/privacy": {
    title: "Privacy | Trilot Technologies",
    description: "How Trilot handles information shared through this website.",
  },
  "/terms": {
    title: "Terms | Trilot Technologies",
    description: "The general terms for working with Trilot Technologies.",
  },
  "/security": {
    title: "Security | Trilot Technologies",
    description:
      "How Trilot approaches project and client information security.",
  },
};

function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = routeMetadata[pathname] ?? {
      title: "Trilot | Digital experiences built to move business forward",
      description:
        "Trilot designs and builds distinctive websites and digital products for ambitious businesses.",
    };
    const canonicalUrl = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;

    document.title = metadata.title;

    const setMeta = (selector: string, attribute: string, content: string) => {
      const element = document.head.querySelector<HTMLMetaElement>(selector);
      element?.setAttribute(attribute, content);
    };

    setMeta('meta[name="description"]', "content", metadata.description);
    setMeta('meta[property="og:title"]', "content", metadata.title);
    setMeta('meta[property="og:description"]', "content", metadata.description);
    setMeta('meta[property="og:url"]', "content", canonicalUrl);
    setMeta('meta[name="twitter:title"]', "content", metadata.title);
    setMeta(
      'meta[name="twitter:description"]',
      "content",
      metadata.description,
    );

    const canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    canonical?.setAttribute("href", canonicalUrl);
  }, [pathname]);

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
      <Seo />
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
