import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { easings } from '@/lib/motion';

export function PageTransition({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, ease: easings.entrance }}
    >
      {children}
    </motion.div>
  );
}
