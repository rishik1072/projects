import { useRef, type CSSProperties, type ComponentPropsWithoutRef, type MouseEvent } from 'react';

import { cn } from '@/lib/cn';

export type SpotlightCardProps = ComponentPropsWithoutRef<'article'> & {
  spotlightColor?: string;
};

type SpotlightStyle = CSSProperties & {
  '--spotlight-x'?: string;
  '--spotlight-y'?: string;
  '--spotlight-color'?: string;
};

export function SpotlightCard({
  className,
  spotlightColor = 'rgba(255,255,255,0.16)',
  style,
  onMouseMove,
  onMouseLeave,
  ...props
}: SpotlightCardProps) {
  const frameRef = useRef(0);
  const pointRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    onMouseMove?.(event);

    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (frameRef.current !== 0) return;

    const target = event.currentTarget;
    frameRef.current = window.requestAnimationFrame(() => {
      target.style.setProperty('--spotlight-x', `${pointRef.current.x}px`);
      target.style.setProperty('--spotlight-y', `${pointRef.current.y}px`);
      frameRef.current = 0;
    });
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    onMouseLeave?.(event);

    if (frameRef.current !== 0) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }
  };

  return (
    <article
      className={cn(
        'relative overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:z-10 before:bg-[radial-gradient(420px_circle_at_var(--spotlight-x,50%)_var(--spotlight-y,50%),var(--spotlight-color),transparent_42%)] before:opacity-0 before:transition-opacity before:duration-base before:will-change-opacity hover:before:opacity-100 focus-within:before:opacity-100',
        className,
      )}
      style={{ '--spotlight-color': spotlightColor, ...style } as SpotlightStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    />
  );
}
