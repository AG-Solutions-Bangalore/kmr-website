import { apiClient } from '@/lib/api';
import type { Faq, FaqApiItem, GetFaqResponse } from '../types';

function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

/** Normalize one raw API item into UI-ready shape. Returns null when unusable. */
export function normalizeFaqItem(item: FaqApiItem, index: number): Faq | null {
  const question = firstString(
    item.question,
    item.faq_question,
    item.faq_que,
    item.title,
    item.faq_title,
  );
  const answer = firstString(
    item.answer,
    item.faq_answer,
    item.faq_ans,
    item.description,
    item.content,
  );
  if (!question || !answer) return null;
  return {
    id: String(item.id ?? `faq-${index}`),
    question,
    answer,
  };
}

/** Extract the array from the various response wrappers the API may use. */
export function extractFaqItems(response: GetFaqResponse | FaqApiItem[]): FaqApiItem[] {
  if (Array.isArray(response)) return response;
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && Array.isArray(data.data)) return data.data;
  return [];
}

/**
 * GET /getFAQBySlug/:slug — e.g. `home`, `about`, `contact`.
 * Always resolves to a (possibly empty) normalized array — never throws
 * malformed-data errors, so the section can simply render nothing when empty.
 */
export async function getFaqs(slug: string): Promise<Faq[]> {
  const { data } = await apiClient.get<GetFaqResponse>(
    `/getFAQBySlug/${encodeURIComponent(slug)}`,
  );
  return extractFaqItems(data)
    .map((item, index) => normalizeFaqItem(item, index))
    .filter((item): item is Faq => item !== null);
}

export const faqApi = {
  getFaqs,
};
