import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';
import { easings } from '@/lib/motion';

export type ScrollRevealProps = PropsWithChildren<
  ComponentPropsWithoutRef<typeof motion.div> & {
    delay?: number;
    y?: number;
  }
>;

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
  transition,
  ...props
}: ScrollRevealProps) {
  return (
    <motion.div
      className={cn('motion-reveal', className)}
      initial={{ opacity: 0, y, scale: 0.985, filter: 'blur(12px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.22, margin: '-80px' }}
      transition={{ duration: 0.72, delay, ease: easings.entrance, ...transition }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
