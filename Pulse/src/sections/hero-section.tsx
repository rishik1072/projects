import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Play } from 'lucide-react';
import type { MouseEvent } from 'react';

import { AuroraBackground, BlurText, FloatingLines, GradientText, Magnet } from '@/components/react-bits';
import { Button } from '@/components/ui';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

import { HeroMusicPlayer } from './hero-music-player';

export type HeroSectionProps = {
  className?: string;
};

export function HeroSection({ className }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.5 });

  const playerX = useTransform(smoothX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-18, 18]);
  const playerY = useTransform(smoothY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-12, 12]);
  const playerRotateY = useTransform(smoothX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-4, 4]);
  const playerRotateX = useTransform(smoothY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [4, -4]);
  const glowX = useTransform(smoothX, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-30, 30]);
  const glowY = useTransform(smoothY, [-0.5, 0.5], prefersReducedMotion ? [0, 0] : [-24, 24]);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="hero"
      className={cn(
        'relative isolate overflow-hidden px-4 pb-16 pt-16 sm:px-6 lg:min-h-[calc(100svh-5.5rem)] lg:px-8 lg:pb-20 lg:pt-24',
        className,
      )}
      aria-labelledby="hero-heading"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <AuroraBackground intensity="strong" />
      <div className="absolute inset-0 pointer-events-none z-0">
        <FloatingLines
          linesGradient={['#E947F5', '#2F4BA2']}
          enabledWaves={['top', 'middle', 'bottom']}
          animationSpeed={0.4}
        />
      </div>


      <motion.div
        className="pointer-events-none absolute left-[8%] top-[18%] hidden size-28 rounded-full bg-brand-electric/20 blur-2xl lg:block"
        style={{ x: glowX, y: glowY }}
        animate={prefersReducedMotion ? undefined : { opacity: [0.28, 0.62, 0.28], scale: [1, 1.12, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[16%] top-[20%] size-36 rounded-full bg-brand-pink/20 blur-3xl"
        style={{ x: glowY, y: glowX }}
        animate={prefersReducedMotion ? undefined : { opacity: [0.2, 0.46, 0.2], scale: [1, 1.16, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" aria-hidden="true" />

      <div className="container relative z-10 grid min-h-[calc(100svh-10rem)] items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] lg:gap-14">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted shadow-inset backdrop-blur-xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-electric opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-brand-electric" />
            </span>
            Private beta now open
          </motion.div>

          <h1
            id="hero-heading"
            className="text-display-xl font-semibold tracking-[-0.08em] text-foreground text-balance"
          >
            <BlurText delay={0.05}>Feel Every Beat.</BlurText>{' '}
            <BlurText delay={0.16}>
              <GradientText animate>Live</GradientText>
            </BlurText>{' '}
            <BlurText delay={0.27}>Every Moment.</BlurText>
          </h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-body-lg text-muted text-pretty lg:mx-0"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.75, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            Pulse is a premium AI-powered music streaming platform for immersive listening — combining
            lossless audio, AI-generated playlists, spatial sound, and collaborative sessions into one
            beautifully crafted experience.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
          >
            <Magnet strength={0.12} className="w-full sm:w-auto">
              <Button as="a" href="#beta" size="lg" className="w-full sm:w-auto">
                <Play className="size-4 fill-current" aria-hidden="true" />
                Start Listening
              </Button>
            </Magnet>
            <Magnet strength={0.1} className="w-full sm:w-auto">
              <Button as="a" href="#features" variant="glass" size="lg" className="w-full sm:w-auto">
                Explore Features
                <ArrowRight
                  className="size-4 transition-transform duration-base group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            </Magnet>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-[31rem] lg:max-w-none">
          <motion.div
            className="absolute -inset-6 rounded-[3rem] bg-pulse-gradient opacity-20 blur-3xl lg:-inset-10"
            style={{ x: glowX, y: glowY }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute -right-4 top-8 hidden rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-muted shadow-card backdrop-blur-xl lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-foreground">98%</span> faster discovery loops
          </motion.div>
          <motion.div
            className="absolute -left-5 bottom-12 hidden rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-muted shadow-card backdrop-blur-xl lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.88, ease: [0.16, 1, 0.3, 1] }}
          >
            Mood engine active
          </motion.div>

          <HeroMusicPlayer
            style={{
              x: playerX,
              y: playerY,
              rotateX: playerRotateX,
              rotateY: playerRotateY,
              transformPerspective: 900,
            }}
          />
        </div>
      </div>

      <motion.a
        href="#features"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 rounded-full text-xs font-medium uppercase tracking-[0.18em] text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55, delay: 1.1 }}
        aria-label="Scroll to explore features"
      >
        <span>Scroll</span>
        <motion.span
          className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl"
          animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
