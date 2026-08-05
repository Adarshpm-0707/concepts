import React, { useEffect, useLayoutEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CursorGrid from './components/ui/CursorGrid';

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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCb);
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
      const timer = setTimeout(() => {
        forceScrollTop();
        ScrollTrigger.refresh();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return null;
}

// Minimal fallback spinner during lazy chunk load
function PageFallback() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center bg-black text-white">
      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />

      {/* ── GLOBAL CURSOR GRID ── fixed overlay, all pages ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', mixBlendMode: 'screen' }}>
        <CursorGrid
          cellSize={40}
          color="#ffffff"
          radius={160}
          falloff="smooth"
          holdTime={400}
          fadeDuration={900}
          lineWidth={1}
          maxOpacity={0.45}
          fillOpacity={0.03}
          gridOpacity={0.035}
          cellRadius={0}
          clickPulse={true}
          pulseSpeed={550}
        />
      </div>

      <div className="relative min-h-screen text-slate-100 font-sans selection:bg-white selection:text-black flex flex-col overflow-x-hidden bg-black">
        <Navbar />
        <main className="flex-grow flex-1 relative z-10">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/"                      element={<Home />} />
              <Route path="/about"                 element={<AboutPage />} />
              <Route path="/services"              element={<ServicesPage />} />
              <Route path="/services/:serviceId"   element={<ServiceDetailPage />} />
              <Route path="/portfolio"             element={<PortfolioPage />} />
              <Route path="/careers"               element={<CareersPage />} />
              <Route path="/contact"               element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
