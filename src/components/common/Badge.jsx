import React from 'react';

export default function Badge({ text, variant = 'bw', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-white/30 text-white text-xs font-accent font-bold uppercase tracking-widest ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      {text}
    </span>
  );
}
