import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { ComponentPropsWithoutRef, MouseEvent, PropsWithChildren } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

export type TiltedCardProps = PropsWithChildren<
  ComponentPropsWithoutRef<typeof motion.div> & {
    tiltAmount?: number;
    scaleAmount?: number;
  }
>;

export function TiltedCard({
  children,
  className,
  tiltAmount = 8,
  scaleAmount = 1.025,
  onMouseMove,
  onMouseLeave,
  ...props
}: TiltedCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 20, mass: 0.35 });
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 20, mass: 0.35 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [tiltAmount * -1, tiltAmount]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [tiltAmount, tiltAmount * -1]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    onMouseMove?.(event);

    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    onMouseLeave?.(event);
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      className={cn('transform-gpu will-change-transform', className)}
      style={prefersReducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={prefersReducedMotion ? undefined : { scale: scaleAmount }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </motion.div>
  );
}
