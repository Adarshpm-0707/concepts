import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../common/SectionHeading';
import IconBox from '../common/IconBox';
import VariableProximity from '../ui/VariableProximity';
import BorderGlow from '../ui/BorderGlow';
import { whyChooseUsData } from '../../data/content';

export default function WhyChooseUs() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={whyChooseUsData.eyebrow}
          title={whyChooseUsData.title}
          subtitle={whyChooseUsData.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {whyChooseUsData.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="h-full"
            >
              <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={24} glowRadius={30} fillOpacity={0.2}>
                <div className="p-5 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-4 sm:mb-5">
                      <IconBox icon={item.icon} variant="bw" size="md" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed">
                      <VariableProximity label={item.description} radius={110} falloff="smooth" />
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
