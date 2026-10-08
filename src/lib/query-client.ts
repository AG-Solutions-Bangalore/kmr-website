import { QueryClient } from '@tanstack/react-query';

/**
 * Shared React Query client.
 * - No refetch on window focus (forms / marketing site default).
 * - Single retry for resilience against flaky mobile networks.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: 0,
    },
  },
});
