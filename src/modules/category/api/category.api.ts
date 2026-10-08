import { apiClient } from '@/lib/api';
import type {
  Category,
  CategoryApiItem,
  CategoryImageUrlEntry,
  GetCategoryResponse,
} from '../types';

const FALLBACK_IMAGE =
  'https://kmrlive.in/crmapi/public/assets/images/no_image.jpg';

function firstString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return '';
}

/**
 * Resolve a banner filename against the `image_url` entries returned by the API.
 * - `image_url` contains `{ image_for: "Category", image_url: "<base>..." }`
 *   plus `{ image_for: "No Image", image_url: "<fallback>" }`.
 * - Filenames contain spaces (e.g. `Edible Oil.jpg`) so the file part is
 *   URI-encoded. Absolute URLs pass through untouched.
 */
export function resolveCategoryImage(
  filename: string,
  imageEntries: CategoryImageUrlEntry[] = [],
): string {
  if (/^https?:\/\//i.test(filename)) return filename;
  const byFor = (label: string) =>
    firstString(
      imageEntries.find(
        (e) => String(e.image_for ?? '').toLowerCase() === label.toLowerCase(),
      )?.image_url,
    );
  const categoryBase = byFor('Category');
  const noImage = byFor('No Image') || FALLBACK_IMAGE;
  if (!filename) return noImage;
  if (!categoryBase) return noImage;
  const base = categoryBase.endsWith('/') ? categoryBase : `${categoryBase}/`;
  const file = filename.startsWith('/') ? filename.slice(1) : filename;
  return `${base}${encodeURI(file)}`;
}

/** Normalize one raw API item into UI-ready shape. Returns null when unusable. */
export function normalizeCategoryItem(
  item: CategoryApiItem,
  imageEntries: CategoryImageUrlEntry[] = [],
  index = 0,
): Category | null {
  const name = firstString(item.categories_name);
  if (!name) return null;
  return {
    id: String(item.id ?? `category-${index}`),
    name,
    image: resolveCategoryImage(firstString(item.categories_image), imageEntries),
  };
}

/**
 * GET /getCategory — full category list with remote banner images.
 * Always resolves to a (possibly empty) normalized array — never throws
 * malformed-data errors, so callers can fall back to static data when empty.
 */
export async function getCategories(): Promise<Category[]> {
  const { data } = await apiClient.get<GetCategoryResponse>('/getCategory');
  const items = Array.isArray(data?.data) ? data.data : [];
  const images = Array.isArray(data?.image_url) ? data.image_url : [];
  return items
    .map((item, index) => normalizeCategoryItem(item, images, index))
    .filter((item): item is Category => item !== null);
}

export const categoryApi = {
  getCategories,
};
