import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle, MessageCircleQuestion, Sparkles } from 'lucide-react';
import { useId, useState } from 'react';

import { BlurText, GradientText } from '@/components/react-bits';
import { faqItems } from '@/constants/faq';
import { cn } from '@/lib/cn';
import type { FAQItem } from '@/types/content';

export type FAQSectionProps = {
  className?: string;
};

type FAQAccordionItemProps = {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
};

function FAQAccordionItem({ item, index, isOpen, onToggle }: FAQAccordionItemProps) {
  const reactId = useId();
  const buttonId = `faq-button-${reactId}`;
  const panelId = `faq-panel-${reactId}`;

  return (
    <motion.div
      className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] shadow-[0_20px_70px_rgb(0_0_0_/_0.3),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl transition-[border-color,background,box-shadow] duration-slow hover:border-white/20 hover:bg-white/[0.075]"
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.97, filter: 'blur(10px)' },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.58, delay: index * 0.045, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          className="group flex w-full items-center justify-between gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-electric sm:p-6"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="flex min-w-0 items-start gap-4">
            <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-brand-electric shadow-inset">
              <HelpCircle className="size-4" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold tracking-[-0.025em] text-foreground sm:text-lg">
              {item.question}
            </span>
          </span>
          <span
            className={cn(
              'grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-muted transition-[transform,color,background] duration-base group-hover:bg-white/[0.1] group-hover:text-foreground',
              isOpen && 'rotate-180 text-brand-electric',
            )}
            aria-hidden="true"
          >
            <ChevronDown className="size-4" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 pb-5 pl-[4.75rem] text-sm leading-7 text-muted text-pretty sm:px-6 sm:pb-6 sm:pl-[5.25rem]">
              {item.answer}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection({ className }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className={cn('relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32', className)}
      aria-labelledby="faq-heading"
    >
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[18%] size-72 rounded-full bg-brand-electric/10 blur-3xl"
        animate={{ opacity: [0.18, 0.42, 0.18], scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] bottom-[20%] size-80 rounded-full bg-brand-violet/14 blur-3xl"
        animate={{ opacity: [0.22, 0.48, 0.22], scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgb(255_255_255_/_0.07),transparent_34rem)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <div className="container relative z-10 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted shadow-inset backdrop-blur-xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <MessageCircleQuestion className="size-3.5 text-brand-electric" aria-hidden="true" />
            FAQ
          </motion.div>

          <h2
            id="faq-heading"
            className="text-heading-xl font-semibold tracking-[-0.055em] text-foreground text-balance"
          >
            <BlurText as="span">Questions before</BlurText>{' '}
            <BlurText as="span" delay={0.12}>
              <GradientText animate>you press play?</GradientText>
            </BlurText>
          </h2>

          <motion.p
            className="mt-5 max-w-xl text-body-lg text-muted text-pretty"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            Everything you need to know about Pulse, the private beta, creator tools, and the premium
            listening experience.
          </motion.p>

          <motion.div
            className="mt-8 hidden rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-inset backdrop-blur-xl lg:block"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles className="mb-4 size-5 text-brand-electric" aria-hidden="true" />
            <p className="text-sm leading-6 text-muted">
              Still curious? Join the beta and help shape what a modern listening platform should feel
              like.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="space-y-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.055 } } }}
        >
          {faqItems.map((item, index) => (
            <FAQAccordionItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
