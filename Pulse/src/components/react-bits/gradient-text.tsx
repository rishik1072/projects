import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

export type GradientTextProps = ComponentPropsWithoutRef<'span'> & {
  animate?: boolean;
};

export function GradientText({ className, animate = false, ...props }: GradientTextProps) {
  return (
    <span
      className={cn(
        'inline-block bg-pulse-gradient bg-[length:140%_140%] bg-clip-text text-transparent',
        animate && 'motion-safe:animate-[gradient-shift_7s_var(--ease-standard)_infinite_alternate]',
        className,
      )}
      {...props}
    />
  );
}
