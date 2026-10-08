/**
 * Remote website images (`web_images/`) on the KMR CRM host.
 *
 * Large / decorative images are served from the backend instead of being
 * bundled, keeping the JS bundle small. Only performance-critical images
 * (logo, above-the-fold hero banners) stay local under `src/assets`.
 */

/** Base URL for website images uploaded via the CRM. */
export const WEB_IMAGES_BASE_URL =
  'https://kmrlive.in/crmapi/public/assets/images/web_images';

/**
 * Resolve a `web_images/` path to its full remote URL.
 * Paths mirror the old local `src/assets` folders
 * (`category/…`, `home/…`, `icons/…`, `common/…`).
 * - Absolute URLs pass through untouched.
 * - Leading slashes are stripped; spaces/special chars are URI-encoded.
 *
 * @example
 * webImage('category/leaf1.webp')
 * // → 'https://kmrlive.in/crmapi/public/assets/images/web_images/category/leaf1.webp'
 */
export function webImage(filename: string): string {
  const name = (filename ?? '').trim();
  if (!name) return '';
  if (/^https?:\/\//i.test(name) || name.startsWith('data:')) return name;
  const file = name.startsWith('/') ? name.slice(1) : name;
  const base = WEB_IMAGES_BASE_URL.endsWith('/')
    ? WEB_IMAGES_BASE_URL
    : `${WEB_IMAGES_BASE_URL}/`;
  return `${base}${encodeURI(file)}`;
}
