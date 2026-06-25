import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

export type ShinyTextProps = ComponentPropsWithoutRef<'span'> & {
  disabled?: boolean;
};

export function ShinyText({ className, disabled = false, ...props }: ShinyTextProps) {
  return (
    <span
      className={cn(
        'relative inline-flex bg-[linear-gradient(110deg,currentColor_0%,currentColor_36%,rgb(255_255_255)_48%,currentColor_60%,currentColor_100%)] bg-[length:250%_100%] bg-clip-text text-transparent',
        !disabled && 'motion-safe:animate-[shimmer_4.5s_var(--ease-standard)_infinite]',
        className,
      )}
      {...props}
    />
  );
}
