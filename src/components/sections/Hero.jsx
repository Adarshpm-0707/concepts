import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, CheckCircle2, Eye, Sparkles, TrendingUp, ShieldCheck, Zap, Star, MousePointer2 } from 'lucide-react';
import Button from '../common/Button';
import VariableProximity from '../ui/VariableProximity';
import BorderGlow from '../ui/BorderGlow';
import SplitFlapText from '../ui/SplitFlapText';
import CursorGrid from '../ui/CursorGrid';
import { heroStats } from '../../data/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030303] pt-20 pb-10 md:pt-32 md:pb-20 px-4">
      
      {/* --- HERO ONLY GRID ANIMATION --- */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden">
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

      {/* --- AMBIENT GLOW --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/10 rounded-full blur-[80px] md:blur-[120px]" 
        />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center"
      >
        
        {/* --- BADGE --- */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6 md:mb-8">
          <div className="group relative px-3.5 py-1.5 md:px-5 md:py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-1.5 md:gap-3 text-[9px] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.2em] font-bold text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              Creative Agency in Kerala
              <span className="text-white/30">|</span>
              <span className="text-white">Kannur • GCC</span>
            </div>
          </div>
        </motion.div>

        {/* --- MAIN HEADLINE --- */}
        <motion.h1 
          variants={itemVariants}
          style={{ fontFamily: "'SFMono-Regular', 'Roboto Mono', 'Cascadia Code', 'Liberation Mono', Menlo, monospace" }}
          className="text-[1.75rem] sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tight leading-[1.2] sm:leading-[1.1] md:leading-[1.05] text-white px-1 md:px-0 max-w-full"
        >
          We Are Creative Agency <br className="hidden md:block"/> in Kerala building<br className="hidden md:block" />
          
          {/* MOBILE VIEW: 2 Lines of SplitFlapText with clean mobile font sizing */}
          <span className="flex flex-col items-center justify-center md:hidden mt-2.5 space-y-1.5 max-w-full overflow-hidden">
            <span className="block max-w-full">
              <SplitFlapText
                words={['DIGITAL', 'MARKETING']}
                flipDuration={0.12}
                stagger={0.05}
                cycleDelay={2600}
                charset="alphanumeric"
                flipsPerChar={6}
                tileColor="#171717"
                textColor="#ffffff"
                tileRadius={5}
                gap={2}
                fontSize="clamp(18px, 5.8vw, 32px)"
                padTo={9}
                loop
              />
            </span>
            <span className="block max-w-full">
              <SplitFlapText
                words={['PLATFORMS.', 'SYSTEMS.']}
                flipDuration={0.12}
                stagger={0.05}
                cycleDelay={2600}
                charset="alphanumeric"
                flipsPerChar={6}
                tileColor="#171717"
                textColor="#ffffff"
                tileRadius={5}
                gap={2}
                fontSize="clamp(18px, 5.8vw, 32px)"
                padTo={10}
                loop
              />
            </span>
          </span>

          {/* DESKTOP / LAPTOP VIEW: Single Line SplitFlapText */}
          <span className="hidden md:inline-block mt-6 py-1">
            <SplitFlapText
              words={['DIGITAL PLATFORMS.', 'MARKETING SYSTEMS.']}
              flipDuration={0.12}
              stagger={0.05}
              cycleDelay={2600}
              charset="alphanumeric"
              flipsPerChar={6}
              tileColor="#171717"
              textColor="#ffffff"
              tileRadius={6}
              gap={4}
              fontSize="clamp(36px, 5.5vw, 64px)"
              padTo={18}
              loop
            />
          </span>
        </motion.h1>

        {/* --- SUBHEADLINE --- */}
        <motion.div variants={itemVariants} className="mt-5 md:mt-8 max-w-[95%] md:max-w-2xl px-2 md:px-0">
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-body leading-relaxed">
            <VariableProximity 
              label="Companies that want to be taken seriously in Kannur and beyond." 
              radius={80} 
              falloff="smooth" 
            />
          </p>
        </motion.div>

        {/* --- CTAs --- */}
        <motion.div variants={itemVariants} className="mt-6 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4 sm:px-0">
          <Button 
            text="Start a Project" 
            href="/contact" 
            variant="primary" 
            icon={ArrowRight} 
            className="w-full sm:w-auto py-3.5 sm:py-4 px-8 sm:px-10 text-base md:text-lg rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] font-bold" 
          />
          <a
            href="/portfolio"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all duration-500 font-bold text-sm md:text-base"
          >
            <Eye className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:scale-110" />
            <span>View Work</span>
          </a>
        </motion.div>

        {/* --- INTERACTIVE FLOATING CARD (RESPONSIVE) --- */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 md:mt-20 w-full max-w-5xl px-0 md:px-4 perspective-1000"
        >
          <BorderGlow glowColor="255, 255, 255" borderRadius={20} mdBorderRadius={32} className="group overflow-hidden bg-neutral-900/40 backdrop-blur-3xl border border-white/10">
            
            {/* MOBILE: 2x2 grid pills */}
            <div className="grid grid-cols-2 md:hidden gap-2 p-3">
              {[
                { icon: <Sparkles className="w-4 h-4 text-emerald-400" />, label: 'Branding' },
                { icon: <TrendingUp className="w-4 h-4 text-amber-400" />, label: 'Growth Ads' },
                { icon: <Zap className="w-4 h-4 text-blue-400" />, label: 'Web Engine' },
                { icon: <ShieldCheck className="w-4 h-4 text-purple-400" />, label: 'CRM Solutions' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold">
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </div>
              ))}
            </div>

            {/* DESKTOP: 3-column grid */}
            <div className="hidden md:grid md:grid-cols-3 divide-x divide-white/10">
              {/* Feature 1 */}
              <div className="p-8 flex flex-col items-center text-center gap-0 group/item">
                <div className="mb-4 p-3 rounded-2xl bg-white/5 text-white group-hover/item:bg-white group-hover/item:text-black transition-all duration-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg">Visual Brand</h3>
                  <p className="text-sm text-slate-400 mt-1">Identity systems that command attention.</p>
                </div>
              </div>
              {/* Feature 2 */}
              <div className="p-8 flex flex-col items-center text-center gap-0 group/item">
                <div className="mb-4 p-3 rounded-2xl bg-white/5 text-white group-hover/item:bg-white group-hover/item:text-black transition-all duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg">Growth Ads</h3>
                  <p className="text-sm text-slate-400 mt-1">Data-driven marketing for real ROI.</p>
                </div>
              </div>
              {/* Feature 3 */}
              <div className="p-8 flex flex-col items-center text-center gap-0 group/item">
                <div className="mb-4 p-3 rounded-2xl bg-white/5 text-white group-hover/item:bg-white group-hover/item:text-black transition-all duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg">Web Engine</h3>
                  <p className="text-sm text-slate-400 mt-1">High-speed platforms built to scale.</p>
                </div>
              </div>
            </div>

            {/* Bottom Stats Bar */}
            <div className="bg-white/5 border-t border-white/10 px-3 py-3 md:p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:flex md:flex-row justify-center gap-3 md:gap-8">
                {heroStats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center md:flex-row md:gap-2">
                    <span className="text-white font-bold text-sm md:text-base">{stat.value}</span>
                    <span className="text-slate-400 text-[10px] md:text-[10px] uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </BorderGlow>
        </motion.div>

        {/* --- TRUST FOOTER --- */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 md:mt-16 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2.5 md:gap-8 opacity-75 px-4 md:px-0 text-xs sm:text-sm"
        >
          <div className="flex items-center gap-1.5 text-white font-semibold text-xs md:text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Asset Ownership
          </div>
          <div className="w-px h-3 bg-white/20 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 text-white font-semibold text-xs md:text-sm">
            <Star className="w-4 h-4 fill-white text-white" /> 4.9/5 Client Rating
          </div>
          <div className="w-px h-3 bg-white/20 hidden sm:block"></div>
          <div className="flex items-center gap-1.5 text-white font-semibold text-xs md:text-sm">
            <MousePointer2 className="w-4 h-4" /> Serving Kerala & GCC
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}