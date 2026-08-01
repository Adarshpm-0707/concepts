import React from 'react';

export default function Badge({ text, variant = 'bw', className = '' }) {
  const variants = {
    bw:      'bg-neutral-900 text-white border-white/30 shadow-lg shadow-white/5',
    gold:    'bg-neutral-900 text-white border-white/30 shadow-lg shadow-white/5',
    slate:   'bg-neutral-900 text-slate-200 border-white/20',
    emerald: 'bg-neutral-900 text-white border-white/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-accent font-bold tracking-wider uppercase border backdrop-blur-md ${variants[variant] || variants.bw} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-sm shadow-white" />
      {text}
    </span>
  );
}
