import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Phone, CheckCircle2 } from 'lucide-react';
import Button from '../common/Button';
import VariableProximity from '../ui/VariableProximity';
import { brandData, heroStats } from '../../data/content';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } }
});

export default function Hero() {
  const heroRef = useRef(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-visible bg-transparent pt-28 pb-16 md:pt-36 md:pb-24 border-b border-white/10"
    >
      {/* MONOCHROME AMBIENT OVERLAY */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-white/5 rounded-full blur-[160px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="flex flex-col items-center text-center">

          {/* BADGE */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <div className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-neutral-900/90 border border-white/30 text-white text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-bold font-accent inline-flex flex-wrap items-center justify-center gap-2 shadow-lg shadow-white/5 backdrop-blur-md">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span>Kannur's Best Digital Marketing Office</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse hidden sm:inline-block" />
              <span className="hidden sm:inline-block">Kerala & GCC</span>
            </div>
          </motion.div>

          {/* HEADLINE */}
          <h1 className="text-3xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-extrabold font-heading text-white tracking-tight leading-[1.1] sm:leading-[1.05] max-w-6xl mx-auto">
            KANNUR'S PREMIER <span className="gradient-text-bw">DIGITAL MARKETING</span>
            <br className="hidden sm:block" />
            {' '}AGENCY & BRANDING <span className="text-slate-400 font-light italic">STUDIO</span>
          </h1>

          {/* SUBTEXT */}
          <motion.p
            variants={fadeIn(0.5)} initial="hidden" animate="show"
            className="mt-5 sm:mt-8 text-sm sm:text-xl text-slate-300 font-body max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            <VariableProximity label={brandData.heroSubtitle} radius={140} falloff="smooth" />
          </motion.p>

          {/* KEY TRUST BULLETS */}
          <motion.div
            variants={fadeIn(0.7)} initial="hidden" animate="show"
            className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-300 text-center sm:text-left"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
              <span>#1 Local SEO & Google Ranking in Kannur</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
              <span>High-ROAS Meta & Google Ad Campaigns</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0" />
              <span>Dedicated Kannur Client Office Support</span>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeIn(0.9)} initial="hidden" animate="show" className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Button text="Schedule Free Strategy Call" href="/contact" variant="primary" icon={ArrowRight} className="w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8" />
            <a href={`tel:${brandData.phoneKerala}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full border border-white/30 bg-black/80 backdrop-blur-md text-white hover:bg-neutral-900 hover:border-white font-heading font-bold text-sm md:text-base tracking-wide transition-all duration-300">
              <Phone className="w-4 h-4 text-white" />
              <span>Call Office: {brandData.phoneKerala}</span>
            </a>
          </motion.div>
        </div>

        {/* STATS STRIP */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 glass-card-bw rounded-2xl overflow-hidden divide-y sm:divide-y-0 lg:divide-x divide-white/20"
        >
          {heroStats.map((stat, idx) => (
            <div key={idx} className="p-4 sm:p-7 text-center group transition-colors hover:bg-white/5">
              <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading mb-1 text-white group-hover:text-slate-200 transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs tracking-wider font-bold font-accent text-slate-400 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}