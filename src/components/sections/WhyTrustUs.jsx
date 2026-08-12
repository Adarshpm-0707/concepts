import React from 'react';
import { motion } from 'framer-motion';
import { Target, Code2, Handshake, TrendingUp } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import BorderGlow from '../ui/BorderGlow';
import { whyTrustUsData } from '../../data/content';

const iconMap = { Target, Code2, Handshake, TrendingUp };

export default function WhyTrustUs() {
  return (
    <section className="py-10 sm:py-28 bg-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={whyTrustUsData.eyebrow}
          title={whyTrustUsData.title}
          subtitle={whyTrustUsData.subtitle}
        />

        {/* ── MOBILE: one key statement + 2x2 pillars ── */}
        <div className="block lg:hidden mt-5 space-y-4">

          {/* Single key paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-4 bg-neutral-950/90 rounded-xl border border-white/15"
          >
            <p className="text-xs text-slate-300 font-body leading-relaxed">
              {whyTrustUsData.paragraphs[1]}
            </p>
          </motion.div>

          {/* Pillars 2x2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {whyTrustUsData.pillars.map((pillar, idx) => {
              const Icon = iconMap[pillar.icon] || Target;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.07 }}
                  className="p-3.5 bg-neutral-950/90 rounded-2xl border border-white/15 flex flex-col gap-2"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="text-xs font-bold font-heading text-white leading-tight">
                    {pillar.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-body leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── DESKTOP: 2-column layout (unchanged) ── */}
        <div className="hidden lg:grid grid-cols-12 gap-14 items-stretch mt-12">

          {/* Paragraphs */}
          <div className="col-span-5 flex flex-col justify-center space-y-5">
            {whyTrustUsData.paragraphs.map((p, idx) => (
              <p key={idx} className="text-lg text-slate-300 font-body leading-relaxed bg-neutral-950/60 p-6 rounded-2xl border border-white/10">
                {p}
              </p>
            ))}
          </div>

          {/* Pillars */}
          <div className="col-span-7 grid grid-cols-2 gap-6">
            {whyTrustUsData.pillars.map((pillar, idx) => {
              const Icon = iconMap[pillar.icon] || Target;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="h-full"
                >
                  <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={18} glowRadius={25} fillOpacity={0.2}>
                    <div className="p-6 bg-neutral-950/90 rounded-[20px] border border-white/15 h-full flex flex-col justify-between">
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-lg font-bold font-heading text-white mb-2">{pillar.title}</h4>
                        <p className="text-sm text-slate-300 font-body leading-relaxed">{pillar.description}</p>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
