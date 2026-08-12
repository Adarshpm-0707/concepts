import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, Palette, Megaphone, Code2, Zap, ShieldAlert, Share2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import FAQ from '../components/sections/FAQ';
import { servicesData } from '../data/content';

const iconMap = { Palette, Megaphone, Code2, Zap, ShieldAlert, Share2 };

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  
  const service = servicesData.services.find(s => s.id === serviceId) || servicesData.services[0];
  const IconComponent = iconMap[service.icon] || Megaphone;

  return (
    <div className="bg-black text-white relative w-full overflow-x-hidden min-h-screen">
      <PageHeader
        eyebrow="Specialized Service Solution"
        title={service.title}
        subtitle={service.headline}
      />

      <section className="py-8 sm:py-16 bg-transparent relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <div className="mb-6 sm:mb-8">
            <Link to="/services" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Services</span>
            </Link>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl bg-neutral-950/90 border border-white/20 space-y-6 sm:space-y-8 shadow-2xl"
          >
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white text-black flex items-center justify-center font-bold shadow-lg shrink-0">
                <IconComponent className="w-5 h-5 sm:w-7 sm:h-7" />
              </div>
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-bold block">
                  Aleef Concepts • Kannur & GCC
                </span>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading leading-tight">
                  {service.title}
                </h2>
              </div>
            </div>

            <div className="text-base sm:text-xl font-semibold text-white font-heading leading-snug p-4 rounded-xl bg-white/5 border border-white/10">
              "{service.headline}"
            </div>

            <p className="text-xs sm:text-base md:text-lg text-slate-300 font-body leading-relaxed">
              {service.description}
            </p>

            <div className="pt-5 border-t border-neutral-800">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 font-heading">
                Key Deliverables & Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-neutral-900 border border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Button text="Start a Project for this Service" href="/contact" variant="primary" icon={ArrowRight} className="w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8 text-center justify-center text-xs sm:text-base" />
              <Link to="/services" className="w-full sm:w-auto px-6 py-3.5 sm:py-4 rounded-full border border-white/20 text-white font-bold text-xs sm:text-sm text-center hover:bg-neutral-900 transition-colors">
                Explore Other Services
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      <FAQ />
    </div>
  );
}
