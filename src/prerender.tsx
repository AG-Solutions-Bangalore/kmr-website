import { renderToString } from "react-dom/server";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "@tanstack/react-query";
import { StaticRouter } from "react-router";
import { Route, Routes } from "react-router";
import type { Thing } from "schema-dts";

import { MainLayout } from "./components/layouts/MainLayout";
import { HomePage } from "./modules/home/pages/HomePage";
import { AboutPage } from "./modules/about/pages/AboutPage";
import { ContactPage } from "./modules/contact/pages/ContactPage";
import { BlogDetailPage, BlogsPage } from "./modules/blog";

import { getBlogs, getBlogBySlug } from "./modules/blog/api/blog.api";
import { blogKeys } from "./modules/blog/hooks/useBlogs";
import { getFaqs } from "./modules/faq/api/faq.api";
import { faqKeys } from "./modules/faq/hook/useFaqs";
import { getTestimonials } from "./modules/testimonial/api/testimonial.api";
import { testimonialKeys } from "./modules/testimonial/hook/useTestimonials";
import { getCompany } from "./modules/company/api/company.api";
import { companyKeys } from "./modules/company/hooks/useCompany";
import type { Testimonial } from "./modules/testimonial/types";

import { SEO_CONFIG, getCanonicalUrl, type SeoKey } from "./seo/seo";
import {
  blogPostingSchema,
  breadcrumbSchema,
  createCompositeGraph,
  faqPageSchema,
  itemListSchema,
  organizationSchema,
  reviewSchema,
  SITE_NAME,
  SITE_AUTHOR,
  SITE_PUBLISHER,
  stripHtml,
  webPageSchema,
  websiteSchema,
} from "./seo/schemas";

const dataCache = new Map<string, unknown>();

async function cached<T>(
  key: readonly unknown[],
  fn: () => Promise<T>,
): Promise<T | null> {
  const cacheKey = JSON.stringify(key);
  if (dataCache.has(cacheKey))
    return (dataCache.get(cacheKey) ?? null) as T | null;
  try {
    const data = await fn();
    dataCache.set(cacheKey, data);
    return data;
  } catch {
    dataCache.set(cacheKey, null);
    return null;
  }
}

function seed<T>(
  client: QueryClient,
  key: readonly unknown[],
  data: T | null,
): void {
  if (data !== null && data !== undefined) {
    client.setQueryData(key, data);
  }
}

/** Try CRM FAQ slugs in order, return the first non-empty list. */
async function getFaqsFirst(candidates: string[]) {
  for (const slug of candidates) {
    const faqs = await cached(faqKeys.bySlug(slug), () => getFaqs(slug));
    if (faqs && faqs.length > 0) return { faqs, slug };
  }
  return { faqs: [], slug: candidates[0] };
}

function parseReviews(rows: Testimonial[]) {
  const list = (rows ?? [])
    .map((t) => ({
      name: t.name.trim(),
      body: stripHtml(t.message),
      rating: Math.min(5, Math.max(1, Math.round(t.rating || 5))),
    }))
    .filter((r) => r.name.length > 0 && r.body.length > 0);
  const avg = list.length
    ? Math.round(
        (list.reduce((sum, r) => sum + r.rating, 0) / list.length) * 10,
      ) / 10
    : 0;
  return {
    list,
    aggregate: list.length
      ? { ratingValue: avg, reviewCount: list.length }
      : undefined,
  };
}

interface StaticRouteDef {
  path: string;
  key: SeoKey;
  label: string;
  faqSlugs: string[];
  testiSlug: string;
}

const STATIC_ROUTES: StaticRouteDef[] = [
  {
    path: "/",
    key: "home",
    label: "Home",
    faqSlugs: ["home"],
    testiSlug: "home",
  },
  {
    path: "/about",
    key: "about",
    label: "About Us",
    faqSlugs: ["about-us", "about"],
    testiSlug: "about",
  },
  {
    path: "/contact",
    key: "contact",
    label: "Contact Us",
    faqSlugs: ["contacts", "contact-us", "contact"],
    testiSlug: "contact",
  },
  {
    path: "/blog",
    key: "blog",
    label: "Blog",
    faqSlugs: ["blog", "blogs"],
    testiSlug: "blog",
  },
];

type HeadElement = {
  type: string;
  props: Record<string, string>;
  children?: string;
};

function buildHeadElements(
  title: string,
  desc: string,
  canonical: string,
  schemas: Thing[],
  queryState: string | null,
  keywords?: string,
) {
  const elements: HeadElement[] = [
    { type: "meta", props: { name: "description", content: desc } },
    ...(keywords ? [{ type: "meta", props: { name: "keywords", content: keywords } }] : []),
    { type: "meta", props: { name: "robots", content: "index, follow" } },
    { type: "meta", props: { name: "author", content: SITE_AUTHOR } },
    { type: "meta", props: { name: "publisher", content: SITE_PUBLISHER } },
    { type: "link", props: { rel: "canonical", href: canonical } },
    { type: "meta", props: { property: "og:type", content: "website" } },
    { type: "meta", props: { property: "og:site_name", content: SITE_NAME } },
    { type: "meta", props: { property: "og:title", content: title } },
    { type: "meta", props: { property: "og:description", content: desc } },
    { type: "meta", props: { property: "og:url", content: canonical } },
    {
      type: "meta",
      props: { name: "twitter:card", content: "summary_large_image" },
    },
    { type: "meta", props: { name: "twitter:title", content: title } },
    { type: "meta", props: { name: "twitter:description", content: desc } },
  ];

  if (queryState) {
    elements.push({
      type: "script",
      props: { id: "kmr-query-state", type: "application/json" },
      children: queryState,
    });
  }

  if (schemas.length > 0) {
    elements.push({
      type: "script",
      props: { type: "application/ld+json", id: "kmr-rich-results" },
      children: JSON.stringify(createCompositeGraph(schemas)),
    });
  }

  return new Set(elements);
}

