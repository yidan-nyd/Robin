import React from 'react';
import { cn } from '../../../lib/utils';

export function Badge({ className, variant = 'default', children, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline' }) {
  const variants = {
    default: "bg-[#d4ff00] text-stone-900",
    success: "bg-[#99e599]/40 backdrop-blur-md text-stone-800",
    warning: "bg-[#e5c175]/40 backdrop-blur-md text-stone-800",
    destructive: "bg-[#ff4d4d]/90 backdrop-blur-md text-white",
    outline: "text-stone-600 border border-stone-300/50"
  };

  return (
    <div className={cn("inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium transition-colors", variants[variant], className)} {...props}>
      {children}
    </div>
  );
}