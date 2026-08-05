import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, Palette, Megaphone, Code2, Zap, ShieldAlert, Share2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import CTA from '../components/sections/CTA';
import FAQ from '../components/sections/FAQ';
import { servicesData } from '../data/content';

const iconMap = { Palette, Megaphone, Code2, Zap, ShieldAlert, Share2 };

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  
  const service = servicesData.services.find(s => s.id === serviceId) || servicesData.services[0];
  const IconComponent = iconMap[service.icon] || Megaphone;

  return (
    <>
      <PageHeader
        eyebrow="Specialized Service Detail"
        title={service.title}
        subtitle={service.headline}
      />

      <section className="py-14 sm:py-20 bg-transparent relative border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <div className="mb-8">
            <Link to="/services" className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Services</span>
            </Link>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card-bw p-8 sm:p-12 rounded-3xl border border-white/20 space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold shadow-lg">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Aleef Concepts Service</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">{service.title}</h2>
              </div>
            </div>

            <div className="text-xl font-semibold text-white font-heading leading-snug">
              "{service.headline}"
            </div>

            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed">
              {service.description}
            </p>

            <div className="pt-6 border-t border-neutral-800">
              <h3 className="text-lg font-bold text-white mb-4">Key Deliverables & Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-neutral-900 border border-white/10 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-sm font-semibold text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <Button text="Start a Project for this Service" href="/contact" variant="primary" icon={ArrowRight} className="w-full sm:w-auto py-4 px-8" />
              <Link to="/services" className="px-6 py-4 rounded-full border border-white/20 text-white font-bold text-sm hover:bg-neutral-900 transition-colors">
                Explore Other Services
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      <FAQ />
      <CTA />
    </>
  );
}
