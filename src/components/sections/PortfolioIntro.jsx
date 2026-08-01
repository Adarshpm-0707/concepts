import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, TrendingUp } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import BorderGlow from '../ui/BorderGlow';
import { portfolioData } from '../../data/content';

export default function PortfolioIntro() {
  return (
    <section id="portfolio" className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={portfolioData.eyebrow}
          title={portfolioData.title}
          subtitle={portfolioData.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {portfolioData.projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="h-full"
            >
              <BorderGlow className="h-full" glowColor="0 0% 100%" borderRadius={24} glowRadius={35} fillOpacity={0.25}>
                <div className="p-5 sm:p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs text-white font-bold font-accent uppercase">
                      <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                        <MapPin className="w-3.5 h-3.5" />
                        {project.location}
                      </span>
                      <span className="bg-neutral-900/90 px-2.5 py-0.5 rounded-full border border-white/30 text-[10px] sm:text-xs">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-body leading-relaxed mb-4">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/80 border border-white/20 mb-3.5 sm:mb-4 flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-medium">Growth Result</span>
                      <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {project.stats}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] bg-neutral-900/80 text-slate-300 px-2.5 py-1 rounded-md border border-neutral-800 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Button text="View Full Case Studies" href="/portfolio" variant="outline" icon={ArrowRight} className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
