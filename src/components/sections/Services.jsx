import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  Megaphone, Search, BarChart3, Share2, Palette, Code2, Zap, ShieldAlert,
  ArrowRight, CheckCircle2, X, Sparkles, ExternalLink, Phone, MessageSquare
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { servicesData, brandData } from '../../data/content';
import '../../styles/sections.css';

gsap.registerPlugin(ScrollTrigger);

// Animation variants for card text elements — staggered fade+slide up
const cardTextVariants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      delay,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const iconMap = {
  Palette, Megaphone, Code2, Zap, ShieldAlert, Share2, Search, BarChart3
};

const CARD_COLOR_THEMES = [
  {
    bgGradient: "bg-gradient-to-br from-purple-950/95 via-violet-900/80 to-purple-950/95",
    borderColor: "border-purple-500/40 group-hover:border-purple-400",
    glowColor: "rgba(168, 85, 247, 0.45)",
    iconBg: "bg-purple-900/90 border-purple-400/50 text-purple-200",
    badgeStyle: "border-purple-400/50 text-purple-200 bg-purple-500/20",
    titleHover: "group-hover:text-purple-300",
    quoteBg: "bg-purple-900/40 border-purple-400/30"
  },
  {
    bgGradient: "bg-gradient-to-br from-pink-950/95 via-fuchsia-900/80 to-pink-950/95",
    borderColor: "border-pink-500/40 group-hover:border-pink-400",
    glowColor: "rgba(236, 72, 153, 0.45)",
    iconBg: "bg-pink-900/90 border-pink-400/50 text-pink-200",
    badgeStyle: "border-pink-400/50 text-pink-200 bg-pink-500/20",
    titleHover: "group-hover:text-pink-300",
    quoteBg: "bg-pink-900/40 border-pink-400/30"
  },
  {
    bgGradient: "bg-gradient-to-br from-rose-950/95 via-red-900/80 to-rose-950/95",
    borderColor: "border-rose-500/40 group-hover:border-rose-400",
    glowColor: "rgba(244, 63, 94, 0.45)",
    iconBg: "bg-rose-900/90 border-rose-400/50 text-rose-200",
    badgeStyle: "border-rose-400/50 text-rose-200 bg-rose-500/20",
    titleHover: "group-hover:text-rose-300",
    quoteBg: "bg-rose-900/40 border-rose-400/30"
  },
  {
    bgGradient: "bg-gradient-to-br from-red-950/95 via-orange-900/80 to-amber-950/95",
    borderColor: "border-orange-500/40 group-hover:border-orange-400",
    glowColor: "rgba(249, 115, 22, 0.45)",
    iconBg: "bg-orange-900/90 border-orange-400/50 text-orange-200",
    badgeStyle: "border-orange-400/50 text-orange-200 bg-orange-500/20",
    titleHover: "group-hover:text-amber-300",
    quoteBg: "bg-orange-900/40 border-orange-400/30"
  },
  {
    bgGradient: "bg-gradient-to-br from-fuchsia-950/95 via-purple-900/80 to-fuchsia-950/95",
    borderColor: "border-fuchsia-500/40 group-hover:border-fuchsia-400",
    glowColor: "rgba(217, 70, 239, 0.45)",
    iconBg: "bg-fuchsia-900/90 border-fuchsia-400/50 text-fuchsia-200",
    badgeStyle: "border-fuchsia-400/50 text-fuchsia-200 bg-fuchsia-500/20",
    titleHover: "group-hover:text-fuchsia-300",
    quoteBg: "bg-fuchsia-900/40 border-fuchsia-400/30"
  },
  {
    bgGradient: "bg-gradient-to-br from-indigo-950/95 via-violet-900/80 to-indigo-950/95",
    borderColor: "border-indigo-500/40 group-hover:border-indigo-400",
    glowColor: "rgba(99, 102, 241, 0.45)",
    iconBg: "bg-indigo-900/90 border-indigo-400/50 text-indigo-200",
    badgeStyle: "border-indigo-400/50 text-indigo-200 bg-indigo-500/20",
    titleHover: "group-hover:text-indigo-300",
    quoteBg: "bg-indigo-900/40 border-indigo-400/30"
  }
];

