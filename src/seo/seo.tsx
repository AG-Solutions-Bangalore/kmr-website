import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  SITE_AUTHOR,
  SITE_PUBLISHER,
  SITE_ORIGIN,
  getCanonicalUrl,
  createCompositeGraph,
  organizationSchema,
} from './schemas';

export { SITE_NAME, SITE_AUTHOR, SITE_PUBLISHER, SITE_ORIGIN, getCanonicalUrl };

export interface SeoRouteConfig {
  title: string;
  description: string;
  path: string;
}

export const SEO_CONFIG = {
  home: {
    title: `${SITE_NAME} — Market Trends, Real Insights, Smarter Decisions`,
    description:
      `${SITE_NAME} provides the latest market trends, real-time insights, and valuable updates to keep you informed and help you make smarter, more confident decisions.`,
    path: '/',
  },
  about: {
    title: `About Us | ${SITE_NAME} — Karnataka Market Reports`,
    description:
      `Learn about ${SITE_NAME}, a platform connecting users with market trends, product categories, and valuable insights to support informed business decisions every day.`,
    path: '/about',
  },
  contact: {
    title: `Contact Us | ${SITE_NAME} — Get in Touch`,
    description:
      `Contact ${SITE_NAME} for assistance, enquiries, and support. Connect with our team to learn more about market trends, product categories, and our services.`,
    path: '/contact',
  },
  blog: {
    title: `Stories & Market Insights | ${SITE_NAME} Blog`,
    description:
      `Expert analysis, price trends and stories from India’s commodity markets — written by the ${SITE_NAME} team.`,
    path: '/blog',
  },
} satisfies Record<string, SeoRouteConfig>;

export type SeoKey = keyof typeof SEO_CONFIG;

export interface SeoOverride {
  title?: string;
  description?: string;
  path?: string;
}

export interface HeadState {
  title: string;
  description: string;
  canonical: string;
}

export function headOf(key: SeoKey, override?: SeoOverride): HeadState {
  const cfg = SEO_CONFIG[key];
  const title = override?.title || cfg.title;
  const description = override?.description || cfg.description;
  const path = override?.path || cfg.path;
  return { title, description, canonical: getCanonicalUrl(path) };
}

export function resolveSeoForPath(pathname: string, override?: SeoOverride): HeadState {
  const clean = pathname.split('?')[0].split('#')[0].replace(/\/$/, '') || '/';
  if (clean === '/') return headOf('home', override);
  if (clean === '/about') return headOf('about', override);
  if (clean === '/contact') return headOf('contact', override);
  if (clean === '/blog') return headOf('blog', override);
  if (clean.startsWith('/blog/')) {
    return headOf('blog', { path: clean, ...override });
  }
  return headOf('home', override);
}

let currentHead: HeadState =
  typeof window !== 'undefined'
    ? resolveSeoForPath(window.location.pathname)
    : headOf('home');

const headListeners = new Set<(head: HeadState) => void>();

export function updateSeoForPath(pathname: string, override?: SeoOverride): void {
  currentHead = resolveSeoForPath(pathname, override);
  headListeners.forEach((listener) => listener(currentHead));
}

/**
 * Optional override hook for dynamic routes (e.g., individual blog post pages).
 * Standard pages (/ , /about, /contact, /blog) do NOT need to call this.
 */
export function useSEO(key?: SeoKey, override?: SeoOverride): void {
  const title = override?.title;
  const description = override?.description;
  const path = override?.path;
  useEffect(() => {
    if (!key && !override) return;
    currentHead = key
      ? headOf(key, { title, description, path })
      : resolveSeoForPath(window.location.pathname, { title, description, path });
    headListeners.forEach((listener) => listener(currentHead));
  }, [key, title, description, path]);
}

/**
 * Single centralized SEO component.
 * Automatically manages page title, meta description, canonical, author, publisher, and OG tags
 * across all routes.
 */
export function AutoSeo() {
  const [head, setHead] = useState<HeadState>(currentHead);

  useEffect(() => {
    headListeners.add(setHead);

    const onLocationChange = () => {
      const nextHead = resolveSeoForPath(window.location.pathname);
      currentHead = nextHead;
      setHead(nextHead);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      headListeners.delete(setHead);
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  return (
    <Helmet>
      <title>{head.title}</title>
      <meta name="description" content={head.description} />
      <link rel="canonical" href={head.canonical} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={SITE_AUTHOR} />
      <meta name="publisher" content={SITE_PUBLISHER} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={head.title} />
      <meta property="og:description" content={head.description} />
      <meta property="og:url" content={head.canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={head.title} />
      <meta name="twitter:description" content={head.description} />
    </Helmet>
  );
}

export const SeoHost = AutoSeo;

/** Fallback JSON-LD for client-only visits when SSG output is bypassed. */
export function injectOrganizationSchema(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById('kmr-rich-results')) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'kmr-rich-results';
  script.text = JSON.stringify(createCompositeGraph([organizationSchema()]));
  document.head.appendChild(script);
}
