import React from 'react';
import { motion } from 'framer-motion';
import { Target, Globe, CheckCircle } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import BorderGlow from '../ui/BorderGlow';
import { missionVisionData } from '../../data/content';

export default function AboutMissionVision() {
  const missionPoints = [
    "Cohesive visual identities & positioning",
    "High-performing web & digital platforms",
    "Revenue-generating marketing campaigns"
  ];

  const visionPoints = [
    "Setting standards across Kerala and the GCC",
    "Eliminating fragmented vendor overheads",
    "Full-stack creative & execution under one roof"
  ];

  return (
    <section className="py-10 sm:py-28 bg-black relative overflow-hidden border-t border-white/10">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[700px] h-[180px] sm:h-[300px] bg-white/5 rounded-full blur-[80px] sm:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Purpose & Direction"
          title="Our Mission & Vision"
          subtitle="Building brands that command respect across Kerala and GCC."
          centered={true}
        />

        {/* ── MOBILE: stacked minimal cards ── */}
        <div className="block lg:hidden space-y-4 mt-6">

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="p-4 bg-neutral-950/90 rounded-2xl border border-white/15">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[9px] font-accent font-bold uppercase tracking-widest text-slate-400 block">
                    {missionVisionData.mission.eyebrow}
                  </span>
                  <h3 className="text-base font-bold font-heading text-white leading-tight">
                    {missionVisionData.mission.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-body leading-relaxed mb-3">
                {missionVisionData.mission.description}
              </p>
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                {missionPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] text-slate-400">
                    <CheckCircle className="w-3 h-3 text-white shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="p-4 bg-neutral-950/90 rounded-2xl border border-white/15">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[9px] font-accent font-bold uppercase tracking-widest text-slate-400 block">
                    {missionVisionData.vision.eyebrow}
                  </span>
                  <h3 className="text-base font-bold font-heading text-white leading-tight">
                    {missionVisionData.vision.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-body leading-relaxed mb-3">
                {missionVisionData.vision.description}
              </p>
              <div className="pt-3 border-t border-white/10 space-y-1.5">
                {visionPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[10px] text-slate-400">
                    <CheckCircle className="w-3 h-3 text-white shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── DESKTOP: 2-column card grid (unchanged) ── */}
        <div className="hidden lg:grid grid-cols-2 gap-10 mt-12">

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BorderGlow glowColor="0 0% 100%" borderRadius={22} glowRadius={30} fillOpacity={0.2} className="h-full">
              <div className="p-10 bg-neutral-950/90 rounded-[24px] border border-white/20 h-full flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-accent font-bold uppercase tracking-widest text-slate-400 block mb-2">
                    {missionVisionData.mission.eyebrow}
                  </span>
                  <h3 className="text-3xl font-bold font-heading text-white mb-4">
                    {missionVisionData.mission.title}
                  </h3>
                  <p className="text-slate-300 font-body text-base leading-relaxed mb-6">
                    {missionVisionData.mission.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 space-y-3">
                  {missionPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-white shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <BorderGlow glowColor="0 0% 100%" borderRadius={22} glowRadius={30} fillOpacity={0.2} className="h-full">
              <div className="p-10 bg-neutral-950/90 rounded-[24px] border border-white/20 h-full flex flex-col justify-between space-y-6">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-accent font-bold uppercase tracking-widest text-slate-400 block mb-2">
                    {missionVisionData.vision.eyebrow}
                  </span>
                  <h3 className="text-3xl font-bold font-heading text-white mb-4">
                    {missionVisionData.vision.title}
                  </h3>
                  <p className="text-slate-300 font-body text-base leading-relaxed mb-6">
                    {missionVisionData.vision.description}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 space-y-3">
                  {visionPoints.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-white shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
