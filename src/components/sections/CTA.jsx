import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Award } from 'lucide-react';
import Button from '../common/Button';
import VariableProximity from '../ui/VariableProximity';
import { ctaData, brandData } from '../../data/content';

export default function CTA() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card-bw p-6 sm:p-10 md:p-16 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-white/40 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-6">
            <Award className="w-4 h-4 text-white" />
            <span>Marketing Agency in Kannur | Creative Agency in Kerala</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading text-white tracking-tight leading-tight max-w-3xl mx-auto">
            {ctaData.title}
          </h2>

          <p className="mt-4 sm:mt-5 text-base sm:text-xl text-slate-300 font-body max-w-2xl mx-auto leading-relaxed">
            <VariableProximity label={ctaData.subtitle} radius={140} falloff="smooth" />
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button text={ctaData.buttonText} href="/contact" variant="primary" icon={ArrowRight} className="w-full sm:w-auto py-3.5 sm:py-4 px-8" />
            <a
              href={`tel:${brandData.phoneKerala}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full border border-white/40 bg-neutral-900/90 text-white hover:bg-neutral-800 font-heading font-bold text-sm md:text-base tracking-wide transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-white" />
              <span>{ctaData.secondaryButtonText}</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-400 font-medium">
            {ctaData.tagline}
          </div>
        </div>
      </div>
    </section>
  );
}
