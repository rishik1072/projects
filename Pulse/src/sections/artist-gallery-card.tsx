import { motion } from 'framer-motion';
import { memo } from 'react';

import { cn } from '@/lib/cn';
import type { FeaturedArtist } from '@/types/content';

export type ArtistGalleryCardProps = {
  artist: FeaturedArtist;
  active: boolean;
};

const accentGlow: Record<string, string> = {
  violet: 'shadow-[0_28px_90px_rgb(139_92_246_/_0.28)]',
  electric: 'shadow-[0_28px_90px_rgb(34_211_238_/_0.24)]',
  pink: 'shadow-[0_28px_90px_rgb(244_114_182_/_0.24)]',
  orange: 'shadow-[0_28px_90px_rgb(251_146_60_/_0.22)]',
};

function ArtistGalleryCardComponent({ artist, active }: ArtistGalleryCardProps) {
  return (
    <div
      className={cn(
        'group/card relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.065] p-3 backdrop-blur-2xl transition-[border-color,background,box-shadow] duration-slow ease-standard hover:border-white/20 hover:bg-white/[0.085]',
        active ? accentGlow[artist.accent] : 'shadow-[0_18px_60px_rgb(0_0_0_/_0.32)]',
      )}
    >
      <div className="pointer-events-none absolute -inset-12 bg-pulse-gradient opacity-0 blur-3xl transition-opacity duration-slow group-hover/card:opacity-20" aria-hidden="true" />
      <div className="relative aspect-[0.92] overflow-hidden rounded-[1.55rem] border border-white/10 bg-surface shadow-inset">
        <img
          src={artist.image}
          alt={`${artist.name} portrait`}
          className="size-full object-cover transition-transform duration-slow ease-standard group-hover/card:scale-105"
          loading="lazy"
          decoding="async"
          width="900"
          height="900"
          draggable="false"
          sizes="(min-width: 1024px) 18rem, (min-width: 640px) 17rem, 15.5rem"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(0_0_0_/_0.72))]" />
        <motion.div
          className="absolute right-4 top-4 size-3 rounded-full bg-brand-electric shadow-[0_0_20px_rgb(34_211_238_/_0.8)]"
          animate={active ? { scale: [1, 1.45, 1], opacity: [0.65, 1, 0.65] } : undefined}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-4 bottom-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">Featured artist</p>
          <h3 className="mt-1 truncate text-2xl font-semibold tracking-[-0.05em] text-white">
            {artist.name}
          </h3>
          <p className="mt-1 truncate text-sm text-white/62">{artist.role}</p>
        </div>
      </div>
    </div>
  );
}

export const ArtistGalleryCard = memo(ArtistGalleryCardComponent);
