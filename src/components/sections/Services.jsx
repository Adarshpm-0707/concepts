import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Megaphone, Search, BarChart3, Share2, Palette, Code2, Zap, ShieldAlert,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { servicesData } from '../../data/content';
import '../../styles/sections.css';

const iconMap = { Megaphone, Search, BarChart3, Share2, Palette, Code2, Zap, ShieldAlert };

const cardTones = [
  { bg: 'bg-neutral-900', text: 'text-white', subtext: 'text-slate-300', border: 'border border-white/20', badgeBg: 'bg-white/10 text-white border-white/30', ctaBg: 'bg-white text-black hover:bg-slate-200', indexColor: 'text-white/40', mediaBg: 'bg-gradient-to-br from-neutral-800 to-black border border-white/10' },
  { bg: 'bg-white', text: 'text-black', subtext: 'text-neutral-700', border: 'border border-black/10', badgeBg: 'bg-black text-white border-black', ctaBg: 'bg-black text-white hover:bg-neutral-800', indexColor: 'text-black/30', mediaBg: 'bg-gradient-to-br from-neutral-100 to-neutral-300 border border-black/10' },
  { bg: 'bg-neutral-950', text: 'text-white', subtext: 'text-slate-300', border: 'border border-white/25', badgeBg: 'bg-neutral-800 text-white border-white/30', ctaBg: 'bg-white text-black hover:bg-slate-200', indexColor: 'text-white/40', mediaBg: 'bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10' },
  { bg: 'bg-slate-200', text: 'text-black', subtext: 'text-slate-700', border: 'border border-slate-300', badgeBg: 'bg-slate-900 text-white border-slate-900', ctaBg: 'bg-slate-900 text-white hover:bg-slate-800', indexColor: 'text-black/30', mediaBg: 'bg-gradient-to-br from-slate-100 to-slate-300 border border-slate-400/20' },
  { bg: 'bg-zinc-900', text: 'text-white', subtext: 'text-slate-300', border: 'border border-white/20', badgeBg: 'bg-zinc-800 text-white border-white/30', ctaBg: 'bg-white text-black hover:bg-slate-200', indexColor: 'text-white/40', mediaBg: 'bg-gradient-to-br from-zinc-800 to-black border border-white/10' },
  { bg: 'bg-slate-100', text: 'text-black', subtext: 'text-neutral-700', border: 'border border-slate-300', badgeBg: 'bg-black text-white border-black', ctaBg: 'bg-black text-white hover:bg-neutral-800', indexColor: 'text-black/30', mediaBg: 'bg-gradient-to-br from-slate-200 to-slate-300 border border-black/10' },
  { bg: 'bg-neutral-900', text: 'text-white', subtext: 'text-slate-300', border: 'border border-white/30', badgeBg: 'bg-white/10 text-white border-white/30', ctaBg: 'bg-white text-black hover:bg-slate-200', indexColor: 'text-white/40', mediaBg: 'bg-gradient-to-br from-neutral-800 to-neutral-950 border border-white/10' },
  { bg: 'bg-zinc-200', text: 'text-black', subtext: 'text-zinc-700', border: 'border border-zinc-300', badgeBg: 'bg-zinc-900 text-white border-zinc-900', ctaBg: 'bg-zinc-900 text-white hover:bg-zinc-800', indexColor: 'text-black/30', mediaBg: 'bg-gradient-to-br from-zinc-100 to-zinc-300 border border-zinc-400/20' }
];

