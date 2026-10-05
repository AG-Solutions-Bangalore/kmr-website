/**
 * Blog module — shared types for the CRM blog APIs.
 * - GET /getFrontBlogs      → { data: BlogApiItem[], image_url: ImageUrlEntry[] }
 * - GET /getFeaturedBlogs   → { data: BlogApiItem[], image_url: ImageUrlEntry[] }
 * - GET /getBlogs           → { data: BlogDetailApiItem[], image_url: ImageUrlEntry[] }
 * - GET /getBlogsBySlug/:slug → { data: BlogDetailApiItem | null, image_url, previous, next, featured, faq }
 */

/** Image base entries returned alongside every blog response. */
export interface BlogImageUrlEntry {
  image_for?: string;
  image_url?: string;
  [key: string]: unknown;
}

/** Raw item as returned by getFrontBlogs / getFeaturedBlogs. */
export interface BlogApiItem {
  id?: number | string;
  blog_index?: string;
  blog_meta_title?: string;
  blog_meta_description?: string;
  blog_meta_keywords?: string;
  blog_slug?: string;
  blog_title?: string;
  blog_short_description?: string;
  blog_banner_image?: string;
  blog_banner_image_alt?: string;
  blog_created_date?: string;
  blog_updated_date?: string | null;
  created_by?: string;
  blog_categories_ids?: string;
  categories?: string;
  [key: string]: unknown;
}

/** Raw item as returned by getBlogs / getBlogsBySlug (includes full body). */
export interface BlogDetailApiItem extends BlogApiItem {
  blog_description?: string;
  blog_front?: number | string;
  blog_featured?: number | string;
  [key: string]: unknown;
}

/** Raw list response shape (front / featured / all). */
export interface GetBlogsResponse {
  data?: BlogApiItem[] | BlogDetailApiItem[] | null;
  image_url?: BlogImageUrlEntry[] | null;
  status?: boolean | number | string;
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

/** Prev / next navigator inside the detail response. */
export interface BlogSlugNav {
  blog_slug?: string;
  blog_title?: string;
  [key: string]: unknown;
}

/** Mini featured row inside the detail response. */
export interface BlogFeaturedMini {
  id?: number | string;
  blog_slug?: string;
  blog_title?: string;
  blog_short_description?: string;
  blog_banner_image?: string;
  blog_banner_image_alt?: string;
  blog_created_date?: string;
  created_by?: string;
  [key: string]: unknown;
}

/** Raw detail response shape. */
export interface GetBlogBySlugResponse {
  data?: BlogDetailApiItem | null;
  image_url?: BlogImageUrlEntry[] | null;
  previous?: BlogSlugNav | null;
  next?: BlogSlugNav | null;
  featured?: BlogFeaturedMini[] | null;
  faq?: unknown[];
  status?: boolean | number | string;
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

/** Normalized blog used by UI components. */
export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Full HTML / text body — only present on list-all + detail responses. */
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  author: string;
  date: string;
  /** Raw ISO-ish date for sorting / <time dateTime>. */
  rawDate: string;
  isFeatured: boolean;
}

/** Normalized blog detail with prev/next + sidebar data. */
export interface BlogDetail extends Blog {
  previous: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
  featured: Blog[];
}
