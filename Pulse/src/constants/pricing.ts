import type { PricingPlan } from '@/types/pricing';

export const pricingPlans = [
  {
    name: 'Free',
    description: 'For casual discovery and everyday listening.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      'Ad-supported streaming',
      'Basic mood stations',
      'Limited skips',
      'Standard audio quality',
      'Community playlists',
    ],
    ctaLabel: 'Start free',
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'For listeners who want adaptive, cinematic sessions.',
    monthlyPrice: 12,
    yearlyPrice: 96,
    features: [
      'Unlimited AI playlist generation',
      'Offline downloads',
      'Dolby quality streaming',
      'Spatial audio soundscapes',
      'Cross-device sync',
      'Live lyrics and translations',
    ],
    ctaLabel: 'Start listening',
    highlighted: true,
  },
  {
    name: 'Studio',
    description: 'For artists, curators, teams, and shared sessions.',
    monthlyPrice: 24,
    yearlyPrice: 216,
    features: [
      'Everything in Pro',
      'Creator profile insights',
      'Collaborative sessions',
      'Private listening rooms',
      'Early release drops',
      'Priority creator support',
    ],
    ctaLabel: 'Join Studio',
    highlighted: false,
  },
] satisfies PricingPlan[];

export const pricingComparison = [
  {
    feature: 'AI playlist generation',
    free: 'Limited',
    pro: 'Unlimited',
    studio: 'Unlimited',
  },
  {
    feature: 'Offline downloads',
    free: false,
    pro: true,
    studio: true,
  },
  {
    feature: 'Dolby quality',
    free: false,
    pro: true,
    studio: true,
  },
  {
    feature: 'Collaborative sessions',
    free: false,
    pro: 'Basic',
    studio: 'Advanced',
  },
  {
    feature: 'Creator analytics',
    free: false,
    pro: false,
    studio: true,
  },
] as const;
