import { apiClient } from '@/lib/api';
import type {
  GetTestimonialResponse,
  Testimonial,
  TestimonialApiItem,
} from '../types';

/** Host used to resolve relative image paths returned by the CRM. */
const CRM_HOST = 'https://kmrlive.in';

function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function parseRating(...values: unknown[]): number {
  for (const value of values) {
    const num = typeof value === 'string' ? Number(value) : value;
    if (typeof num === 'number' && Number.isFinite(num) && num > 0) {
      return Math.min(5, Math.max(1, Math.round(num)));
    }
  }
  return 5;
}

/**
 * CRM image fields are often relative paths (e.g. `uploads/...`).
 * Resolve them against the CRM host; leave absolute URLs untouched.
 */
export function resolveTestimonialImage(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  if (path.startsWith('/')) return `${CRM_HOST}${path}`;
  return `${CRM_HOST}/${path}`;
}

/** Normalize one raw API item into UI-ready shape. Returns null when unusable. */
export function normalizeTestimonialItem(item: TestimonialApiItem, index: number): Testimonial | null {
  const message = firstString(
    item.message,
    item.testimonial_message,
    item.testimonial_description,
    item.description,
    item.review,
    item.content,
    item.quote,
  );
  if (!message) return null;

  const rawImage = firstString(
    item.image,
    item.testimonial_image,
    item.photo,
    item.avatar,
    item.profile_image,
  );

  return {
    id: String(item.id ?? `testimonial-${index}`),
    name: firstString(item.name, item.testimonial_name, item.client_name, item.testimonial_client_name, item.title, item.author) || 'Happy Customer',
    role: firstString(
      item.designation,
      item.testimonial_designation,
      item.role,
      item.position,
      item.company,
    ),
    message,
    image: resolveTestimonialImage(rawImage),
    rating: parseRating(item.rating, item.testimonial_rating, item.star, item.stars),
  };
}

/** Extract the array from the various response wrappers the API may use. */
export function extractTestimonialItems(response: GetTestimonialResponse | TestimonialApiItem[]): TestimonialApiItem[] {
  if (Array.isArray(response)) return response;
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && Array.isArray(data.data)) return data.data;
  return [];
}

/**
 * GET /getTestimonial/:slug — e.g. `home`, `about`, `contact`.
 * Always resolves to a (possibly empty) normalized array — never throws
 * malformed-data errors, so the section can simply render nothing when empty.
 */
export async function getTestimonials(slug: string): Promise<Testimonial[]> {
  const { data } = await apiClient.get<GetTestimonialResponse>(
    `/getTestimonial/${encodeURIComponent(slug)}`,
  );
  return extractTestimonialItems(data)
    .map((item, index) => normalizeTestimonialItem(item, index))
    .filter((item): item is Testimonial => item !== null);
}

export const testimonialApi = {
  getTestimonials,
};
