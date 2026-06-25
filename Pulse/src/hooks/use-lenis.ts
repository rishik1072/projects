import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

import { useReducedMotion } from './use-reduced-motion';

export type UseLenisOptions = ConstructorParameters<typeof Lenis>[0];

function getHashTarget(hash: string) {
  if (!hash || hash === '#') return null;

  try {
    return document.querySelector<HTMLElement>(decodeURIComponent(hash));
  } catch {
    return null;
  }
}

export function useLenis(options?: UseLenisOptions) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');

      if (!link) return;

      const target = getHashTarget(link.hash);

      if (!target) return;

      event.preventDefault();

      if (prefersReducedMotion || !lenisRef.current) {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      } else {
        lenisRef.current.scrollTo(target, {
          offset: -96,
          duration: 1.15,
          easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
        });
      }

      window.history.pushState(null, '', link.hash);
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.075,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      ...options,
    });

    lenisRef.current = lenis;

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options, prefersReducedMotion]);

  return lenisRef;
}
