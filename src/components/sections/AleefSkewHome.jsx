import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './Hero';
import About from './About';
import WhyChooseUs from './WhyChooseUs';
import Services from './Services';
import PortfolioIntro from './PortfolioIntro';
import Testimonials from './Testimonials';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

export default function AleefSkewHome() {
  const mainRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // Line mask text reveal helper
      function splitAndHide(el) {
        if (!el) return [];
        const text = el.getAttribute('data-raw-text') || el.textContent;
        el.setAttribute('data-raw-text', text);

        const words = text.trim().split(/\s+/);
        el.innerHTML = words
          .map((w) => `<span class="split-word" style="display:inline-block; margin-right:0.25em;">${w}</span>`)
          .join('');

        const wordNodes = Array.from(el.querySelectorAll('.split-word'));
        if (!wordNodes.length) return [];

        const linesMap = [];
        let currentTop = -1;
        let currentLine = [];

        wordNodes.forEach((node) => {
          const top = node.offsetTop;
          if (currentTop === -1 || Math.abs(top - currentTop) < 6) {
            currentLine.push(node.textContent);
            currentTop = top;
          } else {
            linesMap.push(currentLine.join(' '));
            currentLine = [node.textContent];
            currentTop = top;
          }
        });
        if (currentLine.length) linesMap.push(currentLine.join(' '));

        el.innerHTML = linesMap
          .map(
            (lineStr) =>
              `<span class="line-mask"><span class="line-inner">${lineStr}</span></span>`
          )
          .join('');

        const lines = Array.from(el.querySelectorAll('.line-inner'));
        gsap.set(lines, { yPercent: 90 });
        gsap.set(el, { visibility: 'visible' });
        return lines;
      }

      function revealLines(lines) {
        if (!lines || !lines.length) return;
        return gsap.to(lines, {
          yPercent: 0,
          duration: 1.4,
          ease: 'power4.out',
          stagger: 0.08,
        });
      }

      // 1. Intro Animation
      const introLabel = mainRef.current.querySelector('.intro p');
      const introTitle = mainRef.current.querySelector('.intro h1');

      if (introLabel && introTitle) {
        const labelLines = splitAndHide(introLabel);
        const titleLines = splitAndHide(introTitle);

        gsap
          .timeline()
          .add(revealLines(labelLines))
          .add(revealLines(titleLines), '<');
      }

      // 2. Skew Background Parallax & Heading Reveal across all sections
      const sections = mainRef.current.querySelectorAll('.section');
      sections.forEach((section) => {
        const h2 = section.querySelector('.heading');
        const bg = section.querySelector('.bg');

        if (bg) {
          gsap.to(bg, {
            y: -220,
            skewY: -8,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 95%',
              end: 'top 40%',
              scrub: 0.5,
            },
          });
        }

        if (h2) {
          const lines = splitAndHide(h2);
          ScrollTrigger.create({
            trigger: section,
            start: 'top 85%',
            once: true,
            onEnter: () => revealLines(lines),
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="skew-main font-satoshi">
      {/* 1. INTRO / HERO SECTION */}
      <section className="intro ink relative z-10">
        <p className="intro-label">Aleef Concepts® — Kannur & GCC</p>
        <h1 className="intro-title">Loud ideas. Sharp execution.</h1>
        <div className="w-full mt-4">
          <Hero />
        </div>
      </section>

      {/* 2. ABOUT SECTION — PORCELAIN THEME */}
      <section className="section porcelain">
        <div className="skew-bg">
          <div className="bg porcelain" />
        </div>
        <div className="container">
          <h2 className="heading">
            The #1 Digital Marketing & Branding Agency in Kannur—scaling local, regional, and GCC brands with high-ROAS strategy®.
          </h2>
          <About />
        </div>
      </section>

      {/* 3. WHY CHOOSE US SECTION — FOREST THEME */}
      <section className="section forest">
        <div className="skew-bg">
          <div className="bg forest" />
        </div>
        <div className="container">
          <h2 className="heading">
            Culture-obsessed marketing partners for business leaders who want their brand to feel like a scene, not a template®.
          </h2>
          <WhyChooseUs />
        </div>
      </section>

      {/* 4. SERVICES SECTION — EMBER THEME */}
      <section className="section ember">
        <div className="skew-bg">
          <div className="bg ember" />
        </div>
        <div className="container">
          <h2 className="heading">
            Kinetic campaigns, SEO dominance, and high-converting tech built to elevate products the second they launch®.
          </h2>
          <Services />
        </div>
      </section>

      {/* 5. PORTFOLIO INTRO SECTION — STEEL THEME */}
      <section className="section steel">
        <div className="skew-bg">
          <div className="bg steel" />
        </div>
        <div className="container">
          <h2 className="heading">
            From Kannur to Dubai—proven revenue growth and client success stories across Kerala and GCC markets®.
          </h2>
          <PortfolioIntro />
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION — PORCELAIN THEME */}
      <section className="section porcelain">
        <div className="skew-bg">
          <div className="bg porcelain" />
        </div>
        <div className="container">
          <h2 className="heading">
            Endorsed by founders, hospital directors, and real estate leaders who trust Kannur's best digital agency®.
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* 7. CTA & CONTACT SECTION — INK THEME */}
      <section className="section ink">
        <div className="skew-bg">
          <div className="bg ink" />
        </div>
        <div className="container">
          <h2 className="heading">
            Ready to work with Kannur's #1 digital marketing office? Let's turn your story into revenue®.
          </h2>
          <div className="mt-6">
            <Contact />
          </div>
        </div>
      </section>
    </div>
  );
}
