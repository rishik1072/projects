import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { useState } from 'react';

import { BlurText, GradientText } from '@/components/react-bits';
import { pricingComparison, pricingPlans } from '@/constants/pricing';
import { cn } from '@/lib/cn';
import type { BillingInterval } from '@/types/pricing';

import { PricingCard } from './pricing-card';

export type PricingSectionProps = {
  className?: string;
};

function ComparisonValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-grid size-7 place-items-center rounded-full border border-brand-lime/25 bg-brand-lime/10 text-brand-lime">
        <Check className="size-4" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="inline-grid size-7 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-muted">
        <Minus className="size-4" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }

  return <span className="text-sm font-medium text-foreground/88">{value}</span>;
}

export function PricingSection({ className }: PricingSectionProps) {
  const [interval, setInterval] = useState<BillingInterval>('monthly');

  return (
    <section
      id="pricing"
      className={cn('relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32', className)}
      aria-labelledby="pricing-heading"
    >
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[16%] size-80 rounded-full bg-brand-violet/14 blur-3xl"
        animate={{ opacity: [0.22, 0.5, 0.22], scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[10%] top-[28%] size-72 rounded-full bg-brand-electric/10 blur-3xl"
        animate={{ opacity: [0.18, 0.42, 0.18], scale: [1, 1.16, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgb(255_255_255_/_0.07),transparent_34rem),linear-gradient(to_bottom,transparent,rgb(var(--color-background))_92%)]" aria-hidden="true" />
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
            Simple pricing
          </motion.p>

          <h2
            id="pricing-heading"
            className="text-heading-xl font-semibold tracking-[-0.055em] text-foreground text-balance"
          >
            <BlurText as="span">Choose how deeply</BlurText>{' '}
            <BlurText as="span" delay={0.12}>
              <GradientText animate>you want to listen.</GradientText>
            </BlurText>
          </h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-body-lg text-muted text-pretty"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            Start free, upgrade for premium sound and adaptive intelligence, or unlock creator-first
            listening tools with Studio.
          </motion.p>

          <motion.div
            className="mx-auto mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.055] p-1 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            role="group"
            aria-label="Billing interval"
          >
            {(['monthly', 'yearly'] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={cn(
                  'relative h-10 rounded-full px-5 text-sm font-medium capitalize transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric',
                  interval === value ? 'text-background' : 'text-muted hover:text-foreground',
                )}
                aria-pressed={interval === value}
                onClick={() => setInterval(value)}
              >
                {interval === value ? (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white shadow-[0_12px_34px_rgb(255_255_255_/_0.14)]"
                    layoutId="pricing-toggle-pill"
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden="true"
                  />
                ) : null}
                <span className="relative z-10">
                  {value}
                  {value === 'yearly' ? <span className="ml-1 text-[0.68rem] opacity-70">-20%</span> : null}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
          }}
        >
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 28, scale: 0.96, filter: 'blur(12px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <PricingCard plan={plan} interval={interval} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 overflow-x-auto rounded-[1.75rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_rgb(0_0_0_/_0.32),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-2xl lg:mt-10"
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.72, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <table className="w-full min-w-[42rem] border-collapse text-sm" aria-label="Pricing feature comparison">
            <caption className="sr-only">Compare Pulse Free, Pro, and Studio plan features</caption>
            <thead className="border-b border-white/10 bg-white/[0.035] text-foreground">
              <tr>
                <th scope="col" className="px-4 py-4 text-left font-semibold sm:px-6">
                  Feature comparison
                </th>
                <th scope="col" className="px-4 py-4 text-center font-semibold">
                  Free
                </th>
                <th scope="col" className="px-4 py-4 text-center font-semibold text-brand-electric">
                  Pro
                </th>
                <th scope="col" className="px-4 py-4 text-center font-semibold">
                  Studio
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {pricingComparison.map((row) => (
                <tr key={row.feature} className="text-muted transition-colors duration-base hover:bg-white/[0.035]">
                  <th scope="row" className="px-4 py-4 text-left font-medium text-foreground/88 sm:px-6">
                    {row.feature}
                  </th>
                  <td className="px-4 py-4 text-center"><ComparisonValue value={row.free} /></td>
                  <td className="px-4 py-4 text-center"><ComparisonValue value={row.pro} /></td>
                  <td className="px-4 py-4 text-center"><ComparisonValue value={row.studio} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
