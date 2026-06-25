import { motion } from 'framer-motion';
import { ArrowRight, Music2, Radio, Users } from 'lucide-react';
import { useCallback, useState } from 'react';

import { BlurText, CircularGallery, GradientText, Magnet } from '@/components/react-bits';
import { Button } from '@/components/ui';
import { featuredArtists } from '@/constants/artists';
import { cn } from '@/lib/cn';

import { ArtistGalleryCard } from './artist-gallery-card';

export type ArtistShowcaseSectionProps = {
  className?: string;
};

export function ArtistShowcaseSection({ className }: ArtistShowcaseSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeArtist = featuredArtists[activeIndex];
  const renderArtistCard = useCallback(
    (artist: (typeof featuredArtists)[number], state: { active: boolean }) => (
      <ArtistGalleryCard artist={artist} active={state.active} />
    ),
    [],
  );

  return (
    <section
      id="creators"
      className={cn('relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32', className)}
      aria-labelledby="artist-showcase-heading"
    >
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[18%] size-64 rounded-full bg-brand-pink/14 blur-3xl"
        animate={{ opacity: [0.22, 0.48, 0.22], scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[30%] size-72 rounded-full bg-brand-electric/12 blur-3xl"
        animate={{ opacity: [0.18, 0.42, 0.18], scale: [1, 1.16, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgb(255_255_255_/_0.07),transparent_34rem),linear-gradient(to_bottom,transparent,rgb(var(--color-background))_92%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <div>
          <motion.p
            className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-brand-electric/90"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Artist ecosystem
          </motion.p>

          <h2
            id="artist-showcase-heading"
            className="text-heading-xl font-semibold tracking-[-0.055em] text-foreground text-balance"
          >
            <BlurText as="span">Discover the people</BlurText>{' '}
            <BlurText as="span" delay={0.12}>
              <GradientText animate>behind the pulse.</GradientText>
            </BlurText>
          </h2>

          <motion.p
            className="mt-5 max-w-2xl text-body-lg text-muted text-pretty"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            Pulse highlights artists as living worlds — not thumbnails — with context, signals, and
            rich listening momentum around every profile.
          </motion.p>

          <motion.div
            key={activeArtist.id}
            className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_90px_rgb(0_0_0_/_0.36),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-2xl sm:p-6"
            initial={{ opacity: 0, y: 18, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-brand-electric/90">
              Now spotlighting
            </p>
            <h3 className="mt-3 text-heading-md font-semibold tracking-[-0.045em] text-foreground">
              {activeArtist.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted text-pretty">{activeArtist.bio}</p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                <Users className="mb-2 size-4 text-brand-pink" aria-hidden="true" />
                <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                  {activeArtist.monthlyListeners}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted">monthly</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                <Radio className="mb-2 size-4 text-brand-electric" aria-hidden="true" />
                <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                  {activeArtist.followers}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted">followers</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                <Music2 className="mb-2 size-4 text-brand-lime" aria-hidden="true" />
                <p className="text-lg font-semibold tracking-[-0.03em] text-foreground">
                  {activeArtist.tracks}
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-muted">tracks</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {activeArtist.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-muted"
                >
                  {genre}
                </span>
              ))}
            </div>

            <Magnet className="mt-6" strength={0.1}>
              <Button size="lg" aria-label={`Follow ${activeArtist.name}`}>
                Follow artist
                <ArrowRight
                  className="size-4 transition-transform duration-base group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            </Magnet>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
        >
          <CircularGallery
            items={featuredArtists}
            activeIndex={activeIndex}
            onActiveIndexChange={setActiveIndex}
            getItemLabel={(artist) => artist.name}
            renderItem={renderArtistCard}
          />
        </motion.div>
      </div>
    </section>
  );
}
