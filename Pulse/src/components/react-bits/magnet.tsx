import { motion, useMotionValue, useSpring } from 'framer-motion';
import type { ComponentPropsWithoutRef, MouseEvent, PropsWithChildren } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

export type MagnetProps = PropsWithChildren<
  ComponentPropsWithoutRef<typeof motion.div> & {
    strength?: number;
  }
>;

export function Magnet({ children, className, strength = 0.18, onMouseMove, onMouseLeave, ...props }: MagnetProps) {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.45 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event);

    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = (event.clientX - rect.left - rect.width / 2) * strength;
    const nextY = (event.clientY - rect.top - rect.height / 2) * strength;

    x.set(nextX);
    y.set(nextY);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={cn('inline-flex will-change-transform', className)}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
}
