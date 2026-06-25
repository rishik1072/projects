import { lazy } from 'react';

import { SiteHeader } from '@/layouts';
import { HeroSection } from '@/sections/hero-section';

import { LoadingScreen } from './loading-screen';
import { PageTransition } from './page-transition';
import { Providers } from './providers';
import { SectionLoader } from './section-loader';

const TrendingAlbumsSection = lazy(() =>
  import('@/sections/trending-albums-section').then((module) => ({
    default: module.TrendingAlbumsSection,
  })),
);
const FeaturesSection = lazy(() =>
  import('@/sections/features-section').then((module) => ({ default: module.FeaturesSection })),
);
const AiPlaylistGeneratorSection = lazy(() =>
  import('@/sections/ai-playlist-generator-section').then((module) => ({
    default: module.AiPlaylistGeneratorSection,
  })),
);
const ArtistShowcaseSection = lazy(() =>
  import('@/sections/artist-showcase-section').then((module) => ({
    default: module.ArtistShowcaseSection,
  })),
);
const TestimonialsSection = lazy(() =>
  import('@/sections/testimonials-section').then((module) => ({ default: module.TestimonialsSection })),
);
const PricingSection = lazy(() =>
  import('@/sections/pricing-section').then((module) => ({ default: module.PricingSection })),
);
const FAQSection = lazy(() =>
  import('@/sections/faq-section').then((module) => ({ default: module.FAQSection })),
);
const SiteFooter = lazy(() =>
  import('@/layouts/site-footer').then((module) => ({ default: module.SiteFooter })),
);

export function App() {
  return (
    <Providers>
      <PageTransition>
        <div id="top" className="min-h-svh bg-background text-foreground dark">
          <a
            href="#main-content"
            className="sr-only z-modal rounded-full bg-white px-4 py-2 text-sm font-medium text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            <HeroSection />
            <SectionLoader fallback={<LoadingScreen />}>
              <TrendingAlbumsSection />
            </SectionLoader>
            <SectionLoader>
              <FeaturesSection />
            </SectionLoader>
            <SectionLoader>
              <AiPlaylistGeneratorSection />
            </SectionLoader>
            <SectionLoader>
              <ArtistShowcaseSection />
            </SectionLoader>
            <SectionLoader>
              <TestimonialsSection />
            </SectionLoader>
            <SectionLoader>
              <PricingSection />
            </SectionLoader>
            <SectionLoader>
              <FAQSection />
            </SectionLoader>
            <div id="beta" aria-hidden="true" />
          </main>
          <SectionLoader fallback={null}>
            <SiteFooter />
          </SectionLoader>
        </div>
      </PageTransition>
    </Providers>
  );
}
