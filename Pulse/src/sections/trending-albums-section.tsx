import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { BlurText, GradientText } from '@/components/react-bits';
import { Button } from '@/components/ui';
import { trendingAlbums } from '@/constants/trending-albums';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

import { TrendingAlbumCard } from './trending-album-card';

export type TrendingAlbumsSectionProps = {
  className?: string;
};

const carouselCopies = 3;
const scrollStep = 360;

function isInteractiveTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && Boolean(target.closest('button, a, input, textarea, select'));
}

export function TrendingAlbumsSection({ className }: TrendingAlbumsSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });
  const isPaused = useRef(false);
  const [likedAlbums, setLikedAlbums] = useState<Set<string>>(() => new Set());
  const loopedAlbums = useMemo(
    () => Array.from({ length: carouselCopies }, () => trendingAlbums).flat(),
    [],
  );

  const normalizeScroll = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const segmentWidth = scroller.scrollWidth / carouselCopies;

    if (segmentWidth <= 0) {
      return;
    }

    if (scroller.scrollLeft < segmentWidth * 0.45) {
      scroller.scrollLeft += segmentWidth;
    } else if (scroller.scrollLeft > segmentWidth * 1.55) {
      scroller.scrollLeft -= segmentWidth;
    }
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const setInitialScroll = () => {
      scroller.scrollLeft = scroller.scrollWidth / carouselCopies;
    };

    setInitialScroll();
    window.addEventListener('resize', setInitialScroll);

    return () => {
      window.removeEventListener('resize', setInitialScroll);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    let frameId = 0;
    let previousTime = performance.now();

    const tick = (time: number) => {
      const scroller = scrollerRef.current;
      const delta = Math.min(time - previousTime, 32);
      previousTime = time;

      if (scroller && !isPaused.current && !dragState.current.isDragging) {
        scroller.scrollLeft += delta * 0.018;
        normalizeScroll();
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [normalizeScroll, prefersReducedMotion]);

  const scrollByAmount = useCallback(
    (amount: number) => {
      const scroller = scrollerRef.current;

      if (!scroller) {
        return;
      }

      scroller.scrollBy({ left: amount, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    },
    [prefersReducedMotion],
  );

  const toggleLike = useCallback((albumId: string) => {
    setLikedAlbums((current) => {
      const next = new Set(current);

      if (next.has(albumId)) {
        next.delete(albumId);
      } else {
        next.add(albumId);
      }

      return next;
    });
  }, []);

  return (
    <section
      id="trending"
      className={cn('relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32', className)}
      aria-labelledby="trending-albums-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(139_92_246_/_0.16),transparent_34rem),radial-gradient(circle_at_80%_40%,rgb(34_211_238_/_0.1),transparent_32rem)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <motion.p
              className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-brand-electric/90"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Trending now
            </motion.p>
            <h2
              id="trending-albums-heading"
              className="text-heading-xl font-semibold tracking-[-0.055em] text-foreground text-balance"
            >
              <BlurText as="span">Albums moving through</BlurText>{' '}
              <BlurText as="span" delay={0.12}>
                <GradientText animate>the culture.</GradientText>
              </BlurText>
            </h2>
            <motion.p
              id="trending-albums-description"
              className="mt-5 max-w-2xl text-body-lg text-muted text-pretty"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            >
              A living shelf of records reshaped by listening energy, late-night saves, and real-time
              momentum across Pulse.
            </motion.p>
          </div>

          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button
              size="icon"
              variant="glass"
              aria-label="Scroll albums left"
              onClick={() => scrollByAmount(-scrollStep)}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <Button
              size="icon"
              variant="glass"
              aria-label="Scroll albums right"
              onClick={() => scrollByAmount(scrollStep)}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 mt-12 lg:mt-16"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-background to-transparent sm:w-24 lg:w-32" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-background to-transparent sm:w-24 lg:w-32" aria-hidden="true" />

        <div
          ref={scrollerRef}
          className="flex cursor-grab gap-5 overflow-x-auto px-4 pb-8 pt-2 outline-none [scrollbar-width:none] active:cursor-grabbing sm:gap-6 sm:px-6 lg:px-[max(2rem,calc((100vw-1320px)/2+2rem))] [&::-webkit-scrollbar]:hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Trending albums carousel"
          aria-describedby="trending-albums-description"
          tabIndex={0}
          onScroll={normalizeScroll}
          onMouseEnter={() => {
            isPaused.current = true;
          }}
          onMouseLeave={() => {
            isPaused.current = false;
          }}
          onFocus={() => {
            isPaused.current = true;
          }}
          onBlur={() => {
            isPaused.current = false;
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') {
              event.preventDefault();
              scrollByAmount(-scrollStep);
            } else if (event.key === 'ArrowRight') {
              event.preventDefault();
              scrollByAmount(scrollStep);
            }
          }}
          onPointerDown={(event) => {
            if (isInteractiveTarget(event.target)) {
              return;
            }

            const scroller = scrollerRef.current;

            if (!scroller) {
              return;
            }

            dragState.current = {
              isDragging: true,
              startX: event.clientX,
              startScrollLeft: scroller.scrollLeft,
            };
            scroller.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            const scroller = scrollerRef.current;

            if (!scroller || !dragState.current.isDragging) {
              return;
            }

            event.preventDefault();
            const delta = event.clientX - dragState.current.startX;
            scroller.scrollLeft = dragState.current.startScrollLeft - delta;
          }}
          onPointerUp={(event) => {
            const scroller = scrollerRef.current;
            dragState.current.isDragging = false;
            scroller?.releasePointerCapture(event.pointerId);
            normalizeScroll();
          }}
          onPointerCancel={(event) => {
            const scroller = scrollerRef.current;
            dragState.current.isDragging = false;
            scroller?.releasePointerCapture(event.pointerId);
            normalizeScroll();
          }}
        >
          {loopedAlbums.map((album, index) => (
            <div
              key={`${album.id}-${index}`}
              className="shrink-0"
              aria-hidden={index < trendingAlbums.length || index >= trendingAlbums.length * 2}
            >
              <TrendingAlbumCard
                album={album}
                isLiked={likedAlbums.has(album.id)}
                onToggleLike={toggleLike}
                isInteractive={index >= trendingAlbums.length && index < trendingAlbums.length * 2}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
