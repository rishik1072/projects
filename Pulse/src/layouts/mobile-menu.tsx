import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

import { Magnet } from '@/components/react-bits';
import { Button, PulseLogo } from '@/components/ui';
import type { NavigationItem } from '@/types/navigation';

export type MobileMenuProps = {
  id: string;
  isOpen: boolean;
  navigation: NavigationItem[];
  cta: NavigationItem;
  logoHref?: string;
  onClose: () => void;
};

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export function MobileMenu({
  id,
  isOpen,
  navigation,
  cta,
  logoHref = '#top',
  onClose,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) {
        return;
      }

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute('disabled') && element.tabIndex !== -1);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-overlay lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            className="absolute inset-0 cursor-default bg-background/70 backdrop-blur-xl"
            aria-label="Close navigation menu"
            onClick={onClose}
          />

          <motion.div
            ref={panelRef}
            id={id}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="absolute inset-x-3 top-3 overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface/90 shadow-elevated shadow-black/40 backdrop-blur-2xl"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <PulseLogo href={logoHref} onClick={onClose} />
              <button
                ref={closeButtonRef}
                type="button"
                className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-foreground transition-colors duration-base hover:bg-white/[0.1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Close navigation menu"
                onClick={onClose}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <nav className="px-3 py-3" aria-label="Mobile primary navigation">
              <ul className="space-y-1">
                {navigation.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + index * 0.035, duration: 0.26 }}
                  >
                    <a
                      href={item.href}
                      className="flex min-h-12 items-center justify-between rounded-2xl px-4 text-base font-medium tracking-[-0.02em] text-muted transition-colors duration-base hover:bg-white/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noreferrer' : undefined}
                      onClick={onClose}
                    >
                      {item.label}
                      <span className="size-1.5 rounded-full bg-white/20" aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-white/10 p-3">
              <Magnet className="w-full" strength={0.12}>
                <Button as="a" href={cta.href} size="lg" className="w-full justify-between" onClick={onClose}>
                  {cta.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-base group-hover/button:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Button>
              </Magnet>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
