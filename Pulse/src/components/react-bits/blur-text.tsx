import { motion } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';
import { easings } from '@/lib/motion';

type BlurTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function BlurText({ as: Component = 'span', children, className, delay = 0 }: BlurTextProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.span
      className={cn('motion-gpu inline-block', className)}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(14px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.75, delay, ease: easings.entrance }}
    >
      <Component>{children}</Component>
    </motion.span>
  );
}
