import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { createEnquiry, createNewsletter } from '../api/contact.api';
import type {
  CreateEnquiryPayload,
  CreateNewsletterPayload,
  CrmApiResponse,
} from '../types';

export const contactKeys = {
  all: ['contact'] as const,
  enquiry: () => [...contactKeys.all, 'enquiry'] as const,
  newsletter: () => [...contactKeys.all, 'newsletter'] as const,
};

/**
 * React Query mutation for the Enquiry form.
 *
 * @example
 * const { mutate, isPending } = useCreateEnquiry();
 * mutate({ enquiryFullName: '...', enquiryMobile: '...', ... });
 */
export function useCreateEnquiry(): UseMutationResult<
  CrmApiResponse,
  Error,
  CreateEnquiryPayload
> {
  return useMutation({
    mutationKey: contactKeys.enquiry(),
    mutationFn: (payload: CreateEnquiryPayload) => createEnquiry(payload),
  });
}

/**
 * React Query mutation for the Newsletter subscribe form.
 *
 * @example
 * const { mutate, isPending } = useCreateNewsletter();
 * mutate({ newsletter_email: 'user@mail.com' });
 */
export function useCreateNewsletter(): UseMutationResult<
  CrmApiResponse,
  Error,
  CreateNewsletterPayload
> {
  return useMutation({
    mutationKey: contactKeys.newsletter(),
    mutationFn: (payload: CreateNewsletterPayload) => createNewsletter(payload),
  });
}
