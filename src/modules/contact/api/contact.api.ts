import { apiClient, toFormData } from '@/lib/api';
import type {
  CreateEnquiryPayload,
  CreateNewsletterPayload,
  CrmApiResponse,
} from '../types';

/**
 * POST /createEnquiry — sends multipart/form-data.
 * Postman body keys: enquiryFullName, enquiryMobile, enquiryEmail,
 * enquiryService, enquiryMessage, enquiryFrom, utm_medium, utm_source, utm_campaign
 */
export async function createEnquiry(
  payload: CreateEnquiryPayload,
): Promise<CrmApiResponse> {
  const { data } = await apiClient.post<CrmApiResponse>(
    '/createEnquiry',
    toFormData(payload),
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return data;
}

/**
 * POST /createNewsletter — sends multipart/form-data.
 * Postman body keys: newsletter_email
 */
export async function createNewsletter(
  payload: CreateNewsletterPayload,
): Promise<CrmApiResponse> {
  const { data } = await apiClient.post<CrmApiResponse>(
    '/createNewsletter',
    toFormData(payload),
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return data;
}

export const contactApi = {
  createEnquiry,
  createNewsletter,
};
