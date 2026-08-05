import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import { faqData } from '../../data/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow={faqData.eyebrow}
          title={faqData.title}
          subtitle={faqData.subtitle}
        />

        <div className="space-y-4">
          {faqData.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'glass-card-bw border-white/40 shadow-lg shadow-white/5'
                    : 'glass-card border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-white text-base sm:text-lg focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-slate-300 font-body leading-relaxed border-t border-neutral-800 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
