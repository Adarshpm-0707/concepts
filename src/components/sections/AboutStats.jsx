import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Award, Globe } from 'lucide-react';

export default function AboutStats() {
  const stats = [
    {
      value: "2+",
      label: "Years Growing",
      sublabel: "Kannur & GCC",
      icon: TrendingUp
    },
    {
      value: "6",
      label: "Core Services",
      sublabel: "Under One Roof",
      icon: Award
    },
    {
      value: "100%",
      label: "Asset Ownership",
      sublabel: "Yours Forever",
      icon: ShieldCheck
    },
    {
      value: "Kerala & GCC",
      label: "Reach",
      sublabel: "Global Clients",
      icon: Globe
    }
  ];

  return (
    <section className="bg-black border-y border-white/10 relative z-20">

      {/* ── MOBILE: 2x2 clean grid ── */}
      <div className="block sm:hidden px-4 py-5">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex flex-col p-3.5 bg-neutral-950 rounded-2xl border border-white/12"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-2.5">
                  <Icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xl font-extrabold font-heading text-white tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold text-slate-300 font-heading mt-1 leading-tight">
                  {stat.label}
                </span>
                <span className="text-[9px] text-slate-500 mt-0.5 leading-tight">
                  {stat.sublabel}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── DESKTOP / TABLET: horizontal row (unchanged) ── */}
      <div className="hidden sm:block py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 bg-neutral-950/90 rounded-[18px] border border-white/15 flex flex-row items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-3xl font-extrabold font-heading text-white tracking-tight block">
                      {stat.value}
                    </span>
                    <span className="text-sm font-bold text-slate-200 font-heading block mt-0.5 leading-tight">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-slate-400 font-body block mt-0.5 leading-tight">
                      {stat.sublabel}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
