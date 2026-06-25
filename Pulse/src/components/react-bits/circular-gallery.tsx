import { motion } from 'framer-motion';
import type { KeyboardEvent, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type CircularGalleryProps<TItem> = {
  items: TItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  getItemLabel: (item: TItem) => string;
  renderItem: (item: TItem, state: { active: boolean; index: number }) => ReactNode;
  className?: string;
};

function getCircularOffset(index: number, activeIndex: number, itemCount: number) {
  const rawOffset = index - activeIndex;
  const half = itemCount / 2;

  if (rawOffset > half) return rawOffset - itemCount;
  if (rawOffset < -half) return rawOffset + itemCount;
  return rawOffset;
}

export function CircularGallery<TItem>({
  items,
  activeIndex,
  onActiveIndexChange,
  getItemLabel,
  renderItem,
  className,
}: CircularGalleryProps<TItem>) {
  const move = (direction: 1 | -1) => {
    onActiveIndexChange((activeIndex + direction + items.length) % items.length);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      onActiveIndexChange(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      onActiveIndexChange(items.length - 1);
    }
  };

  return (
    <div
      className={cn('relative min-h-[31rem] outline-none sm:min-h-[34rem] lg:min-h-[38rem]', className)}
      role="listbox"
      aria-label="Featured artists circular gallery"
      aria-activedescendant={`artist-gallery-item-${activeIndex}`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[21rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.025] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.06)] sm:size-[25rem] lg:size-[30rem]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" aria-hidden="true" />

      {items.map((item, index) => {
        const offset = getCircularOffset(index, activeIndex, items.length);
        const active = offset === 0;
        const absOffset = Math.abs(offset);
        const angle = offset * 31;
        const x = offset * 92;
        const y = absOffset * 34;
        const scale = active ? 1 : Math.max(0.7, 0.88 - absOffset * 0.06);
        const opacity = active ? 1 : Math.max(0.34, 0.74 - absOffset * 0.16);
        const zIndex = 20 - absOffset;

        return (
          <motion.button
            key={getItemLabel(item)}
            id={`artist-gallery-item-${index}`}
            type="button"
            role="option"
            aria-selected={active}
            aria-label={`View ${getItemLabel(item)}`}
            className={cn(
              'absolute left-1/2 top-1/2 w-[15.5rem] origin-center rounded-[2rem] text-left outline-none transition-filter focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-[17rem] lg:w-[18rem]',
              active ? 'pointer-events-auto' : 'hover:opacity-90',
            )}
            style={{ zIndex }}
            animate={{
              x: `calc(-50% + ${x}px)`,
              y: `calc(-50% + ${y}px)`,
              rotate: angle,
              scale,
              opacity,
            }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onActiveIndexChange(index)}
            onMouseEnter={() => onActiveIndexChange(index)}
          >
            {renderItem(item, { active, index })}
          </motion.button>
        );
      })}
    </div>
  );
}
