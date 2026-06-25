import { Suspense, type ReactNode } from 'react';

import { ErrorBoundary } from './error-boundary';

type SectionLoaderProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function SectionSkeleton() {
  return (
    <div className="container py-20" aria-hidden="true">
      <div className="h-48 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-inset" />
    </div>
  );
}

export function SectionErrorFallback() {
  return (
    <section className="container py-20" role="status" aria-live="polite">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 text-sm text-muted shadow-inset backdrop-blur-xl">
        This section could not be loaded. Please refresh the page.
      </div>
    </section>
  );
}

export function SectionLoader({ children, fallback = <SectionSkeleton /> }: SectionLoaderProps) {
  return (
    <ErrorBoundary fallback={<SectionErrorFallback />}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
