import { useLocation } from 'react-router';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getFaqs } from '../api/faq.api';
import type { Faq } from '../types';

export const faqKeys = {
  all: ['faqs'] as const,
  bySlug: (slug: string) => [...faqKeys.all, slug] as const,
};

/** Map the current route to the FAQ slug used by the CRM API. */
export function routeToFaqSlug(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return 'home';
  return segment;
}

/** Resolve the FAQ slug for the current page from the router location. */
export function usePageFaqSlug(): string {
  const { pathname } = useLocation();
  return routeToFaqSlug(pathname);
}

/**
 * React Query fetcher for page FAQs.
 * Returns an empty array while loading / on error / when the API has no rows —
 * callers render fallback content or nothing in those cases.
 */
export function useFaqs(slug: string): UseQueryResult<Faq[], Error> {
  return useQuery({
    queryKey: faqKeys.bySlug(slug),
    queryFn: () => getFaqs(slug),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
