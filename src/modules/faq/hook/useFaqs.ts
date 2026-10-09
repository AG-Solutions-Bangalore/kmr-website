import { useLocation } from 'react-router';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getFaqs } from '../api/faq.api';
import type { Faq } from '../types';

export const faqKeys = {
  all: ['faqs'] as const,
  bySlug: (slug: string) => [...faqKeys.all, slug] as const,
};

/** Candidate CRM slugs to try in order — first non-empty result wins. */
export const FAQ_SLUG_CANDIDATES: Record<string, string[]> = {
  home: ['home'],
  about: ['about-us', 'about'],
  contact: ['contacts', 'contact-us', 'contact'],
};

/** Map the current route to the FAQ slug used by the CRM API. */
export function routeToFaqSlug(pathname: string): string {
  const segment = pathname.split('/').filter(Boolean)[0];
  if (!segment) return 'home';
  if (segment === 'about') return 'about-us';
  if (segment === 'contact') return 'contacts';
  return segment;
}

/** Candidate slugs for a resolved slug (handles direct `slug` prop too). */
export function faqSlugCandidates(slug: string): string[] {
  const lower = slug.toLowerCase();
  if (lower === 'about' || lower === 'about-us') return FAQ_SLUG_CANDIDATES.about;
  if (lower === 'contact' || lower === 'contact-us' || lower === 'contacts')
    return FAQ_SLUG_CANDIDATES.contact;
  if (lower === 'home') return FAQ_SLUG_CANDIDATES.home;
  return [slug];
}

/** Resolve the FAQ slug for the current page from the router location. */
export function usePageFaqSlug(): string {
  const { pathname } = useLocation();
  return routeToFaqSlug(pathname);
}

/**
 * React Query fetcher for page FAQs.
 * Tries candidate CRM slugs in order (e.g. `contacts` → `contact-us` → `contact`)
 * and returns the first non-empty result. Returns an empty array while
 * loading / on error / when all candidates are empty — callers render
 * fallback content or nothing in those cases.
 */
export function useFaqs(slug: string): UseQueryResult<Faq[], Error> {
  return useQuery({
    queryKey: faqKeys.bySlug(slug),
    queryFn: async () => {
      for (const candidate of faqSlugCandidates(slug)) {
        try {
          const faqs = await getFaqs(candidate);
          if (faqs.length > 0) return faqs;
        } catch {
          // Try next candidate slug.
        }
      }
      return [];
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
