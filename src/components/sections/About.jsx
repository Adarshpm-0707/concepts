import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, XCircle, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import Button from '../common/Button';
import { aboutData } from '../../data/content';

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } }
});

export default function About() {
  const comparisons = [
    { old: "5 Disconnected Freelancers", new: "1 Unified Team & Strategy" },
    { old: "Vague Vanity Metrics", new: "Real Enquiries & Revenue Growth" },
    { old: "Locked / Restricted Code", new: "100% Client Asset Ownership" },
    { old: "Confusing Communication", new: "Single Point of Contact" }
  ];

  return (
    <section id="about" className="py-10 sm:py-24 bg-black relative overflow-hidden border-t border-white/10">
      {/* Background ambient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[250px] sm:w-[600px] h-[180px] sm:h-[350px] bg-white/5 rounded-full blur-[80px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── MOBILE LAYOUT ── */}
        <div className="block lg:hidden space-y-6">

          {/* Header pill + title */}
          <motion.div variants={fadeUp(0)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-white/20 text-slate-300 text-[10px] font-accent font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3 text-white" />
              <span>Our Story</span>
            </div>
            <h2 className="text-2xl font-extrabold font-heading text-white tracking-tight leading-[1.2]">
              {aboutData.title}
            </h2>
          </motion.div>

          {/* Core story - trimmed to 1 key paragraph */}
          <motion.div variants={fadeUp(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="p-4 rounded-2xl bg-neutral-900/90 border border-white/15">
              <p className="text-white font-semibold text-sm leading-relaxed">
                {aboutData.descriptionParagraph2}
              </p>
              <p className="text-slate-300 text-xs leading-relaxed mt-2">
                {aboutData.descriptionParagraph3}
              </p>
            </div>
          </motion.div>

          {/* 3 key highlights as compact chips */}
          <motion.div variants={fadeUp(0.15)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-2">
            {aboutData.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </motion.div>

          {/* Comparison card — compact mobile version */}
          <motion.div variants={fadeUp(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="rounded-2xl border border-white/20 bg-neutral-950/90 overflow-hidden">
              {/* Card header */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <Layers className="w-4 h-4 text-white" />
                <span className="text-sm font-bold font-heading text-white">The Aleef Difference</span>
              </div>
              {/* Rows */}
              <div className="divide-y divide-white/10">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="px-4 py-2.5 flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-[10px] text-rose-400 font-mono line-through opacity-70">
                      <XCircle className="w-3 h-3 shrink-0" />
                      {item.old}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-white font-bold font-heading">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                      {item.new}
                    </span>
                  </div>
                ))}
              </div>
              {/* Ownership badge */}
              <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-white shrink-0" />
                <div>
                  <p className="text-xs font-bold text-white font-heading">100% Asset Ownership</p>
                  <p className="text-[10px] text-slate-400">Code, designs & files are yours forever.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={fadeUp(0.25)} initial="hidden" whileInView="show" viewport={{ once: true }} className="flex flex-col gap-2.5">
            <Button
              text="Start a Project"
              href="/contact"
              variant="primary"
              icon={ArrowRight}
              className="w-full py-3 px-6 text-center justify-center text-sm"
            />
            <a
              href="#values"
              className="w-full px-6 py-3 rounded-full border border-white/20 bg-neutral-900/60 text-white font-heading font-semibold text-sm text-center transition-all duration-300"
            >
              Our Values
            </a>
          </motion.div>
        </div>

        {/* ── DESKTOP LAYOUT (unchanged) ── */}
        <div className="hidden lg:grid grid-cols-12 gap-16 items-center">

          {/* Left Column */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-7 space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-white/20 text-slate-300 text-xs font-accent font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Our Origin &amp; Purpose</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-[1.15]">
                {aboutData.title}
              </h2>
            </div>

            <div className="space-y-4 text-slate-300 font-body">
              <p className="text-slate-200 text-base">{aboutData.descriptionParagraph1}</p>
              <div className="p-6 rounded-2xl bg-neutral-900/90 border border-white/20 text-white font-semibold text-lg shadow-lg leading-snug">
                {aboutData.descriptionParagraph2}
              </div>
              <p className="text-slate-300 text-base">{aboutData.descriptionParagraph3}</p>
            </div>

            <div className="space-y-3 pt-2">
              {aboutData.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3 text-base text-slate-200 font-medium">
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-row items-center gap-4">
              <Button
                text="Start a Project With Us"
                href="/contact"
                variant="primary"
                icon={ArrowRight}
                className="py-4 px-8 text-base"
              />
              <a
                href="#values"
                className="px-8 py-4 rounded-full border border-white/20 bg-neutral-900/60 hover:bg-neutral-800 text-white font-heading font-semibold text-sm text-center transition-all duration-300"
              >
                Explore Our Values
              </a>
            </div>
          </motion.div>

          {/* Right Column — Comparison Card */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="col-span-5 w-full"
          >
            <div className="p-8 bg-neutral-950/90 rounded-[28px] border border-white/20 space-y-6">
              <div className="border-b border-white/10 pb-5">
                <div className="flex items-center gap-3 mb-2">
                  <Layers className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-bold font-heading text-white">The Aleef Difference</h3>
                </div>
                <p className="text-sm text-slate-400">
                  How we compare against traditional fragmented agency setups.
                </p>
              </div>

              <div className="space-y-4">
                {comparisons.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-900/80 border border-white/10 space-y-2">
                    <div className="flex items-center text-xs text-rose-400/90 font-mono line-through opacity-80">
                      <span className="flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                        {item.old}
                      </span>
                    </div>
                    <div className="flex items-center text-base text-white font-bold font-heading">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        {item.new}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/15 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-white shrink-0" />
                <p className="text-xs text-slate-300 leading-snug">
                  <strong className="text-white block font-heading text-sm mb-0.5">100% Asset Ownership</strong>
                  All code, designs, and marketing collateral stay yours forever once completed.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
