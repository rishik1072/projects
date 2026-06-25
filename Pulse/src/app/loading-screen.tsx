import { motion } from 'framer-motion';

import { PulseLogo } from '@/components/ui';

export function LoadingScreen() {
  return (
    <div
      className="grid min-h-[52svh] place-items-center bg-background px-4"
      role="status"
      aria-live="polite"
      aria-label="Loading Pulse content"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-8 text-center shadow-[0_28px_110px_rgb(0_0_0_/_0.45),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute -inset-20 bg-pulse-gradient opacity-20 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 flex flex-col items-center">
          <PulseLogo href="#top" />
          <div className="mt-8 flex h-12 items-end gap-1.5" aria-hidden="true">
            {[18, 30, 22, 38, 16, 28, 34].map((height, index) => (
              <motion.span
                key={`${height}-${index}`}
                className="w-1.5 rounded-full bg-gradient-to-t from-brand-violet via-brand-pink to-brand-electric"
                animate={{ height: [8, height, 12, height * 0.72, 10], opacity: [0.45, 1, 0.62, 0.88, 0.5] }}
                transition={{
                  duration: 1.15 + index * 0.08,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.06,
                }}
              />
            ))}
          </div>
          <p className="mt-6 text-sm font-medium text-muted">Tuning your listening experience…</p>
        </div>
      </div>
    </div>
  );
}
