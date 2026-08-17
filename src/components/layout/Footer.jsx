import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Phone, Mail, ArrowUpRight, Instagram, Linkedin, Facebook, Twitter, Youtube, 
  Share2, Award, ChevronDown, MessageSquare, ArrowUp
} from 'lucide-react';
import ShapeGridCanvas from '../ui/ShapeGridCanvas';
import { brandData, navLinks, servicesData } from '../../data/content';
import logoImg from '../../assets/text aleef.png';

const XIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const socialIconMap = { Instagram, Linkedin, Facebook, Twitter: XIcon, Youtube, X: XIcon };

export default function Footer() {
  const year = new Date().getFullYear();
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/20 text-slate-400 font-body relative overflow-hidden pt-14 pb-10 sm:pt-20 sm:pb-14">
      {/* MONOCHROME INTERACTIVE SHAPE GRID CANVAS */}
      <ShapeGridCanvas />

      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* DESKTOP & TABLET VIEW (md and above) */}
        {/* ========================================================================= */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-8 sm:pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            <Link to="/" className="inline-flex items-center focus:outline-none group">
              <img 
                src={logoImg} 
                alt="Aleef Concepts Logo" 
                className="h-10 sm:h-12 lg:h-14 w-auto max-w-[240px] sm:max-w-[280px] object-contain transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              {brandData.heroSubtitle}
            </p>
            <div className="pt-1 sm:pt-2 flex flex-wrap gap-2">
              <span className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-neutral-900 border border-white/30 text-white font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-white" />
                Kannur's Best Digital Marketing Office
              </span>
              <span className="text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-slate-300">
                Kerala & GCC Operations
              </span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3 pt-2 sm:pt-3">
              {brandData.socials.map((social, idx) => {
                const Icon = socialIconMap[social.icon] || Share2;
                return (
                  <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-white transition-colors inline-flex items-center gap-1 group text-slate-300">
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Kannur Digital Services</h3>
            <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
              {servicesData.services.slice(0, 5).map((s, idx) => (
                <li key={idx}>
                  <Link to="/services" className="hover:text-white transition-colors block text-slate-300">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Office */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-heading font-bold text-white text-xs uppercase tracking-wider">Kannur Head Office</h3>
            <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-2 sm:gap-2.5">
                <MapPin className="w-4 h-4 text-white mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 text-xs leading-relaxed">{brandData.addressKerala}</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-2.5">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a href="tel:+917356956837" className="hover:text-white text-xs font-semibold text-white">+91 735 695 6837</a>
              </li>
              <li className="flex items-center gap-2 sm:gap-2.5">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a href="tel:+919633152828" className="hover:text-white text-xs font-semibold text-white">+91 963 315 2828</a>
              </li>
              <li className="flex items-center gap-2 sm:gap-2.5">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <a href={`mailto:${brandData.email}`} className="hover:text-white text-xs text-slate-300 break-all">{brandData.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VIEW ONLY (< md) — LUXURIOUS COMPACT EXECUTIVE DESIGN */}
        {/* ========================================================================= */}
        <div className="block md:hidden space-y-6 pb-6 border-b border-neutral-800">
          
          {/* Mobile Brand Card Header */}
          <div className="p-5 rounded-2xl bg-neutral-900/90 border border-white/20 backdrop-blur-md space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between gap-3">
              <Link to="/" className="flex items-center focus:outline-none">
                <img 
                  src={logoImg} 
                  alt="Aleef Concepts Logo" 
                  className="h-8 sm:h-9 w-auto max-w-[180px] object-contain" 
                />
              </Link>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active Office</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-body leading-relaxed">
              Branding, development, and marketing under one team, one strategy, one point of contact.
            </p>

            {/* Quick Touch Action Buttons for Mobile */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={`tel:${brandData.phoneKerala}`}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white text-black font-heading font-bold text-xs shadow-md active:scale-95 transition-transform"
              >
                <Phone className="w-3.5 h-3.5 text-black" />
                <span>Call Office</span>
              </a>
              <a
                href={brandData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-neutral-800 border border-white/30 text-white font-heading font-bold text-xs active:scale-95 transition-transform"
              >
                <MessageSquare className="w-3.5 h-3.5 text-white" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mobile Accordion 1: Quick Links */}
          <div className="rounded-xl bg-neutral-950 border border-white/15 overflow-hidden">
            <button
              onClick={() => toggleAccordion('links')}
              className="w-full p-4 flex items-center justify-between text-left font-heading font-bold text-xs uppercase tracking-wider text-white bg-neutral-900/60"
            >
              <span>Quick Navigation</span>
              <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openAccordion === 'links' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'links' && (
              <div className="p-4 pt-2 grid grid-cols-2 gap-2.5 border-t border-white/10 text-xs">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.path}
                    className="p-2 rounded-lg bg-neutral-900/80 border border-white/10 text-slate-200 font-medium flex items-center justify-between active:bg-neutral-800"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Accordion 2: Digital Services */}
          <div className="rounded-xl bg-neutral-950 border border-white/15 overflow-hidden">
            <button
              onClick={() => toggleAccordion('services')}
              className="w-full p-4 flex items-center justify-between text-left font-heading font-bold text-xs uppercase tracking-wider text-white bg-neutral-900/60"
            >
              <span>Digital Services</span>
              <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openAccordion === 'services' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'services' && (
              <div className="p-4 pt-2 space-y-2 border-t border-white/10 text-xs">
                {servicesData.services.slice(0, 6).map((s, idx) => (
                  <Link
                    key={idx}
                    to="/services"
                    className="p-2.5 rounded-lg bg-neutral-900/80 border border-white/10 text-slate-200 block font-medium active:bg-neutral-800"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Contact Info Card */}
          <div className="p-4 rounded-xl bg-neutral-900/80 border border-white/15 space-y-3 text-xs">
            <h4 className="font-heading font-bold text-white uppercase tracking-wider text-[11px]">
              Kannur Office & Address
            </h4>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
              <span>{brandData.addressKerala}</span>
            </div>
            <div className="flex flex-col gap-1 pt-1 text-slate-300">
              <a href="tel:+917356956837" className="font-semibold text-white hover:text-slate-200">+91 735 695 6837</a>
              <a href="tel:+919633152828" className="font-semibold text-white hover:text-slate-200">+91 963 315 2828</a>
            </div>
          </div>

          {/* Mobile Social Bar */}
          <div className="flex items-center justify-center gap-3 pt-1">
            {brandData.socials.map((social, idx) => {
              const Icon = socialIconMap[social.icon] || Share2;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-neutral-900 border border-white/25 flex items-center justify-center text-white active:bg-white active:text-black transition-colors"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM COPYRIGHT STRIP (ALL VIEWS) */}
        {/* ========================================================================= */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 gap-3 sm:gap-4 text-center sm:text-left">
          <p>© {year} {brandData.name}. All rights reserved. Kannur's Digital Marketing Agency.</p>
          
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-xs text-slate-400">Kannur • Kerala • GCC</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-neutral-900 border border-white/20 text-white hover:bg-white hover:text-black transition-colors flex items-center gap-1 text-[10px] font-bold"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
