import React from 'react';
import { motion } from 'framer-motion';
import VariableProximity from '../ui/VariableProximity';

export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="relative pt-32 pb-12 sm:pt-44 sm:pb-24 lg:pt-52 lg:pb-28 bg-gradient-to-b from-[#000000] via-[#0a0a0a] to-[#000000] overflow-hidden border-b border-white/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[500px] h-[160px] sm:h-[300px] bg-white/5 rounded-full blur-[70px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* ── MOBILE ── */}
        <div className="block sm:hidden">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-white/30 text-white text-[10px] font-accent font-bold uppercase tracking-widest mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {eyebrow}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[1.7rem] font-extrabold font-heading text-white tracking-tight leading-[1.15]"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 text-xs text-slate-300 font-body max-w-sm mx-auto leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* ── DESKTOP (unchanged) ── */}
        <div className="hidden sm:block">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/30 text-white text-xs font-accent font-bold uppercase tracking-widest mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {eyebrow}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-lg text-slate-300 font-body max-w-3xl mx-auto leading-relaxed"
            >
              <VariableProximity label={subtitle} radius={120} falloff="smooth" />
            </motion.p>
          )}
        </div>

      </div>
    </div>
  );
}
