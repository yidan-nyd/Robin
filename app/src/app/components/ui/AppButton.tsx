import React from 'react';
import { cn } from '../../../lib/utils';

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline' | 'ghost' | 'soft', size?: 'default' | 'sm' | 'lg' | 'icon' }>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const variants = {
      default: "bg-[#d4ff00] text-stone-900 hover:bg-[#cbf200] shadow-sm",
      outline: "border border-stone-300/50 bg-transparent hover:bg-stone-200/50 text-stone-700",
      ghost: "hover:bg-[#dcdcdc]/50 text-stone-600 hover:text-stone-900",
      soft: "bg-[#e4e4e4]/80 backdrop-blur-sm text-stone-800 hover:bg-[#dcdcdc]"
    };

    const sizes = {
      default: "h-11 px-6 py-2.5",
      sm: "h-9 px-4 text-xs",
      lg: "h-14 px-8 text-lg",
      icon: "h-11 w-11"
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4ff00] disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
