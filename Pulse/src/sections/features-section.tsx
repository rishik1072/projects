import { motion } from 'framer-motion';

import { BlurText, GradientText, MagicBento, MagicBentoItem } from '@/components/react-bits';
import { FeatureCard } from '@/components/ui';
import { pulseFeatures } from '@/constants/features';
import { cn } from '@/lib/cn';

export type FeaturesSectionProps = {
  className?: string;
};

const featuredIndexes = new Set([0, 5]);

export function FeaturesSection({ className }: FeaturesSectionProps) {
  return (
    <section
      id="features"
      className={cn('relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32', className)}
      aria-labelledby="features-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_12%,rgb(139_92_246_/_0.16),transparent_30rem),radial-gradient(circle_at_78%_42%,rgb(34_211_238_/_0.1),transparent_34rem),radial-gradient(circle_at_52%_90%,rgb(244_114_182_/_0.08),transparent_30rem)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255_/_0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255_/_0.03)_1px,transparent_1px)] bg-[size:84px_84px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-brand-electric/90"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Product intelligence
          </motion.p>

          <h2
            id="features-heading"
            className="text-heading-xl font-semibold tracking-[-0.055em] text-foreground text-balance"
          >
            <BlurText as="span">Everything sounds</BlurText>{' '}
            <BlurText as="span" delay={0.12}>
              <GradientText animate>more alive.</GradientText>
            </BlurText>
          </h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-body-lg text-muted text-pretty"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            Pulse combines adaptive intelligence, premium audio, and shared listening tools into a
            streaming experience that feels designed around your actual life.
          </motion.p>
        </div>

        <MagicBento className="mt-12 lg:mt-16">
          {pulseFeatures.map((feature, index) => (
            <MagicBentoItem key={feature.title} featured={featuredIndexes.has(index)}>
              {feature.icon ? (
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  accent={feature.accent}
                  featured={featuredIndexes.has(index)}
                />
              ) : null}
            </MagicBentoItem>
          ))}
        </MagicBento>
      </div>
    </section>
  );
}
