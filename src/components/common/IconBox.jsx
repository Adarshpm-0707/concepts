import React from 'react';
import {
  Globe2,
  TrendingUp,
  Sparkles,
  Zap,
  Lightbulb,
  Target,
  ShieldCheck,
  Handshake,
  Palette,
  BarChart3,
  Share2,
  Code2,
  Search,
  Megaphone,
  ShoppingBag,
  Building2,
  Stethoscope,
  Hotel,
  Briefcase,
  GraduationCap,
  ShieldAlert,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MapPin,
  Globe,
  Mail,
  Rocket,
  Coffee,
  Factory,
  Shirt,
  HardHat,
  UserCheck,
  ShoppingCart,
  Cpu,
  Phone,
  MessageSquare
} from 'lucide-react';

const iconMap = {
  Globe2,
  TrendingUp,
  Sparkles,
  Zap,
  Lightbulb,
  Target,
  ShieldCheck,
  Handshake,
  Palette,
  BarChart3,
  Share2,
  Code2,
  Search,
  Megaphone,
  ShoppingBag,
  Building2,
  Stethoscope,
  Hotel,
  Briefcase,
  GraduationCap,
  ShieldAlert,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MapPin,
  Globe,
  Mail,
  Rocket,
  Coffee,
  Factory,
  Shirt,
  HardHat,
  UserCheck,
  ShoppingCart,
  Cpu,
  Phone,
  MessageSquare
};

export default function IconBox({ icon, size = 'md', variant = 'bw', className = '' }) {
  let IconComponent = typeof icon === 'string' ? (iconMap[icon] || Sparkles) : (icon || Sparkles);

  const sizeClasses = {
    sm: 'w-8 h-8 p-1.5 text-sm',
    md: 'w-12 h-12 p-3 text-base',
    lg: 'w-16 h-16 p-4 text-xl'
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32
  };

  const variants = {
    bw:      'bg-neutral-900 text-white border border-white/20 shadow-lg shadow-white/5',
    gold:    'bg-neutral-900 text-white border border-white/20 shadow-lg shadow-white/5',
    indigo:  'bg-neutral-900 text-white border border-white/20 shadow-lg shadow-white/5',
    emerald: 'bg-neutral-900 text-white border border-white/20 shadow-lg shadow-white/5',
    slate:   'bg-neutral-900 text-white border border-white/20'
  };

  return (
    <div className={`inline-flex items-center justify-center rounded-2xl ${sizeClasses[size]} ${variants[variant] || variants.bw} ${className}`}>
      <IconComponent size={iconSizes[size]} className="stroke-[1.75]" />
    </div>
  );
}
