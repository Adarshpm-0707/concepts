import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const studioSections = [
  {
    theme: 'porcelain',
    heading: 'We build brands that refuse to whisper—color-first identities, wild type, and digital stages made to steal the scroll®.',
    img: 'https://i.pinimg.com/736x/2d/46/b7/2d46b7b8aeb8cec7bdc78edeadefdfef.jpg',
    spark: 'It starts messy on purpose. Moodboards, gut checks, and one reckless idea that sets the whole direction on fire.',
    craft: 'Then we tighten the screws—motion, type, and layout locked into a system loud enough to feel, clear enough to scale.',
    stats: [
      { label: 'Campaigns lit', value: '48' },
      { label: 'Scroll-stop rate', value: '92%' },
    ],
  },
  {
    theme: 'forest',
    heading: 'Culture-obsessed creative partners for founders who want their brand to feel like a scene, not a template®.',
    img: 'https://i.pinimg.com/736x/4a/62/15/4a6215c4463f68dbabb3ac0f3996f289.jpg',
    spark: 'We dig into the taste, tension, and tribal codes around your product until the brief feels inevitable.',
    craft: 'Identities, drop films, and launch kits built like mixtapes— sequenced, surprising, impossible to ignore.',
    stats: [
      { label: 'Brand worlds', value: '27' },
      { label: 'Repeat clients', value: '89%' },
    ],
  },
  {
    theme: 'ember',
    heading: 'Kinetic type, sticky motion, and interface energy for products that want to feel alive the second they load®.',
    img: 'https://i.pinimg.com/736x/be/2b/93/be2b93da249b0fc75819bda5b77d1dbc.jpg',
    spark: 'One narrative spine. No committee fog. We align the room around a visual charge before a single frame ships.',
    craft: 'Sites, launch films, and 3D playgrounds delivered with systems your team can keep remixing after we leave.',
    stats: [
      { label: 'Awards', value: '31' },
      { label: 'Avg. uplift', value: '4.1×' },
    ],
  },
  {
    theme: 'steel',
    heading: 'From napkin sketch to cultural moment—Fuel is the voltage between your brand, your product, and the people who care®.',
    img: 'https://i.pinimg.com/736x/65/74/af/6574af961dfe8754c28b377a6e047db2.jpg',
    spark: 'Workshops that surface the story only you can tell—messy, honest, and sharp enough to build on.',
    craft: 'Long-haul creative partnership: seasonal drops, product stories, and systems that stay loud as you grow.',
    stats: [
      { label: 'Years lit', value: '9' },
      { label: 'Cities hit', value: '36+' },
    ],
  },
];

export default function StudioSkewHome() {
  const mainRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // Split text into line masks
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

      // 2. Skew Sections Parallax & Line Reveals
      const sections = mainRef.current.querySelectorAll('.section');
      sections.forEach((section) => {
        const h2 = section.querySelector('h2');
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

      // Refresh ScrollTrigger after DOM split to recalculate triggers
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="skew-main font-satoshi">
      {/* INTRO SECTION */}
      <section className="intro ink">
        <p className="intro-label">Kai Studio®</p>
        <h1 className="intro-title">Loud ideas. Sharp execution.</h1>
      </section>

      {/* STACKED SKEW SECTIONS */}
      {studioSections.map((sec, idx) => (
        <section key={idx} className={`section ${sec.theme}`}>
          <div className="skew-bg">
            <div className={`bg ${sec.theme}`} />
          </div>
          <div className="container">
            <h2 className="heading">{sec.heading}</h2>
            <div className="content">
              <div className="media">
                <img
                  src={sec.img}
                  alt="Studio artwork"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
              <div className="details">
                <div className="row">
                  <span>(Spark)</span>
                  <p>{sec.spark}</p>
                </div>
                <div className="row">
                  <span>(+Craft)</span>
                  <p>{sec.craft}</p>
                </div>
                <div className="row">
                  <span>(=Heat)</span>
                  <ul className="stats">
                    {sec.stats.map((st, i) => (
                      <li key={i}>
                        <span>{st.label}</span>
                        <span>{st.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
