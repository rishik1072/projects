import { motion } from 'framer-motion';
import { ArrowRight, Menu } from 'lucide-react';
import { useId, useRef, useState } from 'react';

import { Magnet } from '@/components/react-bits';
import { Button, PulseLogo } from '@/components/ui';
import { headerCta, mainNavigation } from '@/constants/navigation';
import { useScrollState } from '@/hooks/use-scroll-state';
import { cn } from '@/lib/cn';
import type { NavigationItem } from '@/types/navigation';

import { MobileMenu } from './mobile-menu';

export type SiteHeaderProps = {
  navigation?: NavigationItem[];
  cta?: NavigationItem;
  logoHref?: string;
  className?: string;
};

export function SiteHeader({
  navigation = mainNavigation,
  cta = headerCta,
  logoHref = '#top',
  className,
}: SiteHeaderProps) {
  const menuId = useId();
  const isScrolled = useScrollState(12);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    window.setTimeout(() => menuButtonRef.current?.focus(), 0);
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-header px-3 pt-3 transition-[filter] duration-base ease-standard sm:px-4',
          className,
        )}
      >
        <motion.div
          className={cn(
            'mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[1.35rem] border px-3 transition-[background,border-color,box-shadow,backdrop-filter] duration-slow ease-standard sm:px-4',
            isScrolled
              ? 'border-white/[0.12] bg-background/72 shadow-[0_18px_60px_rgb(0_0_0_/_0.34),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-2xl'
              : 'border-white/[0.08] bg-white/[0.035] shadow-[0_10px_36px_rgb(0_0_0_/_0.12),inset_0_1px_0_rgb(255_255_255_/_0.06)] backdrop-blur-xl',
          )}
          initial={{ y: -18, opacity: 0, scale: 0.985 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex min-w-0 flex-1 items-center">
            <PulseLogo href={logoHref} />
          </div>

          <nav className="hidden items-center lg:flex" aria-label="Primary navigation">
            <ul
              className="flex rounded-full border border-white/[0.08] bg-white/[0.035] p-1 shadow-inset"
              onMouseLeave={() => setActiveIndex(null)}
            >
              {navigation.map((item, index) => (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className="relative z-10 flex h-9 items-center rounded-full px-4 text-sm font-medium tracking-[-0.01em] text-muted transition-colors duration-base hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noreferrer' : undefined}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onBlur={() => setActiveIndex(null)}
                  >
                    {item.label}
                  </a>

                  {activeIndex === index && (
                    <motion.span
                      className="absolute inset-0 rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.08)]"
                      layoutId="site-header-nav-pill"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      aria-hidden="true"
                    />
                  )}

                  <span
                    className={cn(
                      'pointer-events-none absolute inset-x-4 bottom-1 h-px origin-center rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-base ease-standard',
                      activeIndex === index ? 'scale-x-100' : 'scale-x-0',
                    )}
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2">
            <Magnet className="hidden lg:inline-flex" strength={0.14}>
              <Button as="a" href={cta.href} size="md" className="pl-4 pr-3">
                {cta.label}
                <ArrowRight
                  className="size-4 transition-transform duration-base group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            </Magnet>

            <button
              ref={menuButtonRef}
              type="button"
              className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-foreground shadow-inset transition-[background,border-color,transform] duration-base ease-standard hover:border-white/20 hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-y-0.5 lg:hidden"
              aria-label="Open navigation menu"
              aria-controls={menuId}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </header>

      <MobileMenu
        id={menuId}
        isOpen={isMenuOpen}
        navigation={navigation}
        cta={cta}
        logoHref={logoHref}
        onClose={closeMenu}
      />
    </>
  );
}
