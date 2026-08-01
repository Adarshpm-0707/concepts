import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, Instagram, Linkedin, Facebook, Twitter, Youtube, Share2, Award } from 'lucide-react';
import ShapeGridCanvas from '../ui/ShapeGridCanvas';
import { brandData, navLinks, servicesData } from '../../data/content';

const socialIconMap = { Instagram, Linkedin, Facebook, Twitter, Youtube };

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black border-t border-white/20 text-slate-400 font-body relative overflow-hidden pt-12 pb-8 sm:pt-16 sm:pb-12">
      {/* MONOCHROME INTERACTIVE SHAPE GRID CANVAS */}
      <ShapeGridCanvas />

      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-8 sm:pb-12 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white text-black flex items-center justify-center font-black text-sm">
                A
              </div>
              <span className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
                Aleef <span className="text-slate-400 font-light">Concepts</span>
              </span>
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
                <a href={`tel:${brandData.phoneKerala}`} className="hover:text-white text-xs font-semibold text-white">{brandData.phoneKerala}</a>
              </li>
              <li className="flex items-center gap-2 sm:gap-2.5">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a href={`tel:${brandData.phoneGCC}`} className="hover:text-white text-xs text-slate-300">{brandData.phoneGCC} (GCC)</a>
              </li>
              <li className="flex items-center gap-2 sm:gap-2.5">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <a href={`mailto:${brandData.email}`} className="hover:text-white text-xs text-slate-300 break-all">{brandData.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-400 gap-3 sm:gap-4 text-center sm:text-left">
          <p>© {year} {brandData.name}. All rights reserved. Kannur's Premier Digital Marketing Agency.</p>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Official Digital Marketing Office in Kannur, Kerala</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
