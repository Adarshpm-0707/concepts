import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MapPin, Globe, Award } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Card from '../common/Card';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <SectionHeading eyebrow={aboutData.eyebrow} title={aboutData.title} centered={false} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-7 space-y-4 sm:space-y-5">
            <p className="text-base sm:text-lg text-slate-200 font-body leading-relaxed font-medium">
              <VariableProximity label={aboutData.descriptionParagraph1} radius={120} falloff="smooth" />
            </p>
            <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
              <VariableProximity label={aboutData.descriptionParagraph2} radius={120} falloff="smooth" />
            </p>
            <p className="text-sm sm:text-base text-slate-300 font-body leading-relaxed">
              <VariableProximity label={aboutData.descriptionParagraph3} radius={120} falloff="smooth" />
            </p>
            <p className="text-sm sm:text-base font-bold text-white font-body leading-relaxed pt-1 sm:pt-2">
              <VariableProximity label={aboutData.descriptionParagraph4} radius={120} falloff="smooth" />
            </p>
            
            <div className="pt-3 sm:pt-4 space-y-2.5 sm:space-y-3">
              {aboutData.highlights.map((h, idx) => (
                <motion.div key={idx} variants={fadeUp(0.15 + idx * 0.05)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex items-start gap-2.5 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white mt-0.5 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 leading-snug">
                    <VariableProximity label={h} radius={100} falloff="smooth" />
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 sm:pt-6">
              <Button text="Partner With Kannur's Best Office" href="/contact" variant="primary" className="w-full sm:w-auto text-center" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp(0.25)} initial="hidden" whileInView="show" viewport={{ once: true }} className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
            <Card className="glass-card-bw p-5 sm:p-6 relative overflow-hidden group">
              <div className="flex items-center gap-3.5 sm:gap-4 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neutral-900 border border-white/30 flex items-center justify-center text-white flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white">Kannur Office (HQ)</h3>
                  <p className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider">Kerala, India</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <VariableProximity label="Central marketing hub on Calicut Road, Kannur. In-house SEO strategists, media production crew, and tech developers." radius={100} />
              </p>
            </Card>

            <Card className="glass-card p-5 sm:p-6 border-white/20 relative overflow-hidden group">
              <div className="flex items-center gap-3.5 sm:gap-4 mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-neutral-900 border border-white/30 flex items-center justify-center text-white flex-shrink-0">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-white">GCC & Global Reach</h3>
                  <p className="text-[10px] sm:text-xs text-slate-300 font-bold uppercase tracking-wider">UAE • Qatar • Saudi Arabia</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                <VariableProximity label="Specialized cross-border digital ad campaigns targeting Gulf buyers and international markets seamlessly." radius={100} />
              </p>
            </Card>

            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-white/30 flex items-center gap-3.5 sm:gap-4">
              <Award className="w-7 h-7 sm:w-8 sm:h-8 text-white flex-shrink-0" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">#1 Rated Digital Agency in Kannur</div>
                <div className="text-[11px] sm:text-xs text-slate-300">Proven track record across 350+ brand campaigns.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
