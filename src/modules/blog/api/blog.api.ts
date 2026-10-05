import { apiClient } from '@/lib/api';
import type {
  Blog,
  BlogApiItem,
  BlogDetail,
  BlogDetailApiItem,
  BlogFeaturedMini,
  BlogImageUrlEntry,
  GetBlogBySlugResponse,
  GetBlogsResponse,
} from '../types';

const FALLBACK_IMAGE =
  'https://kmrlive.in/crmapi/public/assets/images/no_image.jpg';

function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

function toSlug(value: unknown, fallbackId: string): string {
  const raw = firstString(value);
  if (raw) return raw;
  return fallbackId;
}

/**
 * Resolve a banner filename against the `image_url` entries returned by the API.
 * - `image_url` contains `{ image_for: "Blog", image_url: "<base>..." }`
 *   plus `{ image_for: "No Image", image_url: "<fallback>" }`.
 * - Absolute URLs pass through untouched.
 */
export function resolveBlogImage(
  filename: string,
  imageEntries: BlogImageUrlEntry[] = [],
): string {
  if (/^https?:\/\//i.test(filename)) return filename;
  const byFor = (label: string) =>
    firstString(
      imageEntries.find(
        (e) => String(e.image_for ?? '').toLowerCase() === label.toLowerCase(),
      )?.image_url,
    );
  const blogBase = byFor('Blog');
  const noImage = byFor('No Image') || FALLBACK_IMAGE;
  if (!filename) return noImage;
  if (!blogBase) return noImage;
  const base = blogBase.endsWith('/') ? blogBase : `${blogBase}/`;
  const file = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${base}${file}`;
}

function extractImageEntries(response: { image_url?: unknown }): BlogImageUrlEntry[] {
  const entries = (response as { image_url?: BlogImageUrlEntry[] })?.image_url;
  return Array.isArray(entries) ? entries : [];
}

/** Extract the array from the list responses (always an array, possibly empty). */
export function extractBlogItems(
  response: GetBlogsResponse | BlogApiItem[] | BlogDetailApiItem[],
): (BlogApiItem | BlogDetailApiItem)[] {
  if (Array.isArray(response)) return response;
  const data = (response as GetBlogsResponse)?.data;
  return Array.isArray(data) ? data : [];
}

function formatDate(raw: string): string {
  if (!raw) return '';
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
  return raw;
}

/** Normalize one raw API item into UI-ready shape. Returns null when unusable. */
export function normalizeBlogItem(
  item: BlogApiItem | BlogDetailApiItem | BlogFeaturedMini,
  imageEntries: BlogImageUrlEntry[] = [],
  index = 0,
): Blog | null {
  const title = firstString(
    (item as BlogApiItem).blog_title,
    (item as BlogFeaturedMini).blog_title,
  );
  const slug = toSlug(
    (item as BlogApiItem).blog_slug ?? (item as BlogFeaturedMini).blog_slug,
    String(item.id ?? `blog-${index}`),
  );
  if (!title || !slug) return null;

  const rawImage = firstString(
    (item as BlogApiItem).blog_banner_image,
    (item as BlogFeaturedMini).blog_banner_image,
  );
  const rawDate = firstString(
    (item as BlogApiItem).blog_created_date,
    (item as BlogFeaturedMini).blog_created_date,
  );
  const featuredFlag = String(
    (item as BlogDetailApiItem).blog_featured ??
      (item as BlogApiItem).blog_index ??
      '',
  ).toLowerCase();

  return {
    id: String(item.id ?? `${slug}-${index}`),
    slug,
    title,
    excerpt: firstString(
      (item as BlogApiItem).blog_short_description,
      (item as BlogFeaturedMini).blog_short_description,
      (item as BlogApiItem).blog_meta_description,
    ),
    description: firstString((item as BlogDetailApiItem).blog_description),
    image: resolveBlogImage(rawImage, imageEntries),
    imageAlt: firstString(
      (item as BlogApiItem).blog_banner_image_alt,
      (item as BlogFeaturedMini).blog_banner_image_alt,
      title,
    ),
    category: firstString((item as BlogApiItem).categories, 'Market Insights'),
    author: firstString(
      (item as BlogApiItem).created_by,
      (item as BlogFeaturedMini).created_by,
      'KMR LIVE',
    ),
    date: formatDate(rawDate),
    rawDate,
    isFeatured: featuredFlag === '1' || featuredFlag === 'yes',
  };
}

/**
 * GET /getFrontBlogs — blogs flagged for the front/home page.
 * Always resolves to a (possibly empty) normalized array.
 */
export async function getFrontBlogs(): Promise<Blog[]> {
  const { data } = await apiClient.get<GetBlogsResponse>('/getFrontBlogs');
  const items = extractBlogItems(data);
  const images = extractImageEntries(data);
  return items
    .map((item, index) => normalizeBlogItem(item, images, index))
    .filter((item): item is Blog => item !== null);
}

/**
 * GET /getFeaturedBlogs — highlighted blogs for the home feature block.
 * Always resolves to a (possibly empty) normalized array.
 */
export async function getFeaturedBlogs(): Promise<Blog[]> {
  const { data } =
    await apiClient.get<GetBlogsResponse>('/getFeaturedBlogs');
  const items = extractBlogItems(data);
  const images = extractImageEntries(data);
  return items
    .map((item, index) => normalizeBlogItem(item, images, index))
    .filter((item): item is Blog => item !== null);
}

/**
 * GET /getBlogs — full blog list (includes `blog_description` body).
 * Always resolves to a (possibly empty) normalized array.
 */
export async function getBlogs(): Promise<Blog[]> {
  const { data } = await apiClient.get<GetBlogsResponse>('/getBlogs');
  const items = extractBlogItems(data);
  const images = extractImageEntries(data);
  return items
    .map((item, index) => normalizeBlogItem(item, images, index))
    .filter((item): item is Blog => item !== null);
}

/**
 * GET /getBlogsBySlug/:slug — single blog detail with prev/next + featured sidebar.
 * Returns `null` when the slug has no row (API returns `{ data: null }`).
 */
export async function getBlogBySlug(slug: string): Promise<BlogDetail | null> {
  const { data } = await apiClient.get<GetBlogBySlugResponse>(
    `/getBlogsBySlug/${encodeURIComponent(slug)}`,
  );
  if (!data?.data) return null;
  const images = extractImageEntries(data);
  const main = normalizeBlogItem(data.data, images, 0);
  if (!main) return null;

  const featured = Array.isArray(data.featured)
    ? data.featured
        .map((item, index) => normalizeBlogItem(item, images, index))
        .filter((item): item is Blog => item !== null)
        .filter((item) => item.slug !== main.slug)
    : [];

  return {
    ...main,
    previous:
      data.previous?.blog_slug && data.previous?.blog_title
        ? { slug: data.previous.blog_slug, title: data.previous.blog_title }
        : null,
    next:
      data.next?.blog_slug && data.next?.blog_title
        ? { slug: data.next.blog_slug, title: data.next.blog_title }
        : null,
    featured,
  };
}

export const blogApi = {
  getFrontBlogs,
  getFeaturedBlogs,
  getBlogs,
  getBlogBySlug,
};
