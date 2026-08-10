import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
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

        <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-5 sm:space-y-6">
          <p className="text-base sm:text-lg text-slate-200 font-body leading-relaxed text-center">
            <VariableProximity label={aboutData.descriptionParagraph1} radius={120} falloff="smooth" />
          </p>
          <p className="text-base sm:text-xl font-bold text-white font-body leading-relaxed text-center p-4 sm:p-6 rounded-2xl bg-neutral-900/80 border border-white/20">
            <VariableProximity label={aboutData.descriptionParagraph2} radius={120} falloff="smooth" />
          </p>
          <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed text-center">
            <VariableProximity label={aboutData.descriptionParagraph3} radius={120} falloff="smooth" />
          </p>
        

          <div className="pt-6 sm:pt-8 flex justify-center">
            <Button text="Start a Project With Us" href="/contact" variant="primary" icon={ArrowRight} className="w-full sm:w-auto text-center py-3.5 px-8" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
