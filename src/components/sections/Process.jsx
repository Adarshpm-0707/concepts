import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import BorderGlow from '../ui/BorderGlow';
import { processData } from '../../data/content';

export default function Process() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={processData.eyebrow}
          title={processData.title}
          subtitle={processData.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {processData.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="h-full"
            >
              <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={24} glowRadius={30} fillOpacity={0.25}>
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-4xl font-black font-accent text-white mb-3 opacity-90">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-bold font-heading text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-body leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/20 text-[10px] uppercase font-bold text-slate-300">
                    Phase {idx + 1} Execution
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
