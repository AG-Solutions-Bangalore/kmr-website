/**
 * Testimonial module — shared types for the getTestimonial API.
 * GET /getTestimonial/:slug  →  { data: TestimonialApiItem[] }
 */

/** Raw item as returned by the CRM API (kept permissive — backend varies). */
export interface TestimonialApiItem {
  id?: number | string;
  name?: string;
  testimonial_name?: string;
  client_name?: string;
  /** Field name used by the POST /testimonial admin API + getTestimonial rows. */
  testimonial_client_name?: string;
  title?: string;
  author?: string;
  designation?: string;
  role?: string;
  company?: string;
  testimonial_designation?: string;
  position?: string;
  message?: string;
  testimonial_message?: string;
  description?: string;
  /** Field name used by the POST /testimonial admin API + getTestimonial rows. */
  testimonial_description?: string;
  review?: string;
  content?: string;
  quote?: string;
  image?: string;
  testimonial_image?: string;
  photo?: string;
  avatar?: string;
  profile_image?: string;
  rating?: number | string;
  /** Field name used by the POST /testimonial admin API + getTestimonial rows. */
  testimonial_rating?: number | string;
  star?: number | string;
  stars?: number | string;
  [key: string]: unknown;
}

/** Raw API response shape. */
export interface GetTestimonialResponse {
  data?: TestimonialApiItem[] | { data?: TestimonialApiItem[] } | null;
  status?: boolean | number | string;
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

/** Normalized testimonial used by UI components. */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  image: string;
  rating: number;
}
