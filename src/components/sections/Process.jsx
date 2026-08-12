import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import BorderGlow from '../ui/BorderGlow';
import { processData } from '../../data/content';

export default function Process() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={processData.eyebrow}
          title={processData.title}
          subtitle={processData.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {processData.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="h-full"
            >
              <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={20} glowRadius={25} fillOpacity={0.2}>
                <div className="p-5 sm:p-7 bg-neutral-950/90 rounded-[20px] border border-white/15 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black font-accent text-white mb-2 sm:mb-3 opacity-90">
                      {step.step}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/15 text-[10px] sm:text-xs uppercase font-bold text-slate-400">
                    Phase 0{idx + 1} Execution
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
