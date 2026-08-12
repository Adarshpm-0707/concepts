import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, CheckCircle2, Send, MapPin, Clock } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import Button from '../components/common/Button';
import { careersData } from '../data/content';

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [applied, setApplied] = useState(false);

  const handleApply = (e) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <>
      <PageHeader
        eyebrow={careersData.eyebrow}
        title={careersData.title}
        subtitle={careersData.subtitle}
      />

      <section className="py-14 sm:py-20 bg-transparent relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Culture Overview */}
          <div className="glass-card p-6 sm:p-10 rounded-3xl border border-white/15 mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-3xl font-extrabold font-heading text-white mb-4">
              Our Work Culture & Standard
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-3xl">
              {careersData.culture}
            </p>
          </div>

          {/* Open Positions List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading text-white">Current Openings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careersData.openings.map((job, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="glass-card-bw p-6 sm:p-8 rounded-2xl border border-white/20 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-neutral-900 border border-white/20 text-slate-300 text-xs font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {job.location}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-white font-heading mb-2">{job.role}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">{job.description}</p>
                  </div>

                  <button
                    onClick={() => { setSelectedRole(job.role); setApplied(false); }}
                    className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Apply for this Role</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Application Form Modal / Drawer */}
          {selectedRole && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
              <div className="glass-card p-6 sm:p-8 rounded-3xl max-w-lg w-full border border-white/30 relative">
                <button
                  onClick={() => setSelectedRole(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-800 text-white font-bold flex items-center justify-center hover:bg-neutral-700"
                >
                  ✕
                </button>

                <h3 className="text-xl font-bold text-white mb-1">Apply: {selectedRole}</h3>
                <p className="text-xs text-slate-300 mb-6">Kannur & Kerala Team Application</p>

                {applied ? (
                  <div className="p-6 rounded-2xl bg-neutral-900 border border-white/30 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                    <h4 className="text-lg font-bold text-white">Application Received!</h4>
                    <p className="text-xs text-slate-300">
                      Thank you for applying. Our hiring team at Aleef Concepts will review your profile and reach out soon.
                    </p>
                    <button
                      onClick={() => setSelectedRole(null)}
                      className="mt-4 px-6 py-2 rounded-xl bg-white text-black font-bold text-xs"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Portfolio / LinkedIn Link</label>
                      <input
                        type="url"
                        required
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Why Aleef Concepts?</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Briefly tell us why you want to work with us..."
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-white"
                      />
                    </div>

                    <Button type="submit" text="Submit Application" variant="primary" icon={Send} className="w-full py-3" />
                  </form>
                )}
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
