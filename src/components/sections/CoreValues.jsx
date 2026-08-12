import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, ShieldCheck, Palette, Handshake, TrendingUp } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import BorderGlow from '../ui/BorderGlow';
import { coreValuesData } from '../../data/content';

const iconMap = { Sparkles, Lightbulb, ShieldCheck, Palette, Handshake, TrendingUp };

export default function CoreValues() {
  return (
    <section id="values" className="py-10 sm:py-28 bg-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={coreValuesData.eyebrow}
          title={coreValuesData.title}
          subtitle={coreValuesData.subtitle}
          centered={true}
        />

        {/* ── MOBILE: 2-column compact cards ── */}
        <div className="block sm:hidden mt-5 grid grid-cols-2 gap-3">
          {coreValuesData.values.map((val, idx) => {
            const Icon = iconMap[val.icon] || Sparkles;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="p-3.5 bg-neutral-950/90 rounded-2xl border border-white/15 flex flex-col gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="text-xs font-bold font-heading text-white leading-tight">
                  {val.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-body leading-relaxed">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ── DESKTOP / TABLET: 3-column card grid (unchanged) ── */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {coreValuesData.values.map((val, idx) => {
            const Icon = iconMap[val.icon] || Sparkles;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="h-full"
              >
                <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={20} glowRadius={25} fillOpacity={0.2}>
                  <div className="p-8 bg-neutral-950/90 rounded-[24px] border border-white/15 h-full flex flex-col justify-between group hover:border-white/40 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-mono text-2xl font-bold text-white/30 group-hover:text-white/80 transition-colors">
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-white mb-3 group-hover:text-slate-100 transition-colors">
                        {val.title}
                      </h3>
                      <p className="text-sm text-slate-300 font-body leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
