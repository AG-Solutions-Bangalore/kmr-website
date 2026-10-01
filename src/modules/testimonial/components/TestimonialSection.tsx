import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
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
    <div className="flex items-center justify-center gap-1" aria-label={`${rating} out of 5 stars`}>
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
        className="h-12 w-12 rounded-full object-cover ring-2 ring-primary-100"
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
    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-[15px] font-extrabold text-white">
      {initials || 'K'}
    </span>
  );
}

/**
 * Global testimonial section — mount once (e.g. in MainLayout) and it shows
 * on every page. Renders NOTHING while loading, on error, or when the API
 * returns no rows for the current page slug.
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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const hasData = testimonials.length > 0;
  // Derived during render — stays in range even when the slug data changes.
  const safeIndex = hasData ? index % testimonials.length : 0;
  const active = hasData ? testimonials[safeIndex] : undefined;

  // Autoplay — pauses on hover.
  useEffect(() => {
    if (!hasData || paused || testimonials.length < 2) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [hasData, paused, testimonials.length]);

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
  if (!active) return null;

  const goTo = (next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  };

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

        <div
          className="testimonial-element relative mx-auto mt-8 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_20px_50px_rgb(0,0,0,0.08)] sm:rounded-3xl sm:p-10">
            <span className="absolute -top-1 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg sm:left-10">
              <Quote className="h-5 w-5" fill="currentColor" />
            </span>

            <div key={active.id} className="flex flex-col items-center pt-6 text-center">
              <Stars rating={active.rating} />
              <blockquote className="mt-4 text-[15px] font-medium leading-[1.7] text-navy-800 sm:text-[17px]">
                &ldquo;{active.message}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <Avatar testimonial={active} />
                <div className="text-left">
                  <p className="text-[14px] font-extrabold text-navy-900">{active.name}</p>
                  {active.role && (
                    <p className="text-[12px] font-medium text-muted-500">{active.role}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {testimonials.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => goTo(safeIndex - 1)}
                className="absolute top-1/2 -left-2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-navy-800 shadow-md transition-all hover:border-primary-600 hover:text-primary-600 sm:flex lg:-left-14"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => goTo(safeIndex + 1)}
                className="absolute top-1/2 -right-2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-navy-800 shadow-md transition-all hover:border-primary-600 hover:text-primary-600 sm:flex lg:-right-14"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="mt-5 flex items-center justify-center gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === safeIndex
                        ? 'w-7 bg-primary-600'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Mobile arrows */}
              <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => goTo(safeIndex - 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-navy-800 shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => goTo(safeIndex + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-navy-800 shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
