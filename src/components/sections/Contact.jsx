import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2, Sparkles, Loader2, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import CurvedInput from '../ui/CurvedInput';
import { brandData } from '../../data/content';

// EmailJS Account Credentials
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_5a6p9hg';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_zvm17qh';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '5ri7rXdvREiav4hZ7';

// XSS Sanitizer & Input Length Guard
const sanitize = (str = '') => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .trim()
    .slice(0, 2000); // Length cap
};

export default function Contact() {
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Digital Marketing & SEO',
    message: ''
  });

  // Initialize EmailJS SDK once when component mounts
  useEffect(() => {
    try {
      emailjs.init({ publicKey: PUBLIC_KEY });
    } catch (err) {
      console.warn('EmailJS init warning:', err);
    }
  }, []);

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setErrorMessage('');

    // Honeypot Bot Check
    if (honeypot.trim() !== '') {
      // Silently fool bots without sending real email
      setSubmitted(true);
      return;
    }

    // Anti-Spam Cooldown Guard (10 seconds between submissions)
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setErrorMessage('Please wait a few seconds before submitting another request.');
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    const sanitizedParams = {
      user_name: sanitize(formData.name),
      phone_number: sanitize(formData.phone),
      user_email: sanitize(formData.email),
      service_required: sanitize(formData.service),
      project_details: sanitize(formData.message),
      reply_to: sanitize(formData.email)
    };

    try {
      let res;
      try {
        res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, sanitizedParams, { publicKey: PUBLIC_KEY });
      } catch (sendErr) {
        console.warn('emailjs.send failed, trying sendForm fallback...', sendErr);
        if (formRef.current) {
          res = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
        } else {
          throw sendErr;
        }
      }

      console.log('EmailJS response success:', res);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Digital Marketing & SEO',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Submit Error:', error);
      const detail = error?.text || error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      const statusPrefix = error?.status ? `(Status ${error.status}) ` : '';
      setErrorMessage(`EmailJS Error ${statusPrefix}: ${detail}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickStrategySubmit = async (val) => {
    if (!val) return;
    setErrorMessage('');
    const cleanEmail = sanitize(val);
    setFormData((prev) => ({ ...prev, email: cleanEmail }));
    setIsSubmitting(true);

    const templateParams = {
      user_name: 'Strategy Lead',
      phone_number: 'N/A (Quick Strategy Bar)',
      user_email: cleanEmail,
      service_required: 'Instant Strategy Proposal',
      project_details: 'Lead requested a strategy proposal via the quick email bar.',
      reply_to: cleanEmail
    };

    try {
      const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });
      console.log('EmailJS Quick Strategy success:', res);
      setSubmitted(true);
    } catch (error) {
      console.error('EmailJS Quick Strategy Error:', error);
      const detail = error?.text || error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
      const statusPrefix = error?.status ? `(Status ${error.status}) ` : '';
      setErrorMessage(`EmailJS Error ${statusPrefix}: ${detail}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage('');
    setHoneypot('');
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'Digital Marketing & SEO',
      message: ''
    });
  };

  return (
    <section id="contact" className="pt-28 sm:pt-36 lg:pt-44 pb-16 sm:pb-20 lg:pb-28 bg-black relative overflow-hidden border-t border-white/10">
      {/* Radial Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-tr from-pink-600/10 via-purple-600/10 to-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Connect With Us"
          title="Visit Kannur's Best Digital Marketing Office"
          subtitle="Get in touch with our team in Kannur for a custom strategy consultation and campaign proposal."
          centered={true}
        />

        {/* --- REACT BITS CURVED INPUT COMPONENT --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 sm:mt-10 mb-14 lg:mb-20 max-w-xl mx-auto w-full flex flex-col items-center justify-center text-center px-4"
        >
          <p className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-white" />
            <span>Instant Strategy Consultation</span>
          </p>
          <div className="w-full flex justify-center overflow-visible">
            <CurvedInput
              placeholder="Enter your email for strategy proposal..."
              buttonText={isSubmitting ? "Sending..." : "Get Strategy"}
              theme="dark"
              bend={18}
              height={62}
              fontSize={15}
              width="100%"
              backgroundColor="#0d0d0d"
              borderColor="#ffffff"
              textColor="#ffffff"
              placeholderColor="#888888"
              buttonColor="#ffffff"
              buttonTextColor="#000000"
              shadowSize="lg"
              shadowColor="#000000"
              onSubmit={(val) => handleQuickStrategySubmit(val)}
            />
          </div>
        </motion.div>

        {/* --- MAIN CONTACT SECTION GRID --- */}
        <div id="contact-form-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Office Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex"
          >
            <div className="w-full p-6 sm:p-8 lg:p-9 bg-neutral-950/90 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                <div className="border-b border-white/15 pb-4">
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-widest block mb-1 font-accent">Headquarters</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight">
                    Kannur Head Office
                  </h3>
                </div>

                <div className="space-y-5">
                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:border-white/40 transition-colors">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400">Office Location</div>
                      <div className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mt-0.5">{brandData.addressKerala}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:border-white/40 transition-colors">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400">Call Office</div>
                      <a href="tel:+917356956837" className="text-xs sm:text-sm font-bold text-white hover:text-pink-400 transition-colors block mt-0.5">
                        +91 735 695 6837
                      </a>
                      <a href="tel:+919633152828" className="text-xs sm:text-sm font-bold text-white hover:text-pink-400 transition-colors block mt-1">
                        +91 963 315 2828
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:border-white/40 transition-colors">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400">Email Enquiries</div>
                      <a href={`mailto:${brandData.email}`} className="text-xs sm:text-sm font-medium text-slate-200 hover:text-pink-400 transition-colors block mt-0.5 break-all">
                        {brandData.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/20 flex items-center justify-center text-white shrink-0 group-hover:border-white/40 transition-colors">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400">Working Hours</div>
                      <div className="text-xs sm:text-sm text-slate-200 font-medium mt-0.5">{brandData.officeHours}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="pt-4 border-t border-white/15">
                <a
                  href={brandData.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 active:scale-95 shadow-xl shadow-emerald-950/40"
                >
                  <MessageSquare className="w-4.5 h-4.5 text-white" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>

            </div>
          </motion.div>

          {/* Right Column: Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex"
          >
            <div className="w-full p-6 sm:p-8 lg:p-9 bg-neutral-950/90 rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl flex flex-col justify-between">
              
              <div>
                <div className="border-b border-white/15 pb-4 mb-6">
                  <span className="text-[11px] font-bold text-pink-400 uppercase tracking-widest block mb-1 font-accent">Get In Touch</span>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white tracking-tight">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Tell us about your business goals and our Kannur strategists will respond within 2 hours.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {submitted ? (
                  <div className="py-12 px-6 sm:px-8 rounded-2xl bg-neutral-900/90 border border-white/20 text-center space-y-4 my-auto">
                    <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-400 mx-auto animate-bounce" />
                    <h4 className="text-lg sm:text-xl font-bold text-white font-heading">Message Sent Successfully!</h4>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out to Aleef Concepts. Our Kannur office team has received your message and will review your details shortly.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Send Another Message</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    
                    {/* Honeypot Bot Trap Field (Hidden from real users, tricks spam bots) */}
                    <input
                      type="text"
                      name="website_url_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden opacity-0 pointer-events-none absolute -z-50 w-0 h-0"
                      aria-hidden="true"
                    />
                    
                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Your Name <span className="text-pink-400">*</span>
                        </label>
                        <input
                          type="text"
                          name="user_name"
                          required
                          placeholder="e.g. Muhammed Ali"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-500 font-medium disabled:opacity-50"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Phone Number <span className="text-pink-400">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone_number"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-500 font-medium disabled:opacity-50"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Service Required */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Email Address <span className="text-pink-400">*</span>
                        </label>
                        <input
                          type="email"
                          name="user_email"
                          required
                          placeholder="name@business.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={isSubmitting}
                          className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-500 font-medium disabled:opacity-50"
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Service Required <span className="text-pink-400">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="service_required"
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            disabled={isSubmitting}
                            className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all cursor-pointer font-medium appearance-none disabled:opacity-50"
                          >
                            <option value="Digital Marketing & SEO" className="bg-neutral-900 text-white">Digital Marketing & SEO</option>
                            <option value="Performance Ads (Meta & Google)" className="bg-neutral-900 text-white">Performance Ads (Meta & Google)</option>
                            <option value="Branding & Visual Identity" className="bg-neutral-900 text-white">Branding & Visual Identity</option>
                            <option value="Website & App Development" className="bg-neutral-900 text-white">Website & App Development</option>
                            <option value="Social Media & Video Production" className="bg-neutral-900 text-white">Social Media & Video Production</option>
                            <option value="CRM & Lead Automation" className="bg-neutral-900 text-white">CRM & Lead Automation</option>
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Message Textarea */}
                    <div className="flex flex-col">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Project Details <span className="text-pink-400">*</span>
                      </label>
                      <textarea
                        name="project_details"
                        rows={4}
                        required
                        placeholder="Briefly describe your business goals and requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-neutral-900/90 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all placeholder:text-slate-500 font-medium resize-none disabled:opacity-50"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        text={isSubmitting ? "Sending Message..." : "Send Message to Kannur Office"}
                        variant="primary"
                        icon={isSubmitting ? Loader2 : Send}
                        disabled={isSubmitting}
                        className="w-full py-3.5 sm:py-4 cursor-pointer disabled:cursor-not-allowed"
                      />
                    </div>

                  </form>
                )}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}


