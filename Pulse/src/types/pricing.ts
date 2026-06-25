export type BillingInterval = 'monthly' | 'yearly';

export type PricingPlan = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  ctaLabel: string;
  highlighted?: boolean;
};
