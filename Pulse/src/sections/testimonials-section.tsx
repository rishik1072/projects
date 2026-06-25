import { motion } from 'framer-motion';

import { BlurText, GradientText } from '@/components/react-bits';
import { testimonials } from '@/constants/testimonials';
import { cn } from '@/lib/cn';

import { TestimonialCard } from './testimonial-card';

export type TestimonialsSectionProps = {
  className?: string;
};

function TestimonialMarquee({ reverse = false }: { reverse?: boolean }) {
  const rowTestimonials = reverse ? [...testimonials].reverse() : testimonials;
  const doubled = [...rowTestimonials, ...rowTestimonials];

  return (
    <div className="group/marquee relative flex overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_9%,black_91%,transparent)]">
      <div
        className={cn(
          'motion-gpu flex w-max gap-4 motion-safe:[animation-duration:46s] motion-safe:[animation-iteration-count:infinite] motion-safe:[animation-timing-function:linear] group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] sm:gap-5',
          reverse
            ? 'motion-safe:[animation-name:testimonial-marquee-reverse]'
            : 'motion-safe:[animation-name:testimonial-marquee]',
        )}
      >
        {doubled.map((testimonial, index) => (
          <div key={`${testimonial.name}-${index}`} aria-hidden={index >= rowTestimonials.length}>
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection({ className }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      className={cn('relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32', className)}
      aria-labelledby="testimonials-heading"
    >
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[14%] size-72 rounded-full bg-brand-violet/14 blur-3xl"
        animate={{ opacity: [0.2, 0.48, 0.2], scale: [1, 1.14, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute right-[8%] bottom-[18%] size-80 rounded-full bg-brand-electric/10 blur-3xl"
        animate={{ opacity: [0.18, 0.42, 0.18], scale: [1, 1.16, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgb(255_255_255_/_0.07),transparent_34rem)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-brand-electric/90"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Loved by listeners
          </motion.p>

          <h2
            id="testimonials-heading"
            className="text-heading-xl font-semibold tracking-[-0.055em] text-foreground text-balance"
          >
            <BlurText as="span">A listening experience</BlurText>{' '}
            <BlurText as="span" delay={0.12}>
              <GradientText animate>people remember.</GradientText>
            </BlurText>
          </h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-body-lg text-muted text-pretty"
            initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            From artists to curators to everyday listeners, Pulse turns discovery into something more
            personal, cinematic, and alive.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="relative z-10 mt-12 space-y-2 lg:mt-16"
        initial={{ opacity: 0, y: 30, filter: 'blur(14px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
      >
        <TestimonialMarquee />
        <TestimonialMarquee reverse />
      </motion.div>
    </section>
  );
}