function renderRouteHtml(url: string, client: QueryClient): string {
  try {
    return renderToString(
      <QueryClientProvider client={client}>
        <StaticRouter location={url}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="blog" element={<BlogsPage />} />
              <Route path="blog/:slug" element={<BlogDetailPage />} />
              <Route path="*" element={<HomePage />} />
            </Route>
          </Routes>
        </StaticRouter>
      </QueryClientProvider>,
    );
  } catch (err) {
    console.warn(
      `[SSG] render failed for ${url}:`,
      (err as Error)?.message ?? err,
    );
    return "";
  }
}

export async function prerender(data: { url: string }) {
  const url = data.url || "/";
  const cleanPath = url.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";

  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });

  let title = SEO_CONFIG.home.title;
  let description = SEO_CONFIG.home.description;
  let keywords = SEO_CONFIG.home.keywords;
  let canonicalPath = "/";
  const schemas: Thing[] = [];

  const blogMatch = cleanPath.match(/^\/blog\/([^/]+)$/);
  const staticRoute = STATIC_ROUTES.find((route) => route.path === cleanPath);

  // Seed company once so About/Contact render real contact data in SSG HTML.
  const company = await cached(companyKeys.profile(), getCompany);
  seed(client, companyKeys.profile(), company ?? null);

  if (blogMatch) {
    const slug = decodeURIComponent(blogMatch[1]).trim();
    canonicalPath = `/blog/${slug}`;
    const post = await cached(blogKeys.bySlug(slug), () => getBlogBySlug(slug));
    seed(client, blogKeys.bySlug(slug), post);

    if (post) {
      const postDesc =
        post.excerpt || stripHtml(post.description).slice(0, 160) || post.title;
      title = `${post.title} | ${SITE_NAME} Blog`;
      description = postDesc;
      keywords = `${post.title}, ${SITE_NAME} blog, commodity updates India`;

      schemas.push(
        organizationSchema(),
        webPageSchema(canonicalPath, title, postDesc),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: canonicalPath },
        ]),
        blogPostingSchema({
          slug,
          title: post.title,
          description: postDesc,
          image: post.image,
          datePublished: post.rawDate,
          author: post.author,
        }),
      );

      const faq = faqPageSchema(post.faqs);
      if (faq) schemas.push(faq);
    } else {
      title = SEO_CONFIG.blog.title;
      description = SEO_CONFIG.blog.description;
      keywords = SEO_CONFIG.blog.keywords;
    }
  } else if (staticRoute) {
    const cfg = SEO_CONFIG[staticRoute.key];
    title = cfg.title;
    description = cfg.description;
    keywords = cfg.keywords;
    canonicalPath = cfg.path;

    const [{ faqs, slug: faqSlug }, testiRes] = await Promise.all([
      getFaqsFirst(staticRoute.faqSlugs),
      cached(testimonialKeys.bySlug(staticRoute.testiSlug), () =>
        getTestimonials(staticRoute.testiSlug),
      ),
    ]);
    const testimonials = testiRes ?? [];
    seed(client, faqKeys.bySlug(faqSlug), faqs);
    seed(client, testimonialKeys.bySlug(staticRoute.testiSlug), testimonials);

    const { list: reviews, aggregate } = parseReviews(testimonials);
    const reviewNodes = reviews.map((r) =>
      reviewSchema({ name: r.name, body: r.body, rating: r.rating }),
    );

    const isHome = staticRoute.path === "/";
    schemas.push(
      organizationSchema(aggregate, reviewNodes),
      webPageSchema(canonicalPath, title, description),
      breadcrumbSchema(
        isHome
          ? [{ name: "Home", path: "/" }]
          : [
              { name: "Home", path: "/" },
              { name: staticRoute.label, path: staticRoute.path },
            ],
      ),
    );

    if (isHome) schemas.push(websiteSchema());

    if (staticRoute.path === "/blog") {
      const allBlogs = await cached(blogKeys.list(), getBlogs);
      seed(client, blogKeys.list(), allBlogs ?? []);
      const items = (allBlogs ?? []).map((b) => ({
        name: b.title,
        path: `/blog/${b.slug}`,
      }));
      if (items.length > 0) schemas.push(itemListSchema(items));
    }

    const faq = faqPageSchema(faqs);
    if (faq) schemas.push(faq);
  }

  const html = renderRouteHtml(url, client);

  const dehydrated = JSON.stringify(dehydrate(client)).replace(/</g, "\\u003c");
  const queryState = dehydrated.includes('"queries":[]') ? null : dehydrated;
  client.clear();

  // Discover all blog slugs so every article gets a static page.
  const allRes = await cached(blogKeys.list(), getBlogs);
  const links = new Set<string>([
    ...STATIC_ROUTES.map((r) => r.path),
    ...(allRes ?? []).map((b) => `/blog/${b.slug}`),
  ]);

  return {
    html,
    head: {
      lang: "en",
      title,
      elements: buildHeadElements(
        title,
        description,
        getCanonicalUrl(canonicalPath),
        schemas,
        queryState,
        keywords,
      ),
    },
    links,
  };
}
