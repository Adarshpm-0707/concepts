import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import IconBox from '../common/IconBox';
import { coreValuesData } from '../../data/content';

export default function CoreValues() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={coreValuesData.eyebrow}
          title={coreValuesData.title}
          subtitle={coreValuesData.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValuesData.values.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-card p-8 rounded-2xl border border-white/10 hover:border-white/40 transition-all duration-300 group"
            >
              <div className="mb-4">
                <IconBox icon={val.icon} variant="bw" size="md" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-slate-200 transition-colors">
                {val.title}
              </h3>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
