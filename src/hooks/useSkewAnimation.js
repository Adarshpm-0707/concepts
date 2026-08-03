import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

/**
 * Dynamically splits heading elements into line wrappers for masking reveal animations.
 */
function splitTextIntoLines(el) {
  if (!el) return [];
  if (el.dataset.splitDone === 'true') return [];
  el.dataset.splitDone = 'true';

  // Check if heading already contains line-separated blocks (e.g. Hero h1 block spans)
  const directSpans = Array.from(el.children).filter(
    (child) => child.tagName === 'SPAN' && (child.classList.contains('block') || window.getComputedStyle(child).display === 'block')
  );

  if (directSpans.length > 0) {
    const lineElements = [];
    directSpans.forEach((child) => {
      const maskDiv = document.createElement('div');
      maskDiv.className = 'line-mask';
      maskDiv.style.overflow = 'hidden';
      maskDiv.style.display = 'block';

      const innerDiv = document.createElement('div');
      innerDiv.className = 'line-inner';
      innerDiv.style.display = 'block';
      innerDiv.style.willChange = 'transform';

      child.parentNode.insertBefore(maskDiv, child);
      innerDiv.appendChild(child);
      maskDiv.appendChild(innerDiv);
      lineElements.push(innerDiv);
    });
    return lineElements;
  }

  // Fallback word measurement to calculate rendered lines dynamically
  const text = el.innerText ? el.innerText.trim() : '';
  if (!text) return [];

  const words = text.split(/\s+/);
  if (!words.length || (words.length === 1 && words[0] === '')) return [];

  el.innerHTML = '';
  let currentLine = [];
  let currentTop = null;
  const lineGroups = [];

  const tempSpans = words.map((w) => {
    const span = document.createElement('span');
    span.innerText = w + ' ';
    span.style.display = 'inline-block';
    el.appendChild(span);
    return span;
  });

  tempSpans.forEach((span) => {
    const top = span.offsetTop;
    if (currentTop === null) currentTop = top;
    if (Math.abs(top - currentTop) > 6 && currentLine.length > 0) {
      lineGroups.push(currentLine);
      currentLine = [];
      currentTop = top;
    }
    currentLine.push(span.innerText);
  });
  if (currentLine.length > 0) {
    lineGroups.push(currentLine);
  }

  el.innerHTML = '';
  const lineElements = [];

  lineGroups.forEach((lineWords) => {
    const maskDiv = document.createElement('div');
    maskDiv.className = 'line-mask';
    maskDiv.style.overflow = 'hidden';
    maskDiv.style.display = 'block';

    const lineInner = document.createElement('div');
    lineInner.className = 'line-inner';
    lineInner.innerText = lineWords.join('');
    lineInner.style.display = 'block';
    lineInner.style.willChange = 'transform';

    maskDiv.appendChild(lineInner);
    el.appendChild(maskDiv);
    lineElements.push(lineInner);
  });

  return lineElements;
}

export function useSkewAnimation(containerRef) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // 1. Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    let ctx = null;

    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        const sections = containerRef.current.querySelectorAll('.skew-section');

        sections.forEach((section) => {
          const bg = section.querySelector('.skew-bg .bg');
          if (bg) {
            // Section Background Skew & Y-Translation ScrollTrigger
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

          // Section Text Line Reveals
          const headings = section.querySelectorAll('h1, h2');
          headings.forEach((heading) => {
            const lines = splitTextIntoLines(heading);
            if (lines && lines.length > 0) {
              gsap.set(lines, { yPercent: 90 });
              gsap.set(heading, { visibility: 'visible' });

              ScrollTrigger.create({
                trigger: section,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                  gsap.to(lines, {
                    yPercent: 0,
                    duration: 1.4,
                    ease: 'power4.out',
                    stagger: 0.08,
                  });
                },
              });
            }
          });
        });
      }, containerRef);

      ScrollTrigger.refresh();
    }, 50);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      if (ctx) ctx.revert();
    };
  }, [containerRef]);
}
