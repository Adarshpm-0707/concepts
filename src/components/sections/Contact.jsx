import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import CurvedInput from '../ui/CurvedInput';
import { brandData } from '../../data/content';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Digital Marketing & SEO',
    message: ''
  });

  const handleSubmit = (e) => {
    if (e?.preventDefault) e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-14 sm:py-20 lg:py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Connect With Us"
          title="Visit Kannur's Best Digital Marketing Office"
          subtitle="Get in touch with our team in Kannur for a custom strategy consultation and campaign proposal."
        />

        {/* --- CURVED INPUT QUICK CONSULTATION BAR (BLACK & WHITE MONOCHROME) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl mx-auto w-full flex flex-col items-center justify-center text-center"
        >
          <p className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">
            Instant Strategy Consultation Request
          </p>
          <div className="w-full flex justify-center">
            <CurvedInput
              placeholder="Enter your email for a free strategy proposal..."
              buttonText="Get Strategy"
              theme="dark"
              bend={22}
              height={60}
              width="100%"
              backgroundColor="#0a0a0a"
              borderColor="#ffffff"
              textColor="#ffffff"
              placeholderColor="#888888"
              buttonColor="#ffffff"
              buttonTextColor="#000000"
              iconColor="#ffffff"
              shadowSize="lg"
              shadowColor="#000000"
              onSubmit={(val) => {
                if (val) {
                  setFormData((prev) => ({ ...prev, email: val }));
                  setSubmitted(true);
                }
              }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Office Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card-bw p-5 sm:p-8 rounded-2xl space-y-5 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white border-b border-white/20 pb-3.5 sm:pb-4">
                Kannur Head Office
              </h3>

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-900 border border-white/30 flex items-center justify-center text-white flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-300">Office Location</div>
                  <div className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mt-0.5 sm:mt-1">{brandData.addressKerala}</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-900 border border-white/30 flex items-center justify-center text-white flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-300">Call Kannur Office</div>
                  <a href={`tel:${brandData.phoneKerala}`} className="text-xs sm:text-sm font-bold text-white hover:text-slate-200 block mt-0.5">
                    {brandData.phoneKerala}
                  </a>
                  <a href={`tel:${brandData.phoneGCC}`} className="text-[11px] sm:text-xs text-slate-400 block mt-0.5">
                    {brandData.phoneGCC} (GCC Hub)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-900 border border-white/30 flex items-center justify-center text-white flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-300">Email Enquiries</div>
                  <a href={`mailto:${brandData.email}`} className="text-xs sm:text-sm font-medium text-slate-200 hover:text-white block mt-0.5 break-all">
                    {brandData.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-900 border border-white/30 flex items-center justify-center text-white flex-shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-300">Working Hours</div>
                  <div className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">{brandData.officeHours}</div>
                </div>
              </div>

              <div className="pt-3.5 sm:pt-4 border-t border-white/20">
                <a
                  href={brandData.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 rounded-xl bg-white text-black font-bold text-xs sm:text-sm tracking-wide transition-colors hover:bg-slate-200"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-5 sm:p-8 md:p-10 rounded-2xl border border-white/10">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-1.5 sm:mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-300 mb-5 sm:mb-6">
                Tell us about your business goals and our Kannur strategists will respond within 2 hours.
              </p>

              {submitted ? (
                <div className="p-6 sm:p-8 rounded-xl bg-neutral-900 border border-white/40 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white mx-auto" />
                  <h4 className="text-lg sm:text-xl font-bold text-white">Message Sent Successfully!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out to Aleef Concepts. Our Kannur office team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammed Ali"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="name@business.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Service Required</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
                      >
                        <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                        <option value="Performance Ads (Meta & Google)">Performance Ads (Meta & Google)</option>
                        <option value="Branding & Visual Identity">Branding & Visual Identity</option>
                        <option value="Website & App Development">Website & App Development</option>
                        <option value="Social Media & Video Production">Social Media & Video Production</option>
                        <option value="CRM & Lead Automation">CRM & Lead Automation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] sm:text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">Project Details</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Briefly describe your business and requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-xs sm:text-sm focus:outline-none focus:border-white"
                    />
                  </div>

                  <Button type="submit" text="Send Message to Kannur Office" variant="primary" icon={Send} className="w-full py-3.5 sm:py-4" />
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
