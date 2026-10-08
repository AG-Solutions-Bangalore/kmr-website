import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

/**
 * Base URL for the KMR CRM API.
 * Endpoints used:
 *  - POST /createEnquiry
 *  - POST /createNewsletter
 *  - GET  /getCompany
 *  - GET  /getTestimonial/:slug
 *  - GET  /getFAQBySlug/:slug
 */
export const API_BASE_URL = 'https://kmrlive.in/crmapi/public/api';

/**
 * Shared axios instance for the whole app.
 * - Uses FormData-friendly defaults (let browser set multipart boundary).
 * - 15s timeout, JSON accept header.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

// Pass-through response interceptor — normalize errors in one place.
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

/**
 * Convert a plain object to FormData, skipping undefined/null/empty-optionals
 * unless explicitly allowed. The CRM API expects `multipart/form-data`.
 */
export function toFormData(payload: object): FormData {
  const form = new FormData();
  for (const [key, value] of Object.entries(payload)) {
    if (value === undefined || value === null) continue;
    // Allow empty strings — API fields default to "" in Postman collection,
    // but skip them only if caller explicitly passed undefined/null.
    form.append(key, String(value));
  }
  return form;
}

/**
 * Extract a human-readable message from axios / API errors.
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | { message?: string; msg?: string; error?: string }
      | string
      | undefined;
    if (typeof data === 'string' && data) return data;
    if (data && typeof data === 'object') {
      if (data.message) return data.message;
      if (data.msg) return data.msg;
      if (data.error) return data.error;
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error) return error.message;
  return 'Something went wrong. Please try again.';
}

export default apiClient;
