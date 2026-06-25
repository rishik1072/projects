import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

export type AuroraBackgroundProps = ComponentPropsWithoutRef<'div'> & {
  intensity?: 'subtle' | 'strong';
};

export function AuroraBackground({ className, intensity = 'subtle', ...props }: AuroraBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const opacity = intensity === 'strong' ? 0.5 : 0.34;

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true" {...props}>
      <motion.div
        className="motion-gpu absolute -left-1/4 top-[-26rem] h-[44rem] w-[44rem] rounded-full bg-brand-violet/30 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 80, 20, 0],
                y: [0, 36, 90, 0],
                scale: [1, 1.08, 0.96, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity }}
      />
      <motion.div
        className="motion-gpu absolute right-[-16rem] top-[-18rem] h-[38rem] w-[38rem] rounded-full bg-brand-electric/20 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -70, -10, 0],
                y: [0, 80, 30, 0],
                scale: [1, 0.95, 1.1, 1],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: opacity * 0.9 }}
      />
      <motion.div
        className="motion-gpu absolute bottom-[-24rem] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand-pink/20 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: ['-50%', '-44%', '-56%', '-50%'],
                y: [0, -40, 10, 0],
                scale: [1, 1.12, 1, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: opacity * 0.8 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255_/_0.08),transparent_36rem)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgb(var(--color-background))_92%)]" />
    </div>
  );
}
