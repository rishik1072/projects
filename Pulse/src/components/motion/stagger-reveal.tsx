import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export type StaggerRevealProps = PropsWithChildren<
  ComponentPropsWithoutRef<typeof motion.div> & {
    delayChildren?: number;
    staggerChildren?: number;
  }
>;

export function StaggerReveal({
  children,
  className,
  delayChildren = 0.08,
  staggerChildren = 0.075,
  ...props
}: StaggerRevealProps) {
  return (
    <motion.div
      className={cn('motion-reveal', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16, margin: '-100px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
