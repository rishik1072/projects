import { Star } from 'lucide-react';
import { memo } from 'react';

import { SpotlightCard } from '@/components/react-bits';
import type { Testimonial } from '@/types/content';

export type TestimonialCardProps = {
  testimonial: Testimonial;
};

function TestimonialCardComponent({ testimonial }: TestimonialCardProps) {
  return (
    <SpotlightCard className="group/testimonial relative h-full w-[19rem] shrink-0 rounded-[1.6rem] border border-white/10 bg-white/[0.055] p-5 shadow-[0_24px_80px_rgb(0_0_0_/_0.34),inset_0_1px_0_rgb(255_255_255_/_0.08)] backdrop-blur-xl transition-[border-color,background,box-shadow,transform] duration-slow ease-standard hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.075] hover:shadow-[0_28px_100px_rgb(139_92_246_/_0.16),0_24px_80px_rgb(0_0_0_/_0.38)] sm:w-[22rem]">
      <div className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full bg-brand-violet/16 blur-3xl opacity-70 transition-opacity duration-slow group-hover/testimonial:opacity-100" aria-hidden="true" />
      <div className="relative z-20 flex h-full flex-col justify-between gap-8">
        <div>
          <div className="mb-5 flex gap-1" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => {
              const isFilled = index < testimonial.rating;

              return (
                <Star
                  key={index}
                  className={isFilled ? 'size-4 fill-brand-orange text-brand-orange' : 'size-4 text-white/20'}
                  aria-hidden="true"
                />
              );
            })}
          </div>
          <blockquote className="text-base leading-7 text-foreground/90 text-pretty">
            “{testimonial.quote}”
          </blockquote>
        </div>

        <div className="flex items-center gap-3 border-t border-white/10 pt-4">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt=""
              className="size-11 rounded-full border border-white/10 object-cover shadow-[0_0_30px_rgb(255_255_255_/_0.08)]"
              loading="lazy"
              decoding="async"
              width="256"
              height="256"
              draggable="false"
              sizes="44px"
            />
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-[-0.02em] text-foreground">
              {testimonial.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export const TestimonialCard = memo(TestimonialCardComponent);
