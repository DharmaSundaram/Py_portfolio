import React from 'react';

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  const sizeClasses = {
    xs: 'text-[11px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5'
  };

  const variants = {
    default: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
    gold: 'bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    blue: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    demo: 'bg-rose-500/15 text-rose-300 border-rose-500/40 uppercase tracking-wider font-semibold'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border transition-colors ${
        sizeClasses[size] || sizeClasses.sm
      } ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
}
