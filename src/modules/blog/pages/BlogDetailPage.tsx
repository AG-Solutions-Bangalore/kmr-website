import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, CalendarDays, User } from 'lucide-react';
import { useBlogBySlug } from '../hooks/useBlogs';

/** Blog detail — GET /getBlogsBySlug/:slug with prev/next + featured sidebar. */
export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading, isError } = useBlogBySlug(slug);

  if (isLoading) {
    return (
      <div className="w-full bg-white py-12 sm:py-16">
        <div className="container mx-auto max-w-[1100px] animate-pulse px-4 md:px-8">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="mt-4 h-8 w-3/4 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-1/2 rounded bg-gray-100" />
          <div className="mt-8 h-72 rounded-2xl bg-gray-200 sm:h-96" />
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
      <div className="w-full bg-white py-16 sm:py-20">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <h1 className="text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Blog not found
          </h1>
          <p className="mt-2 text-[14px] font-medium text-muted-500">
            The story you are looking for does not exist or was removed.
          </p>
          <Link
            to="/blog"
            className="group mx-auto mt-6 inline-flex h-[42px] items-center rounded-lg bg-[#145eb5] px-6 text-sm font-bold text-white transition-colors hover:bg-[#0f4a94]"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="w-full bg-white py-10 sm:py-14">
      <div className="container mx-auto max-w-[1100px] px-4 md:px-8">
        <nav aria-label="Breadcrumb" className="mb-5 text-[12px] font-semibold text-muted-400">
          <Link to="/" className="transition-colors hover:text-[#145eb5]">
            Home
          </Link>
          <span className="mx-1.5">/</span>
          <Link to="/blog" className="transition-colors hover:text-[#145eb5]">
            Blog
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-navy-900">{blog.title}</span>
        </nav>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-teal-100 bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600">
            {blog.category}
          </span>
          {blog.isFeatured && (
            <span className="rounded-full bg-warning-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
        </div>

        <h1 className="max-w-3xl text-2xl font-extrabold leading-tight tracking-tight text-navy-900 sm:text-4xl">
          {blog.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-muted-500">
          {blog.author && (
            <span className="inline-flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {blog.author}
            </span>
          )}
          {blog.date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={blog.rawDate}>{blog.date}</time>
            </span>
          )}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] sm:mt-8">
          <img
            src={blog.image}
            alt={blog.imageAlt}
            className="max-h-[480px] w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {blog.excerpt && (
              <p className="border-l-4 border-[#145eb5] bg-mist-50 px-4 py-3 text-[15px] font-semibold leading-[1.7] text-navy-800">
                {blog.excerpt}
              </p>
            )}
            {blog.description ? (
              <div className="prose-blog mt-6 whitespace-pre-line text-[15px] font-medium leading-[1.8] text-muted-600">
                {blog.description}
              </div>
            ) : (
              <p className="mt-6 text-[15px] font-medium leading-[1.8] text-muted-600">
                Full story coming soon.
              </p>
            )}

            <div className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-stretch sm:justify-between">
              {blog.previous ? (
                <Link
                  to={`/blog/${blog.previous.slug}`}
                  className="group flex flex-1 items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-left transition-all hover:border-primary-200 hover:shadow-md"
                >
                  <ArrowLeft className="h-4 w-4 shrink-0 text-[#145eb5] transition-transform group-hover:-translate-x-1" />
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-400">
                      Previous
                    </span>
                    <span className="line-clamp-1 text-[13px] font-bold text-navy-900">
                      {blog.previous.title}
                    </span>
                  </span>
                </Link>
              ) : (
                <span className="hidden flex-1 sm:block" />
              )}
              {blog.next && (
                <Link
                  to={`/blog/${blog.next.slug}`}
                  className="group flex flex-1 items-center justify-end gap-2 rounded-xl border border-gray-100 bg-white p-4 text-right transition-all hover:border-primary-200 hover:shadow-md"
                >
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-400">
                      Next
                    </span>
                    <span className="line-clamp-1 text-[13px] font-bold text-navy-900">
                      {blog.next.title}
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#145eb5] transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

          {blog.featured.length > 0 && (
            <aside className="lg:col-span-1">
              <div className="rounded-2xl border border-gray-100 bg-mist-50 p-5 sm:p-6">
                <h2 className="mb-4 text-[15px] font-extrabold uppercase tracking-wider text-navy-900">
                  Featured Blogs
                </h2>
                <div className="flex flex-col gap-4">
                  {blog.featured.slice(0, 5).map((item) => (
                    <Link
                      key={item.id}
                      to={`/blog/${item.slug}`}
                      className="group flex gap-3"
                    >
                      <div className="h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={item.image}
                          alt={item.imageAlt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-[13px] font-bold leading-snug text-navy-900 transition-colors group-hover:text-[#145eb5]">
                          {item.title}
                        </h3>
                        {item.date && (
                          <time
                            dateTime={item.rawDate}
                            className="mt-1 block text-[11px] font-semibold text-muted-400"
                          >
                            {item.date}
                          </time>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </article>
  );
}

export default BlogDetailPage;
