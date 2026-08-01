import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Button({
  text,
  variant = 'primary',
  onClick,
  href,
  icon: Icon = ArrowRight,
  showIcon = true,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2.5 font-heading font-bold transition-all duration-300 rounded-full px-7 py-3.5 text-sm md:text-base tracking-wide cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black active:scale-95';

  const variants = {
    primary: 'bg-white text-black hover:bg-slate-200 shadow-xl shadow-white/10 hover:scale-[1.02] border border-white/80',
    outline: 'border border-white/40 bg-black/90 text-white hover:border-white hover:bg-neutral-900 backdrop-blur-md hover:scale-[1.02]',
    gold:    'bg-white text-black hover:bg-slate-200 shadow-lg hover:scale-[1.02]',
    ghost:   'text-slate-300 hover:text-white hover:bg-neutral-900'
  };

  const combinedClass = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  const content = (
    <>
      <span>{text}</span>
      {showIcon && Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />}
    </>
  );

  if (href) {
    if (href.startsWith('/') && !href.startsWith('//')) {
      return (
        <Link to={href} className={`group ${combinedClass}`} onClick={onClick} {...props}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={`group ${combinedClass}`} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={`group ${combinedClass}`} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
