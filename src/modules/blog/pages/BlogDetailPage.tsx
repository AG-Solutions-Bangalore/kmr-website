import { useState } from 'react';
import { Link, useParams } from 'react-router';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Link2,
  Newspaper,
} from 'lucide-react';
import { useBlogBySlug } from '../hooks/useBlogs';
import { BlogCard } from '../components/BlogCard';
import { getInitials, getReadTimeMinutes } from '../utils';

/** Blog detail — GET /getBlogsBySlug/:slug with prev/next + more stories. */
export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading, isError } = useBlogBySlug(slug);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white py-12 sm:py-16">
        <div className="mx-auto w-full max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="mt-4 h-9 w-3/4 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-1/3 rounded bg-gray-100" />
          <div className="mt-8 h-72 rounded-3xl bg-gray-200 sm:h-96" />
          <div className="mt-8 space-y-3">
            <div className="h-4 rounded bg-gray-100" />
            <div className="h-4 rounded bg-gray-100" />
            <div className="h-4 w-2/3 rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="w-full bg-white py-16 sm:py-24">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mist-100 text-primary-600">
            <Newspaper className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
            Blog not found
          </h1>
          <p className="mt-2 text-[14px] font-medium text-muted-500">
            The story you are looking for does not exist or was removed.
          </p>
          <Link
            to="/blog"
            className="group mx-auto mt-6 inline-flex h-[44px] items-center rounded-xl bg-primary-600 px-6 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  const readTime = getReadTimeMinutes(`${blog.excerpt} ${blog.description}`);
  const isHtml = /<\s*(h1|h2|h3|h4|p|ul|ol|li|div|br|strong|em|blockquote|img)[\s>]/.test(
    blog.description,
  );
  const textParagraphs = !isHtml
    ? blog.description
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mist-100">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-100 opacity-60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-success-100 opacity-50 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-500"
          >
            <Link to="/" className="transition-colors hover:text-primary-600">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/blog" className="transition-colors hover:text-primary-600">
              Blogs
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary-600 normal-case tracking-normal">
              {blog.title.length > 48 ? `${blog.title.slice(0, 48)}…` : blog.title}
            </span>
          </nav>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-navy-900 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
              {blog.category}
            </span>
            {blog.isFeatured && (
              <span className="rounded-full bg-warning-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                Featured
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-extrabold leading-[1.15] tracking-tight text-navy-900 sm:text-4xl lg:text-[44px]">
            {blog.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              <span className="inline-flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-navy-800 text-[12px] font-extrabold text-white">
                  {getInitials(blog.author)}
                </span>
                <span className="text-[13.5px] font-bold text-navy-900">
                  {blog.author}
                </span>
              </span>
              {blog.date && (
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-500">
                  <CalendarDays className="h-4 w-4 text-primary-500" />
                  <time dateTime={blog.rawDate}>{blog.date}</time>
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-500">
                <Clock className="h-4 w-4 text-primary-500" />
                {readTime} min read
              </span>
            </div>

            <button
              type="button"
              onClick={copyLink}
              className={`inline-flex h-[40px] items-center gap-2 rounded-xl px-4 text-[13px] font-bold shadow-sm ring-1 transition-all ${
                copied
                  ? 'bg-success-600 text-white ring-success-600'
                  : 'bg-white text-navy-900 ring-navy-900/10 hover:ring-primary-300'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  Link copied
                </>
              ) : (
                <>
                  <Link2 className="h-4 w-4" strokeWidth={2.5} />
                  Copy link
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="overflow-hidden rounded-3xl shadow-[0_20px_50px_-12px_rgb(10,36,114,0.25)] ring-1 ring-navy-900/5">
          <img
            src={blog.image}
            alt={blog.imageAlt}
            className="max-h-[500px] w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="mt-8 sm:mt-10">
          {blog.excerpt && (
            <p className="rounded-2xl border-l-4 border-primary-600 bg-mist-100 px-5 py-4 text-[16px] font-semibold leading-[1.7] text-navy-800">
              {blog.excerpt}
            </p>
          )}

          {isHtml ? (
            /* CMS body is rich HTML (h2/h3/ul/li/…) — render it as HTML with styled elements. */
            <div
              className="mt-6 text-[15.5px] font-medium leading-[1.85] text-muted-600 [&_a]:font-bold [&_a]:text-primary-600 [&_a]:underline [&_blockquote]:rounded-r-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-primary-600 [&_blockquote]:bg-mist-100 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-navy-800 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-navy-900 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:tracking-tight [&_h3]:text-navy-900 [&_img]:my-6 [&_img]:w-full [&_img]:rounded-2xl [&_img]:object-cover [&_li]:leading-[1.8] [&_li]:text-muted-600 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2.5 [&_ol]:pl-6 [&_ol]:marker:font-bold [&_ol]:marker:text-primary-600 [&_p]:mt-4 [&_strong]:font-bold [&_strong]:text-navy-900 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2.5 [&_ul]:pl-6 [&_ul]:marker:text-primary-600"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            />
          ) : textParagraphs.length > 0 ? (
            <div className="mt-6 space-y-5">
              {textParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[15.5px] font-medium leading-[1.85] text-muted-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            !blog.excerpt && (
              <p className="mt-6 text-[15.5px] font-medium leading-[1.85] text-muted-600">
                Full story coming soon.
              </p>
            )
          )}

          {/* Author card */}
          <div className="mt-10 flex items-center gap-4 rounded-3xl bg-navy-900 p-5 sm:p-6">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-[16px] font-extrabold text-white ring-1 ring-white/25">
              {getInitials(blog.author)}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-blue-200">
                Written by
              </p>
              <p className="truncate text-[16px] font-extrabold text-white">
                {blog.author}
              </p>
              {blog.category && (
                <p className="mt-0.5 text-[12.5px] font-medium text-blue-200">
                  Covering {blog.category} for KMR LIVE
                </p>
              )}
            </div>
          </div>

          {/* Prev / Next */}
          {(blog.previous || blog.next) && (
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {blog.previous ? (
                <Link
                  to={`/blog/${blog.previous.slug}`}
                  className="group flex items-center gap-3 rounded-2xl bg-white p-4 text-left ring-1 ring-navy-900/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary-200"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-400">
                      Previous story
                    </span>
                    <span className="line-clamp-1 text-[13.5px] font-bold text-navy-900">
                      {blog.previous.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span className="hidden sm:block" />
              )}
              {blog.next && (
                <Link
                  to={`/blog/${blog.next.slug}`}
                  className="group flex items-center justify-end gap-3 rounded-2xl bg-white p-4 text-right ring-1 ring-navy-900/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary-200"
                >
                  <span className="min-w-0">
                    <span className="block text-[10px] font-extrabold uppercase tracking-wider text-muted-400">
                      Next story
                    </span>
                    <span className="line-clamp-1 text-[13.5px] font-bold text-navy-900">
                      {blog.next.title}
                    </span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* More stories */}
        {blog.featured.length > 0 && (
          <div className="mt-14 sm:mt-16">
            <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
              <div>
                <div className="flex w-fit items-center gap-2 rounded-full border border-blue-200/50 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#145eb5]" />
                  Keep reading
                </div>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-navy-900 sm:text-3xl">
                  More stories
                </h2>
              </div>
              <Link
                to="/blog"
                className="group hidden shrink-0 items-center text-[13px] font-bold text-[#145eb5] sm:inline-flex"
              >
                View all
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {blog.featured.slice(0, 3).map((item) => (
                <BlogCard key={item.id} blog={item} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}

export default BlogDetailPage;