export default function Services({ showHeader = true }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const container = sectionRef.current;
      if (!container) return;

      const track = container.querySelector('.horizontal-services-track');
      const cards = container.querySelectorAll('.horizontal-service-card');
      // PERF: removed per-character .horizontal-letter query — was creating ~90 ScrollTriggers
      const badges = container.querySelectorAll('.horizontal-badge');

      if (!track) return;

      const isMobile = window.innerWidth < 640;

      // 1. Calculate Exact Distance for Right-to-Left Scroll Travel
      const getScrollAmount = () => {
        const padding = isMobile ? 16 : 80;
        return -(track.scrollWidth - window.innerWidth + padding);
      };

      // 2. GSAP ScrollTrigger Pinned Horizontal Tween for ALL VIEWPORTS
      const scrollTween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth * (isMobile ? 1.0 : 1.0), 1600)}`,
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 0.5 : 1,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      // 3. Elastic Bouncing Effect for Badges (reduced from ~90 ScrollTriggers to 6)
      badges.forEach((badge) => {
        gsap.from(badge, {
          scale: 0.3,
          yPercent: (Math.random() - 0.5) * (isMobile ? 120 : 300),
          rotation: (Math.random() - 0.5) * 35,
          ease: 'elastic.out(1.2, 1)',
          scrollTrigger: {
            trigger: badge,
            containerAnimation: scrollTween,
            start: 'left 90%',
            end: 'left 20%',
            scrub: 0.5
          }
        });
      });

      // 4. Elastic Entrance Scale & Staggered Text Entrance for Cards
      cards.forEach((card) => {
        gsap.fromTo(card,
          { scale: isMobile ? 0.94 : 0.88, opacity: 0.6, y: 20 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 98%',
              end: 'left 40%',
              scrub: 0.5
            }
          }
        );

        // Staggered text elements reveal inside each service card as it enters view
        const cardAnimItems = card.querySelectorAll('.card-anim-item');
        if (cardAnimItems.length > 0) {
          gsap.fromTo(cardAnimItems,
            { opacity: 0, y: 18, filter: 'blur(4px)' },
            {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 90%',
                end: 'left 45%',
                scrub: 0.5
              }
            }
          );
        }
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      id="services"
      className="horizontal-services-section relative bg-black text-white overflow-hidden font-body min-h-screen pb-6 lg:pb-24"
    >
      {/* Background Ambient Glow & Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-900/80 via-black to-black pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] sm:w-[800px] h-[220px] sm:h-[450px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Horizontal Stage Wrapper */}
      <div className="horizontal-services-stage min-h-screen flex flex-col justify-center py-4 sm:py-10 lg:pt-8 lg:pb-24">
        
        {/* Section Header */}
        {showHeader && (
          <div className="px-4 sm:px-12 lg:px-16 mb-4 sm:mb-8 lg:mb-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2.5 border-b border-white/10 pb-3 sm:pb-5">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-0.5 sm:py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs font-bold text-slate-200 uppercase tracking-widest mb-1.5 sm:mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{servicesData.eyebrow}</span>
              </span>
              <h2 className="text-xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight">
                {servicesData.title}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
              <span>Scroll Down to Move Services</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          className="horizontal-services-track flex items-stretch gap-4 sm:gap-8 lg:gap-10 px-4 sm:px-12 lg:px-16 w-max flex-nowrap overflow-visible pb-4 lg:pb-8"
        >
          
         

          {servicesData.services.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Megaphone;
            const formattedIndex = String(idx + 1).padStart(2, '0');
            const theme = CARD_COLOR_THEMES[idx % CARD_COLOR_THEMES.length];

            return (
              <article
                key={service.id}
                className={`horizontal-service-card group relative w-[82vw] min-w-[270px] sm:min-w-[360px] lg:min-w-[440px] max-w-[320px] sm:max-w-[460px] rounded-2xl sm:rounded-3xl ${theme.bgGradient} ${theme.borderColor} border p-5 sm:p-8 lg:p-9 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 shrink-0`}
              >
                <div
                  className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-[70px] pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                  style={{ background: theme.glowColor }}
                />

                <div>
                  <div className="card-anim-item flex items-center justify-between gap-3 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${theme.iconBg} flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shadow-md shrink-0`}>
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 block">
                          {service.tag || service.category}
                        </span>
                        <span className={`horizontal-badge inline-block mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full border ${theme.badgeStyle}`}>
                          Kannur & GCC
                        </span>
                      </div>
                    </div>

                    <span className="horizontal-letter font-heading font-black text-2xl sm:text-3xl text-white/20 group-hover:text-white/40 transition-colors">
                      {formattedIndex}
                    </span>
                  </div>

                  <h3 className={`card-anim-item font-heading font-black text-xl sm:text-3xl text-white mb-2 sm:mb-3 ${theme.titleHover} transition-colors leading-tight group-hover:translate-x-1 duration-300`}>
                    {service.title}
                  </h3>

                  <div className={`card-anim-item mb-3.5 p-3 rounded-xl sm:rounded-2xl ${theme.quoteBg} border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 italic`}>
                    "{service.headline}"
                  </div>

                  <p className="card-anim-item text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-6 line-clamp-3 group-hover:text-slate-200 transition-colors">
                    {service.description}
                  </p>

                  <div className="card-anim-item space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 pt-3 sm:pt-4 border-t border-white/10">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1 sm:mb-2 font-heading">
                      Key Deliverables:
                    </span>
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 group-hover:translate-x-0.5 transition-transform">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-anim-item pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between gap-2 sm:gap-3 mt-auto">
                  <Link
                    to={`/services/${service.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white text-black font-heading font-bold text-xs sm:text-sm hover:bg-slate-200 transition-colors shadow-md"
                  >
                    <span>Approach</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    onClick={() => setSelectedService(service)}
                    className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-neutral-900 border border-white/20 text-xs font-heading font-bold text-slate-300 hover:text-white hover:border-white/40 transition-colors text-center"
                  >
                    Quick Info
                  </button>
                </div>
              </article>
            );
          })}


        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {/* QUICK INFO MODAL */}
      {/* ═════════════════════════════════════════════════════════════════════════ */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-neutral-950 border border-white/25 p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-900 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 pr-10">
              <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center font-bold shadow-md shrink-0">
                {React.createElement(iconMap[selectedService.icon] || Megaphone, { className: "w-6 h-6" })}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  {selectedService.category} • Kannur & GCC
                </span>
                <h3 className="font-heading font-black text-2xl text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-sm font-semibold text-slate-200 italic">
              "{selectedService.headline}"
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {selectedService.description}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-heading">
                Features & Included Deliverables:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, fIdx) => (
                  <div key={fIdx} className="p-3 rounded-xl bg-neutral-900 border border-white/10 flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Link
                to={`/services/${selectedService.id}`}
                onClick={() => setSelectedService(null)}
                className="flex-1 py-3 px-6 rounded-full bg-white text-black font-heading font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
              >
                <span>Go to Full Page</span>
                <ExternalLink className="w-4 h-4" />
              </Link>

              <a
                href={`tel:${brandData.phoneKerala}`}
                className="py-3 px-6 rounded-full bg-neutral-900 border border-white/20 text-white font-heading font-bold text-xs sm:text-sm text-center hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}