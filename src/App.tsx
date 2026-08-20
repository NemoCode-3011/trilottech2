import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SplashScreen } from "./components/SplashScreen";
import { ThemeProvider } from "./context/ThemeContext";

import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import TrustStrip from "./sections/TrustStrip";
import Services from "./sections/Services";
import Process from "./sections/Process";
import Work from "./sections/Work";
import ContactCta from "./sections/Contact";
import Footer from "./sections/Footer";
import ProjectPage from "./pages/ProjectPage";
import StartProject from "./pages/StartProject";

function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Process />
        <Work />
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
    <BrowserRouter>
      <ThemeProvider>
        <AnimatePresence mode="wait">
          {showSplash && <SplashScreen onComplete={completeSplash} />}
        </AnimatePresence>

        <div
          aria-hidden={showSplash}
          className={showSplash ? "pointer-events-none" : ""}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/start-project" element={<StartProjectPage />} />

            <Route path="/work/:slug" element={<ProjectPageLayout />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
