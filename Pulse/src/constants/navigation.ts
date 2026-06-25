import type { NavigationItem } from '@/types/navigation';

export const mainNavigation = [
  { label: 'Discover', href: '#discover' },
  { label: 'Features', href: '#features' },
  { label: 'Creators', href: '#creators' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
] satisfies NavigationItem[];

export const headerCta = {
  label: 'Start listening',
  href: '#beta',
} satisfies NavigationItem;
