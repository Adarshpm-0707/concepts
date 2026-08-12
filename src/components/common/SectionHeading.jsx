import React from 'react';
import Badge from './Badge';
import VariableProximity from '../ui/VariableProximity';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className = ''
}) {
  return (
    <div className={`mb-6 sm:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className="mb-2.5 sm:mb-4 inline-block">
          <Badge text={eyebrow} variant="bw" />
        </div>
      )}
      {title && (
        <>
          {/* Mobile title */}
          <h2 className="block sm:hidden text-[1.55rem] font-extrabold font-heading text-white tracking-tight leading-[1.2]">
            {title}
          </h2>
          {/* Desktop title */}
          <h2 className="hidden sm:block text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-snug sm:leading-[1.15]">
            {title}
          </h2>
        </>
      )}
      {subtitle && (
        <>
          {/* Mobile subtitle — plain text, no VariableProximity */}
          <p className="block sm:hidden mt-2 text-xs text-slate-300 font-body leading-relaxed">
            {subtitle}
          </p>
          {/* Desktop subtitle */}
          <p className="hidden sm:block mt-4 text-base md:text-lg text-slate-300 font-body leading-relaxed">
            <VariableProximity label={subtitle} radius={120} falloff="smooth" />
          </p>
        </>
      )}
    </div>
  );
}
