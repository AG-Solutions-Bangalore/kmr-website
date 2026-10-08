import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  getBlogBySlug,
  getBlogs,
  getFeaturedBlogs,
  getFrontBlogs,
} from '../api/blog.api';
import type { Blog, BlogDetail } from '../types';

export const blogKeys = {
  all: ['blogs'] as const,
  front: () => [...blogKeys.all, 'front'] as const,
  featured: () => [...blogKeys.all, 'featured'] as const,
  list: () => [...blogKeys.all, 'list'] as const,
  bySlug: (slug: string) => [...blogKeys.all, 'slug', slug] as const,
};

const LIST_OPTIONS = {
  staleTime: 1000 * 60 * 5,
  retry: 1,
  refetchOnWindowFocus: false,
} as const;

/**
 * React Query fetcher for GET /getFrontBlogs.
 * Resolves to [] while loading / on error / when the API has no rows —
 * callers render nothing in those cases.
 */
export function useFrontBlogs(): UseQueryResult<Blog[], Error> {
  return useQuery({
    queryKey: blogKeys.front(),
    queryFn: getFrontBlogs,
    ...LIST_OPTIONS,
  });
}

/**
 * React Query fetcher for GET /getFeaturedBlogs.
 * Resolves to [] while loading / on error / when the API has no rows.
 */
export function useFeaturedBlogs(): UseQueryResult<Blog[], Error> {
  return useQuery({
    queryKey: blogKeys.featured(),
    queryFn: getFeaturedBlogs,
    ...LIST_OPTIONS,
  });
}

/**
 * React Query fetcher for GET /getBlogs (full list with body text).
 */
export function useBlogs(): UseQueryResult<Blog[], Error> {
  return useQuery({
    queryKey: blogKeys.list(),
    queryFn: getBlogs,
    ...LIST_OPTIONS,
  });
}

/**
 * React Query fetcher for GET /getBlogsBySlug/:slug.
 * Resolves to `null` when the slug does not exist.
 */
export function useBlogBySlug(
  slug: string | undefined,
): UseQueryResult<BlogDetail | null, Error> {
  return useQuery({
    queryKey: blogKeys.bySlug(slug ?? ''),
    queryFn: () => getBlogBySlug(slug ?? ''),
    enabled: Boolean(slug),
    ...LIST_OPTIONS,
  });
}
