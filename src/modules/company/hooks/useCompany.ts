import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { COMPANY_FALLBACK, getCompany } from '../api/company.api';
import type { Company } from '../types';

export const companyKeys = {
  all: ['company'] as const,
  profile: () => [...companyKeys.all, 'profile'] as const,
};

/**
 * React Query fetcher for GET /getCompany.
 * Resolves to last-known-good data while loading / on error —
 * callers can render `data` directly with zero conditionals.
 */
export function useCompany(): UseQueryResult<Company, Error> {
  return useQuery({
    queryKey: companyKeys.profile(),
    queryFn: getCompany,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    placeholderData: COMPANY_FALLBACK,
  });
}
