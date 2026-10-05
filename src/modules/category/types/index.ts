/**
 * Category module — shared types for the getCategory API.
 * GET /getCategory  →  { data: CategoryApiItem[], image_url: ImageUrlEntry[] }
 */

/** Image base entries returned alongside the category response. */
export interface CategoryImageUrlEntry {
  image_for?: string;
  image_url?: string;
  [key: string]: unknown;
}

/** Raw item as returned by the CRM API. */
export interface CategoryApiItem {
  categories_name?: string;
  categories_image?: string;
  id?: number | string;
  [key: string]: unknown;
}

/** Raw API response shape. */
export interface GetCategoryResponse {
  data?: CategoryApiItem[] | null;
  image_url?: CategoryImageUrlEntry[] | null;
  status?: boolean | number | string;
  success?: boolean;
  message?: string;
  [key: string]: unknown;
}

/** Normalized category used by UI components. */
export interface Category {
  id: string;
  /** Display name, e.g. "Edible Oil". */
  name: string;
  /** Fully resolved image URL (remote CRM file or local fallback asset). */
  image: string;
}
