import { motion } from 'framer-motion';
import { Heart, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useState, type ComponentPropsWithoutRef } from 'react';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

export type HeroMusicPlayerProps = ComponentPropsWithoutRef<typeof motion.div>;

function Equalizer({ isPlaying }: { isPlaying: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const bars = [18, 28, 14, 34, 22, 30, 16];

  return (
    <div className="flex h-9 items-end gap-1.5" aria-label={isPlaying ? 'Audio playing' : 'Audio paused'}>
      {bars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          className="w-1.5 rounded-full bg-gradient-to-t from-brand-violet via-brand-pink to-brand-electric shadow-[0_0_16px_rgb(244_114_182_/_0.28)]"
          initial={false}
          animate={
            isPlaying && !prefersReducedMotion
              ? {
                  height: [8, height, 12, height * 0.72, 10],
                  opacity: [0.58, 1, 0.72, 0.94, 0.66],
                }
              : { height: 10, opacity: 0.45 }
          }
          transition={{
            duration: 1.05 + index * 0.08,
            repeat: isPlaying && !prefersReducedMotion ? Infinity : 0,
            ease: 'easeInOut',
            delay: index * 0.06,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function HeroMusicPlayer({ className, ...props }: HeroMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        'group/player relative mx-auto w-full max-w-[25rem] rounded-[2rem] border border-white/[0.12] bg-white/[0.075] p-3 shadow-[0_34px_120px_rgb(0_0_0_/_0.5),inset_0_1px_0_rgb(255_255_255_/_0.1)] backdrop-blur-2xl will-change-transform sm:p-4 lg:mx-0',
        className,
      )}
      initial={{ opacity: 0, y: 28, scale: 0.96, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-pulse-gradient opacity-20 blur-3xl transition-opacity duration-slow group-hover/player:opacity-30" />
      <div className="pointer-events-none absolute inset-x-8 -bottom-7 -z-10 h-16 rounded-[100%] bg-white/20 blur-2xl opacity-20" />

      <div className="relative overflow-hidden rounded-[1.45rem] border border-white/10 bg-surface/72 p-3 shadow-inset">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgb(255_255_255_/_0.11),transparent_36%)]" />
        <div className="relative grid gap-4">
          <div className="grid grid-cols-[6.5rem_1fr] gap-4 sm:grid-cols-[8rem_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_28%_22%,#fff_0_2%,transparent_8%),linear-gradient(135deg,#8B5CF6,#F472B6_45%,#22D3EE)] shadow-[0_22px_60px_rgb(139_92_246_/_0.24)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgb(0_0_0_/_0.45))]" />
              <motion.div
                className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm sm:size-32"
                animate={isPlaying && !prefersReducedMotion ? { rotate: 360 } : undefined}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              >
                <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-background/70" />
              </motion.div>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-70" />
            </div>

            <div className="flex min-w-0 flex-col justify-between py-1">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-electric/90">
                  Daily Pulse
                </p>
                <h2 className="mt-2 truncate text-xl font-semibold tracking-[-0.04em] text-foreground sm:text-2xl">
                  Neon Afterglow
                </h2>
                <p className="mt-1 truncate text-sm text-muted">Luna Ray · adaptive mix</p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <Equalizer isPlaying={isPlaying} />
                <button
                  type="button"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-muted transition-colors duration-base hover:bg-white/[0.1] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                  aria-label={isLiked ? 'Unlike Neon Afterglow' : 'Like Neon Afterglow'}
                  aria-pressed={isLiked}
                  onClick={() => setIsLiked((current) => !current)}
                >
                  <Heart
                    className={cn('size-4', isLiked && 'fill-brand-pink text-brand-pink')}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-[0.7rem] font-medium text-muted">
              <span>1:18</span>
              <span>3:42</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
              <motion.div
                className="h-full rounded-full bg-pulse-gradient shadow-[0_0_18px_rgb(34_211_238_/_0.45)]"
                initial={{ width: '18%' }}
                animate={isPlaying && !prefersReducedMotion ? { width: ['18%', '74%'] } : undefined}
                transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-muted transition-colors duration-base hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
              aria-label="Previous track"
            >
              <SkipBack className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="grid size-12 place-items-center rounded-full bg-white text-background shadow-[0_16px_40px_rgb(255_255_255_/_0.18)] transition-transform duration-base hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={isPlaying ? 'Pause Neon Afterglow' : 'Play Neon Afterglow'}
              aria-pressed={isPlaying}
              onClick={() => setIsPlaying((current) => !current)}
            >
              {isPlaying ? <Pause className="size-5" aria-hidden="true" /> : <Play className="ml-0.5 size-5" aria-hidden="true" />}
            </button>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-muted transition-colors duration-base hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
              aria-label="Next track"
            >
              <SkipForward className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
