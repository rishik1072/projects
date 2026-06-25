import { MotionConfig } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import { useLenis } from '@/hooks/use-lenis';
import { easings } from '@/lib/motion';

export function Providers({ children }: PropsWithChildren) {
  useLenis();

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: easings.standard }}>
      {children}
    </MotionConfig>
  );
}
