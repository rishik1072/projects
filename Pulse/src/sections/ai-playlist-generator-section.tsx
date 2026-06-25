import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Loader2, Search, Sparkles, Wand2 } from 'lucide-react';
import { useMemo, useRef, useState, type FormEvent } from 'react';

import { BlurText, GradientText, Magnet } from '@/components/react-bits';
import { Button } from '@/components/ui';
import { generatedPlaylists, playlistPromptExamples } from '@/constants/playlist-generator';
import { cn } from '@/lib/cn';

import { PlaylistResultCard } from './playlist-result-card';

export type AiPlaylistGeneratorSectionProps = {
  className?: string;
};

type GeneratorState = 'idle' | 'loading' | 'complete';

export function AiPlaylistGeneratorSection({ className }: AiPlaylistGeneratorSectionProps) {
  const [prompt, setPrompt] = useState('');
  const [submittedPrompt, setSubmittedPrompt] = useState('');
  const [state, setState] = useState<GeneratorState>('idle');
  const timeoutRef = useRef<number | null>(null);

  const canSubmit = prompt.trim().length > 0 && state !== 'loading';
  const helperText = useMemo(() => {
    if (state === 'loading') return 'Analyzing mood, tempo, energy, and listening context...';
    if (state === 'complete') return `Generated for “${submittedPrompt}”`;
    return 'Try a mood, activity, weather, place, or time of day.';
  }, [state, submittedPrompt]);

  const generatePlaylist = (nextPrompt: string) => {
    const normalizedPrompt = nextPrompt.trim();

    if (!normalizedPrompt) {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setSubmittedPrompt(normalizedPrompt);
    setState('loading');

    timeoutRef.current = window.setTimeout(() => {
      setState('complete');
    }, 1400);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generatePlaylist(prompt);
  };

  return (
    <section
      id="ai-playlist-generator"
      className={cn('relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32', className)}
      aria-labelledby="ai-playlist-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(244_114_182_/_0.14),transparent_30rem),radial-gradient(circle_at_82%_30%,rgb(34_211_238_/_0.12),transparent_34rem),radial-gradient(circle_at_52%_86%,rgb(139_92_246_/_0.14),transparent_34rem)]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-16 h-px w-[min(72rem,86vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted shadow-inset backdrop-blur-xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles className="size-3.5 text-brand-electric" aria-hidden="true" />
            Frontend AI simulation
          </motion.div>

          <h2
            id="ai-playlist-heading"
            className="text-heading-xl font-semibold tracking-[-0.055em] text-foreground text-balance"
          >
            <BlurText as="span">Describe the moment.</BlurText>{' '}
            <BlurText as="span" delay={0.12}>
              <GradientText animate>Pulse builds the soundtrack.</GradientText>
            </BlurText>
          </h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-body-lg text-muted text-pretty"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            A premium AI playlist generator mockup that turns mood, context, and energy into curated
            listening directions.
          </motion.p>
        </div>

        <motion.div
          className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.055] p-3 shadow-[0_30px_110px_rgb(0_0_0_/_0.4),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-2xl sm:p-4"
          initial={{ opacity: 0, y: 28, scale: 0.97, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <form
            className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-background/55 p-2 shadow-inset"
            onSubmit={handleSubmit}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgb(139_92_246_/_0.18),transparent_36%),radial-gradient(circle_at_88%_100%,rgb(34_211_238_/_0.12),transparent_32%)]" />
            <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="sr-only" htmlFor="playlist-prompt">
                Describe your mood
              </label>
              <div className="flex min-h-14 flex-1 items-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/[0.055] px-4 backdrop-blur-xl focus-within:border-brand-electric/50 focus-within:ring-2 focus-within:ring-brand-electric/20">
                <Search className="size-5 shrink-0 text-muted" aria-hidden="true" />
                <input
                  id="playlist-prompt"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Describe your mood..."
                  className="h-14 min-w-0 flex-1 bg-transparent text-base font-medium text-foreground placeholder:text-muted/70 focus:outline-none"
                  disabled={state === 'loading'}
                  autoComplete="off"
                />
              </div>

              <Magnet strength={0.1} className="sm:shrink-0">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={!canSubmit}
                  aria-label="Generate AI playlist"
                >
                  {state === 'loading' ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Wand2 className="size-4" aria-hidden="true" />
                  )}
                  Generate
                </Button>
              </Magnet>
            </div>
          </form>

          <div className="mt-4 flex flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted" aria-live="polite">
              {helperText}
            </p>
            <div className="flex flex-wrap gap-2">
              {playlistPromptExamples.map((example) => (
                <button
                  key={example}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-medium text-muted transition-[background,color,border-color,transform] duration-base hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.09] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                  onClick={() => {
                    setPrompt(example);
                    generatePlaylist(example);
                  }}
                  disabled={state === 'loading'}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mx-auto mt-10 max-w-6xl" aria-live="polite">
          <AnimatePresence mode="wait">
            {state === 'loading' && (
              <motion.div
                key="loading"
                className="mx-auto grid max-w-3xl gap-3 rounded-[1.75rem] border border-white/10 bg-white/[0.045] p-4 shadow-card backdrop-blur-xl"
                initial={{ opacity: 0, y: 18, scale: 0.96, filter: 'blur(14px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, scale: 0.97, filter: 'blur(10px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                role="status"
              >
                {['Reading emotional tempo', 'Mapping genre adjacency', 'Sequencing energy arc'].map(
                  (label, index) => (
                    <div key={label} className="flex items-center gap-3 rounded-2xl bg-white/[0.045] p-3">
                      <motion.span
                        className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-brand-electric"
                        animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 1.1, delay: index * 0.16, repeat: Infinity }}
                        aria-hidden="true"
                      >
                        <Sparkles className="size-4" />
                      </motion.span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-pulse-gradient"
                            initial={{ x: '-100%' }}
                            animate={{ x: '100%' }}
                            transition={{ duration: 1.1, delay: index * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </motion.div>
            )}

            {state === 'complete' && (
              <motion.div
                key="results"
                className="grid gap-4 md:grid-cols-3"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, filter: 'blur(10px)' }}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              >
                {generatedPlaylists.map((playlist, index) => (
                  <PlaylistResultCard key={playlist.id} playlist={playlist} index={index} />
                ))}
              </motion.div>
            )}

            {state === 'idle' && (
              <motion.div
                key="idle"
                className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-[1.75rem] border border-dashed border-white/12 bg-white/[0.035] p-5 text-left text-muted backdrop-blur-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45 }}
              >
                <div>
                  <p className="font-medium text-foreground">Your generated playlists will appear here.</p>
                  <p className="mt-1 text-sm">Start with a phrase like “Rainy Evening” or “Coding Focus”.</p>
                </div>
                <ArrowRight className="hidden size-5 shrink-0 text-brand-electric sm:block" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
