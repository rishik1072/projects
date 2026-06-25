import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

import { ShinyText } from '@/components/react-bits';
import { cn } from '@/lib/cn';

export type PulseLogoProps = ComponentPropsWithoutRef<'a'> & {
  markOnly?: boolean;
};

export function PulseLogo({ className, markOnly = false, ...props }: PulseLogoProps) {
  return (
    <a
      className={cn(
        'group/logo inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      aria-label="Pulse home"
      {...props}
    >
      <motion.span
        className="relative grid size-8 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.06] shadow-inset"
        initial={false}
        whileHover={{ scale: 1.04, rotate: -2 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <span className="absolute inset-0 bg-pulse-gradient opacity-80 blur-[14px] transition-opacity duration-base group-hover/logo:opacity-100" />
        <svg className="relative size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M7.25 17V7h5.6c3.05 0 4.95 1.86 4.95 4.56 0 2.73-1.9 4.64-4.95 4.64H10.5v.8H7.25Zm3.25-3.6h2.04c1.2 0 1.9-.68 1.9-1.8 0-1.08-.7-1.76-1.9-1.76H10.5v3.56Z"
            fill="currentColor"
            className="text-white"
          />
        </svg>
      </motion.span>

      {!markOnly && (
        <span className="text-sm font-semibold tracking-[-0.03em] text-foreground">
          <ShinyText>Pulse</ShinyText>
        </span>
      )}
    </a>
  );
}
