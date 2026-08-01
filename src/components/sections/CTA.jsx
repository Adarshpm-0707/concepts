import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Award } from 'lucide-react';
import Button from '../common/Button';
import VariableProximity from '../ui/VariableProximity';
import { ctaData, brandData } from '../../data/content';

export default function CTA() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card-bw p-6 sm:p-10 md:p-16 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-white/40 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest mb-5 sm:mb-6">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            <span>Kannur's #1 Digital Marketing Office</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight max-w-3xl mx-auto">
            {ctaData.title}
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-slate-300 font-body max-w-2xl mx-auto leading-relaxed">
            <VariableProximity label={ctaData.subtitle} radius={140} falloff="smooth" />
          </p>

          <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5">
            <Button text={ctaData.buttonText} href="/contact" variant="primary" icon={ArrowRight} className="w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8" />
            <a
              href={brandData.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/40 bg-neutral-900/90 text-white hover:bg-neutral-800 font-heading font-bold text-sm md:text-base tracking-wide transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>{ctaData.secondaryButtonText}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
