import { motion } from 'framer-motion';
import { Clock3, ListMusic, Play, Sparkles } from 'lucide-react';
import { memo } from 'react';

import { SpotlightCard } from '@/components/react-bits';
import type { GeneratedPlaylist } from '@/types/content';

export type PlaylistResultCardProps = {
  playlist: GeneratedPlaylist;
  index: number;
};

function PlaylistResultCardComponent({ playlist, index }: PlaylistResultCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.94, filter: 'blur(12px)' },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.62, delay: index * 0.075, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      <SpotlightCard className="group/playlist relative h-full rounded-[1.6rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_22px_70px_rgb(0_0_0_/_0.32),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl transition-[border-color,background,box-shadow,transform] duration-slow ease-standard hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-[0_28px_90px_rgb(139_92_246_/_0.16),0_22px_70px_rgb(0_0_0_/_0.38)]">
        <div className="relative z-20 overflow-hidden rounded-[1.25rem] border border-white/10 bg-surface/80 p-4">
          <div className={`absolute inset-0 bg-gradient-to-br ${playlist.gradient} opacity-28 blur-2xl`} aria-hidden="true" />
          <div className={`relative mb-5 flex aspect-[1.35] items-end overflow-hidden rounded-2xl bg-gradient-to-br ${playlist.gradient} p-4 shadow-[0_20px_60px_rgb(0_0_0_/_0.25)]`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgb(255_255_255_/_0.36),transparent_34%),linear-gradient(180deg,transparent,rgb(0_0_0_/_0.44))]" />
            <motion.div
              className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/18 backdrop-blur-xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            >
              <Sparkles className="size-5 text-white" />
            </motion.div>
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">AI Mix</p>
              <h3 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-white">
                {playlist.title}
              </h3>
            </div>
          </div>

          <p className="text-sm leading-6 text-muted text-pretty">{playlist.description}</p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1">
              <ListMusic className="size-3.5" aria-hidden="true" />
              {playlist.tracks} tracks
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1">
              <Clock3 className="size-3.5" aria-hidden="true" />
              {playlist.duration}
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="truncate text-xs font-medium uppercase tracking-[0.16em] text-brand-electric/85">
              {playlist.mood}
            </p>
            <button
              type="button"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-background shadow-[0_14px_34px_rgb(255_255_255_/_0.16)] transition-transform duration-base hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`Play ${playlist.title}`}
            >
              <Play className="ml-0.5 size-4 fill-current" aria-hidden="true" />
            </button>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

export const PlaylistResultCard = memo(PlaylistResultCardComponent);
