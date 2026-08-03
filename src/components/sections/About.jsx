import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import VariableProximity from '../ui/VariableProximity';
import { aboutData } from '../../data/content';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } }
});

export default function About() {
  return (
    <section id="about" className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading eyebrow={aboutData.eyebrow} title={aboutData.title} centered={true} />
        </motion.div>

        <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4 sm:space-y-5">
          <p className="text-base sm:text-lg text-slate-200 font-body leading-relaxed font-medium text-center">
            <VariableProximity label={aboutData.descriptionParagraph1} radius={120} falloff="smooth" />
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed text-center">
            <VariableProximity label={aboutData.descriptionParagraph2} radius={120} falloff="smooth" />
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed text-center">
            <VariableProximity label={aboutData.descriptionParagraph3} radius={120} falloff="smooth" />
          </p>
          <p className="text-sm sm:text-base font-bold text-white font-body leading-relaxed pt-1 sm:pt-2 text-center">
            <VariableProximity label={aboutData.descriptionParagraph4} radius={120} falloff="smooth" />
          </p>
          
          <div className="pt-4 sm:pt-6 flex flex-col items-center justify-center space-y-2.5 sm:space-y-3">
            {aboutData.highlights.map((h, idx) => (
              <motion.div key={idx} variants={fadeUp(0.15 + idx * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-center justify-center gap-2.5 sm:gap-3 text-center">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                  <VariableProximity label={h} radius={100} falloff="smooth" />
                </span>
              </motion.div>
            ))}
          </div>

          <div className="pt-6 sm:pt-8 flex justify-center">
            <Button text="Partner With Kannur's Best Office" href="/contact" variant="primary" className="w-full sm:w-auto text-center" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
