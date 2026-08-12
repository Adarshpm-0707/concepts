import React from 'react';
import { motion } from 'framer-motion';
import { Target, Sparkles, TrendingUp, Code2, ShieldCheck, Zap } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import BorderGlow from '../ui/BorderGlow';
import { whyChooseUsData } from '../../data/content';

const iconMap = { Target, Sparkles, TrendingUp, Code2, ShieldCheck, Zap };

export default function WhyChooseUs() {
  return (
    <section className="py-10 sm:py-28 bg-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={whyChooseUsData.eyebrow}
          title={whyChooseUsData.title}
          subtitle={whyChooseUsData.subtitle}
          centered={true}
        />

        {/* ── MOBILE: compact list rows ── */}
        <div className="block sm:hidden mt-5 space-y-2.5">
          {whyChooseUsData.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Target;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="flex items-start gap-3 p-3.5 bg-neutral-950/90 rounded-xl border border-white/12"
              >
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold font-heading text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-body leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── DESKTOP / TABLET: 3-column cards (unchanged) ── */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {whyChooseUsData.items.map((item, idx) => {
            const Icon = iconMap[item.icon] || Target;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="h-full"
              >
                <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={20} glowRadius={25} fillOpacity={0.2}>
                  <div className="p-8 bg-neutral-950/90 rounded-[24px] border border-white/15 h-full flex flex-col justify-between">
                    <div>
                      <div className="mb-5">
                        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-white mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-300 font-body leading-relaxed">
                        {item.description}
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
