import { motion } from 'framer-motion';
import { ArrowRight, Disc3, Github, Instagram, Music2, Youtube } from 'lucide-react';
import { useState, type FormEvent } from 'react';

import { AuroraBackground, Magnet } from '@/components/react-bits';
import { Button, PulseLogo } from '@/components/ui';
import { mainNavigation } from '@/constants/navigation';
import { siteConfig } from '@/constants/site';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/cn';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Trending', href: '#trending' },
      { label: 'Features', href: '#features' },
      { label: 'AI Generator', href: '#ai-playlist-generator' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Creators', href: '#creators' },
      { label: 'Testimonials', href: '#testimonials' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Beta access', href: '#beta' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Cookies', href: '#cookies' },
      { label: 'Licensing', href: '#licensing' },
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', href: '#instagram', icon: Instagram },
  { label: 'YouTube', href: '#youtube', icon: Youtube },
  { label: 'GitHub', href: '#github', icon: Github },
  { label: 'Pulse Radio', href: '#radio', icon: Disc3 },
];

function FooterEqualizer() {
  const prefersReducedMotion = useReducedMotion();
  const bars = [18, 30, 22, 38, 16, 28, 34, 20];

  return (
    <div className="flex h-12 items-end gap-1.5" aria-label="Animated equalizer">
      {bars.map((height, index) => (
        <motion.span
          key={`${height}-${index}`}
          className="w-1.5 rounded-full bg-gradient-to-t from-brand-violet via-brand-pink to-brand-electric shadow-[0_0_16px_rgb(34_211_238_/_0.24)]"
          animate={prefersReducedMotion ? { height: 12, opacity: 0.6 } : { height: [8, height, 12, height * 0.7, 10], opacity: [0.45, 1, 0.62, 0.88, 0.5] }}
          transition={{
            duration: 1.2 + index * 0.08,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.07,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function FloatingParticles() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => {
        const left = `${(index * 17) % 100}%`;
        const top = `${12 + ((index * 23) % 78)}%`;
        const size = index % 3 === 0 ? 'size-1.5' : 'size-1';

        return (
          <motion.span
            key={index}
            className={cn('absolute rounded-full bg-white/30 blur-[0.5px]', size)}
            style={{ left, top }}
            animate={prefersReducedMotion ? { opacity: 0.16 } : { y: [0, -18, 0], opacity: [0.1, 0.48, 0.1], scale: [1, 1.35, 1] }}
            transition={{
              duration: 4.5 + (index % 6) * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: index * 0.18,
            }}
          />
        );
      })}
    </div>
  );
}

export type SiteFooterProps = {
  className?: string;
};

export function SiteFooter({ className }: SiteFooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setStatus('success');
    setEmail('');
  };

  return (
    <footer
      className={cn('relative isolate overflow-hidden bg-background px-4 pb-4 pt-20 sm:px-6 lg:px-8 lg:pt-28', className)}
      aria-labelledby="footer-heading"
    >
      <AuroraBackground intensity="subtle" />
      <FloatingParticles />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_34px_130px_rgb(0_0_0_/_0.5),inset_0_1px_0_rgb(255_255_255_/_0.09)] backdrop-blur-2xl sm:p-6 lg:p-8">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div>
              <PulseLogo href="#top" />
              <h2 id="footer-heading" className="mt-8 max-w-xl text-heading-lg font-semibold tracking-[-0.055em] text-foreground text-balance">
                Stay close to the next era of listening.
              </h2>
              <p className="mt-4 max-w-lg text-body-md text-muted text-pretty">
                Get product updates, beta invites, artist drops, and listening intelligence from Pulse.
              </p>

              <form className="mt-7 max-w-xl" onSubmit={handleSubmit}>
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-2 rounded-[1.35rem] border border-white/10 bg-background/55 p-2 shadow-inset backdrop-blur-xl sm:flex-row sm:items-center">
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setStatus('idle');
                    }}
                    placeholder="you@domain.com"
                    className="h-12 min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm font-medium text-foreground placeholder:text-muted/70 focus:outline-none"
                    autoComplete="email"
                    required
                  />
                  <Magnet strength={0.08} className="sm:shrink-0">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Join newsletter
                      <ArrowRight className="size-4 transition-transform duration-base group-hover/button:translate-x-0.5" aria-hidden="true" />
                    </Button>
                  </Magnet>
                </div>
                <p className="mt-3 min-h-5 text-sm text-muted" aria-live="polite">
                  {status === 'success' ? 'You are on the Pulse list. Welcome in.' : 'No spam. Just meaningful product and music updates.'}
                </p>
              </form>
            </div>

            <div className="grid gap-8 sm:grid-cols-3 lg:gap-6">
              {footerLinks.map((group) => (
                <nav key={group.title} aria-label={group.title}>
                  <h3 className="text-sm font-semibold tracking-[-0.02em] text-foreground">{group.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="text-sm text-muted transition-colors duration-base hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="flex flex-wrap items-center gap-3">
              {mainNavigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-muted transition-[background,color,border-color] duration-base hover:border-white/20 hover:bg-white/[0.08] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex justify-start lg:justify-center">
              <FooterEqualizer />
            </div>

            <div className="flex items-center gap-2 lg:justify-end">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-muted shadow-inset transition-[background,color,border-color,transform] duration-base hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.09] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                    aria-label={item.label}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-2">
            <Music2 className="size-3.5 text-brand-electric" aria-hidden="true" />
            Feel Every Beat. Live Every Moment.
          </p>
        </div>
      </div>
    </footer>
  );
}
