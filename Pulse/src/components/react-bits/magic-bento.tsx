import { motion } from 'framer-motion';
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';

import { cn } from '@/lib/cn';

export type MagicBentoProps = PropsWithChildren<ComponentPropsWithoutRef<typeof motion.div>>;
export type MagicBentoItemProps = PropsWithChildren<
  ComponentPropsWithoutRef<typeof motion.div> & {
    featured?: boolean;
  }
>;

export function MagicBento({ children, className, ...props }: MagicBentoProps) {
  return (
    <motion.div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[18rem]',
        className,
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.075,
            delayChildren: 0.08,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MagicBentoItem({ children, className, featured = false, ...props }: MagicBentoItemProps) {
  return (
    <motion.div
      className={cn(featured && 'sm:col-span-2', className)}
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.96, filter: 'blur(12px)' },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
