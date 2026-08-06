import React, { useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Code-split pages for instant route switching
const Home              = lazy(() => import('./pages/Home'));
const AboutPage         = lazy(() => import('./pages/AboutPage'));
const ServicesPage      = lazy(() => import('./pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const PortfolioPage     = lazy(() => import('./pages/PortfolioPage'));
const CareersPage       = lazy(() => import('./pages/CareersPage'));
const ContactPage       = lazy(() => import('./pages/ContactPage'));

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScroll manages Lenis smooth scroll instance globally across all routes.
 */
function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenis;

    // Connect Lenis scroll event to GSAP ScrollTrigger update
    lenis.on('scroll', ScrollTrigger.update);

    // Native high-resolution requestAnimationFrame loop for Lenis
    let animationFrameId;
    function update(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(update);
    }
    animationFrameId = requestAnimationFrame(update);

    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      const forceScrollTop = () => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        if (window.lenis) {
          window.lenis.scrollTo(0, { immediate: true });
        }
      };

      forceScrollTop();

      const timer1 = setTimeout(() => {
        forceScrollTop();
        ScrollTrigger.refresh();
      }, 50);

      const timer2 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 350);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [pathname]);

  return null;
}

// Minimal fallback spinner during lazy chunk load
function PageFallback() {
  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center bg-black text-white">
      <div className="w-9 h-9 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex-grow flex flex-col"
      >
        <Suspense fallback={<PageFallback />}>
          <Routes location={location}>
            <Route path="/"                      element={<Home />} />
            <Route path="/about"                 element={<AboutPage />} />
            <Route path="/services"              element={<ServicesPage />} />
            <Route path="/services/:serviceId"   element={<ServiceDetailPage />} />
            <Route path="/portfolio"             element={<PortfolioPage />} />
            <Route path="/careers"               element={<CareersPage />} />
            <Route path="/contact"               element={<ContactPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />

      <div className="relative min-h-screen text-slate-100 font-sans selection:bg-white selection:text-black flex flex-col overflow-x-hidden bg-black">
        <Navbar />
        <main className="flex-grow flex-1 relative z-10 flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
