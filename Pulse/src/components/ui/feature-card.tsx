import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { memo } from 'react';

import { SpotlightCard } from '@/components/react-bits';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

export type FeatureAccent = string;

export type FeatureCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: FeatureAccent;
  featured?: boolean;
  className?: string;
};

const accentStyles: Record<string, { icon: string; glow: string; orb: string; line: string }> = {
  violet: {
    icon: 'text-brand-violet',
    glow: 'shadow-[0_0_34px_rgb(139_92_246_/_0.24)]',
    orb: 'bg-brand-violet/22',
    line: 'from-brand-violet/0 via-brand-violet/70 to-brand-violet/0',
  },
  electric: {
    icon: 'text-brand-electric',
    glow: 'shadow-[0_0_34px_rgb(34_211_238_/_0.22)]',
    orb: 'bg-brand-electric/20',
    line: 'from-brand-electric/0 via-brand-electric/70 to-brand-electric/0',
  },
  pink: {
    icon: 'text-brand-pink',
    glow: 'shadow-[0_0_34px_rgb(244_114_182_/_0.22)]',
    orb: 'bg-brand-pink/20',
    line: 'from-brand-pink/0 via-brand-pink/70 to-brand-pink/0',
  },
  lime: {
    icon: 'text-brand-lime',
    glow: 'shadow-[0_0_34px_rgb(163_230_53_/_0.18)]',
    orb: 'bg-brand-lime/16',
    line: 'from-brand-lime/0 via-brand-lime/70 to-brand-lime/0',
  },
  orange: {
    icon: 'text-brand-orange',
    glow: 'shadow-[0_0_34px_rgb(251_146_60_/_0.2)]',
    orb: 'bg-brand-orange/18',
    line: 'from-brand-orange/0 via-brand-orange/70 to-brand-orange/0',
  },
};

function FeatureCardComponent({
  title,
  description,
  icon: Icon,
  accent = 'violet',
  featured = false,
  className,
}: FeatureCardProps) {
  const styles = accentStyles[accent] ?? accentStyles.violet;
  const prefersReducedMotion = useReducedMotion();

  return (
    <SpotlightCard
      className={cn(
        'group/feature relative flex h-full min-h-[17rem] flex-col justify-between rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_80px_rgb(0_0_0_/_0.32),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl transition-[background,border-color,box-shadow,transform] duration-slow ease-standard hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.075] hover:shadow-[0_30px_110px_rgb(0_0_0_/_0.42)] sm:p-6',
        featured && 'lg:min-h-[18rem]',
        className,
      )}
      spotlightColor="rgba(255,255,255,0.13)"
    >
      <div className={cn('pointer-events-none absolute -right-14 -top-14 size-44 rounded-full blur-3xl transition-opacity duration-slow group-hover/feature:opacity-80', styles.orb)} aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_50%_0%,rgb(255_255_255_/_0.08),transparent_44%)]" aria-hidden="true" />
      <div className={cn('pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r opacity-70 transition-opacity duration-base group-hover/feature:opacity-100', styles.line)} aria-hidden="true" />

      <div className="relative z-20">
        <motion.div
          className={cn(
            'mb-7 grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-inset backdrop-blur-xl transition-transform duration-base group-hover/feature:scale-105',
            styles.glow,
          )}
          whileHover={prefersReducedMotion ? undefined : { rotate: [0, -5, 5, 0], scale: 1.06 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -2, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon className={cn('size-5', styles.icon)} strokeWidth={1.8} />
          </motion.div>
        </motion.div>

        <h3 className="text-heading-md font-semibold tracking-[-0.04em] text-foreground text-balance">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted text-pretty sm:text-[0.95rem]">
          {description}
        </p>
      </div>

      <div className="relative z-20 mt-8 flex items-center gap-2" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
        <span className={cn('h-px flex-1 bg-gradient-to-r', styles.line)} />
      </div>
    </SpotlightCard>
  );
}

export const FeatureCard = memo(FeatureCardComponent);
