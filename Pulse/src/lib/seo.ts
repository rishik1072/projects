import { siteConfig } from '@/constants/site';

export type SeoMeta = {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
};

export function createTitle(title?: string) {
  return title ? `${title} — ${siteConfig.name}` : siteConfig.title;
}

export function createSeoMeta(meta: SeoMeta = {}) {
  return {
    title: createTitle(meta.title),
    description: meta.description ?? siteConfig.description,
    image: meta.image ?? siteConfig.ogImage,
    canonical: meta.canonical ?? siteConfig.url,
  };
}
