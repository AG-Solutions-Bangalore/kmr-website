import { useRef } from 'react';
import { BadgeCheck, Quote, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePageTestimonialSlug, useTestimonials } from '../hook/useTestimonials';
import type { Testimonial } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialSectionProps {
  /** CRM slug to fetch. Defaults to the slug derived from the current route. */
  slug?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-warning-500 text-warning-500' : 'fill-gray-200 text-gray-200'}`}
        />
      ))}
    </div>
  );
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.image) {
    return (
      <img
        src={testimonial.image}
        alt={testimonial.name}
        loading="lazy"
        className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-primary-100"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    );
  }
  const initials = testimonial.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-600 text-[15px] font-extrabold text-white">
      {initials || 'K'}
    </span>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="relative flex w-[85vw] max-w-[420px] shrink-0 flex-col rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-[0_12px_30px_rgb(0,0,0,0.08)] sm:p-6">
      <span className="absolute right-5 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white">
        <Quote className="h-5 w-5" fill="currentColor" />
      </span>
      <div className="flex flex-col pt-7">
        <Stars rating={testimonial.rating} />
        <blockquote className="mt-3 line-clamp-3 text-[14px] font-medium leading-[1.7] text-navy-800 sm:text-[15px]">
          &ldquo;{testimonial.message}&rdquo;
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
          <Avatar testimonial={testimonial} />
          <div className="min-w-0 text-left">
            <p className="flex items-center gap-1.5 truncate text-[14px] font-extrabold text-navy-900">
              <span className="truncate">{testimonial.name}</span>
              <BadgeCheck
                className="h-4 w-4 shrink-0 text-success-600"
                aria-label="Verified customer"
              />
            </p>
            {testimonial.role && (
              <p className="truncate text-[12px] font-medium text-muted-500">
                {testimonial.role}
              </p>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

/**
 * Global testimonial section — mount once (e.g. in MainLayout) and it shows
 * on every page. Infinite right-to-left marquee with edge fade overlays.
 * Renders NOTHING while loading, on error, or when the API returns no rows
 * for the current page slug.
 */
export function TestimonialSection({
  slug,
  eyebrow = 'Testimonials',
  title = 'Loved by traders across India',
  subtitle = 'Real feedback from businesses that start their day with KMR LIVE market insights.',
}: TestimonialSectionProps) {
  const pageSlug = usePageTestimonialSlug();
  const activeSlug = slug ?? pageSlug;
  const { data } = useTestimonials(activeSlug);

  const testimonials = data ?? [];
  const sectionRef = useRef<HTMLElement>(null);

  const hasData = testimonials.length > 0;
  const isMarquee = testimonials.length > 1;
  // Two identical halves → seamless -50% loop. Speed scales with card count.
  const loop = isMarquee ? [...testimonials, ...testimonials] : testimonials;

  useGSAP(
    () => {
      if (!sectionRef.current || !hasData) return;
      gsap.fromTo(
        '.testimonial-element',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [hasData, activeSlug] },
  );

  // No data (loading / error / empty) → render nothing.
  if (!hasData) return null;

  return (
    <section ref={sectionRef} className="relative w-full overflow-hidden bg-mist-50 py-12 sm:py-16">
      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <div className="testimonial-element mb-3 flex items-center justify-center gap-2 rounded-full border border-success-600/30 bg-success-600/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-success-700 w-fit mx-auto">
            <span className="h-1.5 w-1.5 rounded-full bg-success-600" />
            {eyebrow}
          </div>
          <h2 className="testimonial-element text-3xl font-extrabold tracking-tight text-navy-900 sm:text-[36px]">
            {title}
          </h2>
          <p className="testimonial-element mx-auto mt-3 max-w-xl text-[14px] font-medium leading-[1.6] text-muted-500 sm:text-[15px]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="testimonial-element group relative mt-6 sm:mt-8">
        {/* py gives the quote badge + card shadow room so nothing clips top/bottom */}
        <div className="overflow-x-clip py-6">
          <div
            className={isMarquee ? 'testimonial-marquee flex w-max gap-5 pr-5 sm:gap-6 sm:pr-6' : 'mx-auto flex w-max max-w-full gap-5 px-4 sm:gap-6'}
            style={
              isMarquee
                ? { animationDuration: `${Math.max(25, testimonials.length * 9)}s` }
                : undefined
            }
          >
            {loop.map((item, i) => (
              <TestimonialCard
                key={`${item.id}-${i}`}
                testimonial={item}
              />
            ))}
          </div>
        </div>

        {/* Left + right fade overlays — cards slide underneath */}
        {isMarquee && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-mist-50 to-transparent sm:w-28"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-mist-50 to-transparent sm:w-28"
            />
          </>
        )}
      </div>
    </section>
  );
}

export default TestimonialSection;
