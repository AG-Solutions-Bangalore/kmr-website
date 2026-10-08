import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getCategories } from '../api/category.api';
import type { Category } from '../types';

export const categoryKeys = {
  all: ['categories'] as const,
  list: () => [...categoryKeys.all, 'list'] as const,
};

/**
 * React Query fetcher for GET /getCategory.
 * Resolves to [] while loading / on error / when the API has no rows —
 * callers fall back to static categories in those cases.
 */
export function useCategories(): UseQueryResult<Category[], Error> {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