export default function Services() {
  const stackRef = useRef(null);
  const pinStageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = null;

    const timer = setTimeout(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length || !stackRef.current || !pinStageRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      const w = window.innerWidth;
      const isMobile = w < 640;
      const isTablet = w >= 640 && w < 1024;

      const PEEK        = isMobile ? 10 : isTablet ? 18 : 24;
      const SCALE_STEP  = isMobile ? 0.02 : isTablet ? 0.03 : 0.038;
      const FLY_ROTATE  = isMobile ? -6  : isTablet ? -12  : -18;
      const SCROLL_MULT = isMobile ? 0.4  : isTablet ? 0.5  : 0.6;

      function stackPose(index) {
        return { y: index * PEEK, scale: 1 - index * SCALE_STEP };
      }

      ctx = gsap.context(() => {
        cards.forEach((card, i) => {
          gsap.set(card, {
            zIndex: cards.length - i,
            y: stackPose(i).y,
            scale: stackPose(i).scale,
            rotate: 0,
            transformOrigin: '50% 0%'
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stackRef.current,
            pin: pinStageRef.current,
            start: 'top top',
            end: () => `+=${cards.length * window.innerHeight * SCROLL_MULT}`,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });

        const flying = cards.slice(0, -1);
        flying.forEach((card, i) => {
          const time = i * 1.2;
          const behind = cards.slice(i + 1);

          tl.to(card, {
            y: -window.innerHeight * 1.05,
            rotate: FLY_ROTATE,
            scale: 0.93,
            opacity: 0,
            ease: 'power2.inOut',
            duration: 1
          }, time);

          tl.to(behind, {
            y: idx => stackPose(idx).y,
            scale: idx => stackPose(idx).scale,
            ease: 'power2.out',
            duration: 1
          }, time);
        });

        tl.to({}, { duration: 0.3 });
      }, stackRef);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section
      id="services"
      ref={stackRef}
      className="services-section relative"
    >
      <div ref={pinStageRef} className="w-full relative">
        {/* Header */}
        <div className="services-header">
          <SectionHeading
            eyebrow={servicesData.eyebrow}
            title={servicesData.title}
            subtitle={servicesData.subtitle}
          />
        </div>

        {/* Card Deck */}
        <div className="stack__stage">
          <div className="stack__deck">
            {servicesData.services.map((service, idx) => {
              const IconComponent = iconMap[service.icon] || Megaphone;
              const tone = cardTones[idx % cardTones.length];
              const formattedIndex = String(idx + 1).padStart(2, '0');

              return (
                <article
                  key={service.id || idx}
                  ref={el => (cardsRef.current[idx] = el)}
                  className={`stack-card ${tone.bg} ${tone.text} ${tone.border}`}
                >
                  {/* ── Left Content Column ── */}
                  <div className="card-content">
                    {/* Top row: icon + badge + index */}
                    <div className="card-top-row">
                      <div className="card-icon-badge">
                        <div className="card-icon-wrap">
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        </div>
                        <span className={`card-badge ${tone.badgeBg}`}>
                          Kannur Office
                        </span>
                      </div>
                      <span className={`card-index ${tone.indexColor}`}>
                        {formattedIndex}
                      </span>
                    </div>

                    {/* Title & description */}
                    <h3 className="card-title">{service.title}</h3>
                    <p className={`card-desc ${tone.subtext}`}>{service.description}</p>

                    {/* Footer: features + CTA */}
                    <div className="card-footer">
                      <div className="card-features">
                        {service.features.map((f, fIdx) => (
                          <div key={fIdx} className="card-feature-item">
                            <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <Link to="/contact" className={`card-cta ${tone.ctaBg}`}>
                        <span>Discover Our Approach</span>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* ── Right Graphic Panel (desktop only) ── */}
                  <div className={`card-media hidden md:flex ${tone.mediaBg}`}>
                    <div className="card-media-header">
                      <span className="card-media-label">Service Solution #{formattedIndex}</span>
                      <IconComponent className="w-7 h-7 opacity-40" />
                    </div>
                    <div className="card-media-center">
                      <div className="card-media-icon-wrap">
                        <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                      </div>
                      <div className="card-media-title">{service.title}</div>
                      <div className="card-media-sub">Custom Strategy & Media Buying</div>
                    </div>
                    <div className="card-media-footer">
                      <span>Aleef Concepts</span>
                      <span>Kannur • GCC</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}