import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import IconBox from '../common/IconBox';
import { whyTrustUsData } from '../../data/content';

export default function WhyTrustUs() {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={whyTrustUsData.eyebrow}
          title={whyTrustUsData.title}
          subtitle={whyTrustUsData.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            {whyTrustUsData.paragraphs.map((p, idx) => (
              <p key={idx} className="text-base text-slate-300 font-body leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyTrustUsData.pillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card-bw p-6 rounded-2xl"
              >
                <IconBox icon={pillar.icon} variant="bw" size="sm" className="mb-3" />
                <h4 className="text-lg font-bold font-heading text-white mb-1.5">{pillar.title}</h4>
                <p className="text-xs text-slate-300 font-body leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
