import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowRight, Compass, PhoneCall } from 'lucide-react';
import VariableProximity from '../components/ui/VariableProximity';

export default function NotFoundPage() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center bg-black text-white px-4 sm:px-6 lg:px-8 overflow-hidden pt-28 pb-16">
      {/* Radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-white/[0.04] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-3xl w-full text-center relative z-10 space-y-6">
        
        {/* Animated 404 Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-white/20 text-slate-300 text-xs font-accent font-bold uppercase tracking-widest"
        >
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>Error 404 — Page Not Found</span>
        </motion.div>

        {/* Huge 404 Display */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl sm:text-9xl font-black font-heading tracking-tighter bg-gradient-to-b from-white via-slate-200 to-slate-600 bg-clip-text text-transparent"
          style={{ fontFamily: '"Satoshi", "Outfit", sans-serif' }}
        >
          404
        </motion.h1>

        {/* Headline & Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-3 max-w-xl mx-auto"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
            Lost in the Digital Space?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-body">
            <VariableProximity 
              label="The page you are looking for might have been removed, renamed, or is temporarily unavailable."
              radius={100}
              falloff="smooth"
            />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4"
        >
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-heading font-bold text-sm hover:bg-slate-200 transition-all shadow-lg active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 border border-white/20 text-white font-heading font-bold text-sm hover:bg-neutral-800 hover:border-white/40 transition-all active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-neutral-900 border border-white/20 text-white font-heading font-bold text-sm hover:bg-neutral-800 hover:border-white/40 transition-all active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Contact Us</span>
          </Link>
        </motion.div>

        {/* Quick Route Navigation Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-10 border-t border-white/10 max-w-lg mx-auto"
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3 font-heading">
            Popular Navigation Destination Links:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <Link to="/" className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all text-center font-medium">
              Home
            </Link>
            <Link to="/about" className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all text-center font-medium">
              About
            </Link>
            <Link to="/services" className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all text-center font-medium">
              Services
            </Link>
            <Link to="/portfolio" className="p-2.5 rounded-xl bg-neutral-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all text-center font-medium">
              Work
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
