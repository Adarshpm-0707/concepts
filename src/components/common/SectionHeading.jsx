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
    <div className={`mb-8 md:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl'} ${className}`}>
      {eyebrow && (
        <div className="mb-3.5 sm:mb-4 inline-block">
          <Badge text={eyebrow} variant="bw" />
        </div>
      )}
      {title && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-snug sm:leading-[1.15]">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-sm md:text-lg text-slate-300 font-body leading-relaxed">
          <VariableProximity label={subtitle} radius={120} falloff="smooth" />
        </p>
      )}
    </div>
  );
}
