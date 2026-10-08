import { useLocation } from 'react-router';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getTestimonials } from '../api/testimonial.api';
import type { Testimonial } from '../types';

export const testimonialKeys = {
  all: ['testimonials'] as const,
  bySlug: (slug: string) => [...testimonialKeys.all, slug] as const,
};

/** Map the current route to the testimonial slug used by the CRM API. */
export function routeToTestimonialSlug(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return 'home';
  return segment;
}

/** Resolve the testimonial slug for the current page from the router location. */
export function usePageTestimonialSlug(): string {
  const { pathname } = useLocation();
  return routeToTestimonialSlug(pathname);
}

/**
 * React Query fetcher for page testimonials.
 * Returns an empty array while loading / on error / when the API has no rows —
 * callers render nothing in those cases.
 */
export function useTestimonials(slug: string): UseQueryResult<Testimonial[], Error> {
  return useQuery({
    queryKey: testimonialKeys.bySlug(slug),
    queryFn: () => getTestimonials(slug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
