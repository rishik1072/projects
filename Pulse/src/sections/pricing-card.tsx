import { Check, Sparkles } from 'lucide-react';
import { memo } from 'react';

import { Magnet, SpotlightCard } from '@/components/react-bits';
import { Button } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { BillingInterval, PricingPlan } from '@/types/pricing';

export type PricingCardProps = {
  plan: PricingPlan;
  interval: BillingInterval;
};

function formatPrice(plan: PricingPlan, interval: BillingInterval) {
  const price = interval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;

  if (price === 0) {
    return '$0';
  }

  return `$${price}`;
}

function PricingCardComponent({ plan, interval }: PricingCardProps) {
  const suffix = interval === 'monthly' ? '/mo' : '/yr';
  const savings = plan.monthlyPrice > 0 ? Math.round((1 - plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100) : 0;

  return (
    <SpotlightCard
      className={cn(
        'group/pricing relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border bg-white/[0.055] p-5 shadow-[0_24px_90px_rgb(0_0_0_/_0.34),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-2xl transition-[border-color,background,box-shadow,transform] duration-slow ease-standard hover:-translate-y-1.5 hover:bg-white/[0.075] hover:shadow-[0_34px_120px_rgb(0_0_0_/_0.45)] sm:p-6',
        plan.highlighted
          ? 'border-brand-violet/45 shadow-[0_30px_120px_rgb(139_92_246_/_0.22),0_24px_90px_rgb(0_0_0_/_0.34),inset_0_1px_0_rgb(255_255_255_/_0.12)]'
          : 'border-white/10 hover:border-white/20',
      )}
      spotlightColor={plan.highlighted ? 'rgba(139,92,246,0.18)' : 'rgba(255,255,255,0.12)'}
    >
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-slow group-hover/pricing:opacity-100" aria-hidden="true">
        <div className="absolute inset-0 rounded-[inherit] bg-pulse-gradient opacity-20 blur-xl" />
      </div>
      {plan.highlighted ? (
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] p-px" aria-hidden="true">
          <div className="absolute inset-0 rounded-[inherit] bg-[conic-gradient(from_180deg_at_50%_50%,rgb(139_92_246_/_0),rgb(139_92_246_/_0.9),rgb(244_114_182_/_0.6),rgb(34_211_238_/_0.7),rgb(139_92_246_/_0))] opacity-60 blur-sm" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute -right-20 -top-20 size-56 rounded-full bg-brand-violet/14 blur-3xl transition-opacity duration-slow group-hover/pricing:opacity-90" aria-hidden="true" />

      <div className="relative z-20 flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.045em] text-foreground">{plan.name}</h3>
            <p className="mt-2 text-sm leading-6 text-muted text-pretty">{plan.description}</p>
          </div>
          {plan.highlighted ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-violet/35 bg-brand-violet/12 px-3 py-1 text-xs font-medium text-brand-electric shadow-[0_0_28px_rgb(139_92_246_/_0.22)]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Pro
            </span>
          ) : null}
        </div>

        <div className="mt-8 flex items-end gap-2">
          <span className="text-5xl font-semibold tracking-[-0.075em] text-foreground">
            {formatPrice(plan, interval)}
          </span>
          <span className="pb-2 text-sm font-medium text-muted">{plan.monthlyPrice === 0 ? 'forever' : suffix}</span>
        </div>

        {interval === 'yearly' && savings > 0 ? (
          <p className="mt-3 text-sm font-medium text-brand-lime">Save {savings}% with yearly billing</p>
        ) : (
          <p className="mt-3 text-sm text-muted">No setup fees. Cancel anytime.</p>
        )}

        <Magnet className="mt-7 w-full" strength={0.09}>
          <Button
            as="a"
            href="#beta"
            size="lg"
            variant={plan.highlighted ? 'primary' : 'glass'}
            className="w-full"
            aria-label={`${plan.ctaLabel} with ${plan.name}`}
          >
            {plan.ctaLabel}
          </Button>
        </Magnet>

        <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-3 text-sm leading-6 text-muted">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-brand-electric">
                <Check className="size-3.5" aria-hidden="true" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  );
}

export const PricingCard = memo(PricingCardComponent);
