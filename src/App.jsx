import React, { useLayoutEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Code-split pages for instant route switching
const Home          = lazy(() => import('./pages/Home'));
const AboutPage     = lazy(() => import('./pages/AboutPage'));
const ServicesPage  = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const ContactPage   = lazy(() => import('./pages/ContactPage'));

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollToTop guarantees instant top section scroll on every page navigation.
 * Disables browser default scroll restoration so every route starts at top 0,0.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);
    return () => clearTimeout(timer);
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
      <ScrollToTop />
      <div className="relative min-h-screen text-slate-100 font-sans selection:bg-white selection:text-black flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-grow flex-1 relative z-10">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/about"     element={<AboutPage />} />
              <Route path="/services"  element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/contact"   element={<ContactPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
