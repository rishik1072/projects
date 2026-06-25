import { Heart, Play } from 'lucide-react';
import { memo } from 'react';

import { SpotlightCard, TiltedCard } from '@/components/react-bits';
import { cn } from '@/lib/cn';
import type { TrendingAlbum } from '@/types/content';

export type TrendingAlbumCardProps = {
  album: TrendingAlbum;
  isLiked: boolean;
  onToggleLike: (albumId: string) => void;
  isInteractive?: boolean;
};

function TrendingAlbumCardComponent({
  album,
  isLiked,
  onToggleLike,
  isInteractive = true,
}: TrendingAlbumCardProps) {
  return (
    <TiltedCard className="h-full min-w-[17.5rem] sm:min-w-[20rem] lg:min-w-[22rem]" tiltAmount={7}>
      <SpotlightCard className="group/card h-full rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-3 shadow-[0_24px_80px_rgb(0_0_0_/_0.34),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl transition-[border-color,background,box-shadow] duration-slow ease-standard hover:border-white/20 hover:bg-white/[0.075] hover:shadow-[0_30px_100px_rgb(139_92_246_/_0.18),0_24px_80px_rgb(0_0_0_/_0.4)]">
        <div className="relative z-20">
          <div className="relative aspect-square overflow-hidden rounded-[1.35rem] border border-white/10 bg-surface shadow-[0_18px_50px_rgb(0_0_0_/_0.3)]">
            <img
              src={album.artwork}
              alt={`${album.title} album artwork`}
              className="size-full object-cover transition-transform duration-slow ease-standard group-hover/card:scale-105"
              loading="lazy"
              decoding="async"
              width="960"
              height="960"
              draggable="false"
              sizes="(min-width: 1024px) 22rem, (min-width: 640px) 20rem, 17.5rem"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_44%,rgb(0_0_0_/_0.62))]" />
            <button
              type="button"
              className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-white text-background shadow-[0_16px_44px_rgb(255_255_255_/_0.18)] transition-transform duration-base hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Play ${album.title} by ${album.artist}`}
              tabIndex={isInteractive ? 0 : -1}
            >
              <Play className="ml-0.5 size-5 fill-current" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-4 flex items-start justify-between gap-4 px-1 pb-1">
            <div className="min-w-0">
              <h3 className="truncate text-xl font-semibold tracking-[-0.04em] text-foreground">
                {album.title}
              </h3>
              <p className="mt-1 truncate text-sm text-muted">{album.artist}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
                <span className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1">
                  {album.genre}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1">
                  {album.duration}
                </span>
              </div>
            </div>

            <button
              type="button"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-muted transition-[background,color,transform] duration-base hover:scale-105 hover:bg-white/[0.1] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
              aria-label={isLiked ? `Unlike ${album.title}` : `Like ${album.title}`}
              aria-pressed={isLiked}
              tabIndex={isInteractive ? 0 : -1}
              onClick={() => onToggleLike(album.id)}
            >
              <Heart
                className={cn('size-4 transition-colors duration-base', isLiked && 'fill-brand-pink text-brand-pink')}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </SpotlightCard>
    </TiltedCard>
  );
}

export const TrendingAlbumCard = memo(TrendingAlbumCardComponent);
