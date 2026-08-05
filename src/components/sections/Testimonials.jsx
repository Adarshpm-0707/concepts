import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import BorderGlow from '../ui/BorderGlow';
import { testimonialsData } from '../../data/content';

export default function Testimonials() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={testimonialsData.eyebrow}
          title={testimonialsData.title}
          subtitle={testimonialsData.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonialsData.testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="h-full"
            >
              <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={24} glowRadius={30} fillOpacity={0.2}>
                <div className="p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-white mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-white" />
                      ))}
                    </div>
                    <Quote className="w-7 h-7 text-white/20 mb-3" />
                    <p className="text-sm sm:text-base text-slate-200 font-body leading-relaxed italic mb-6">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-800">
                    <div className="font-bold text-white text-sm sm:text-base font-heading">{t.author}</div>
                    <div className="text-xs text-slate-300 font-semibold mt-0.5">{t.company}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{t.location}</div>
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
