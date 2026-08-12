import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import IconBox from '../common/IconBox';
import BorderGlow from '../ui/BorderGlow';
import { industriesData } from '../../data/content';

export default function Industries() {
  return (
    <section className="py-10 sm:py-16 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={industriesData.eyebrow}
          title={industriesData.title}
          subtitle={industriesData.subtitle}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {industriesData.industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="h-full"
            >
              <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={20} glowRadius={25} fillOpacity={0.2}>
                <div className="p-5 sm:p-6 bg-neutral-950/90 rounded-[20px] border border-white/15 h-full flex items-start gap-3.5">
                  <IconBox icon={ind.icon} variant="bw" size="sm" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-base font-bold font-heading text-white">
                      {ind.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed mt-1">
                      {ind.desc}
                    </p>
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
