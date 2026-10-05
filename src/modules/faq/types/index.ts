/**
 * FAQ module — shared types for the getFAQBySlug API.
 * GET /getFAQBySlug/:slug  →  { data: FaqApiItem[] }
 */

/** Raw item as returned by the CRM API (kept permissive — backend varies). */
export interface FaqApiItem {
  id?: number | string;
  question?: string;
  faq_question?: string;
  /** Field name used by the POST /faq admin API + getFAQBySlug rows. */
  faq_que?: string;
  title?: string;
  faq_title?: string;
  answer?: string;
  faq_answer?: string;
  /** Field name used by the POST /faq admin API + getFAQBySlug rows. */
  faq_ans?: string;
  description?: string;
  content?: string;
  [key: string]: unknown;
}

/** Raw API response shape. */
export interface GetFaqResponse {
  data?: FaqApiItem[] | { data?: FaqApiItem[] } | null;
  status?: boolean | number | string;
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

/** Normalized FAQ used by UI components. */
export interface Faq {
  id: string;
  question: string;
  answer: string;
}
