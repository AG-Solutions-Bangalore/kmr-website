import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Clock,
  Newspaper,
  Search,
  User,
  X,
} from 'lucide-react';
import { useBlogs } from '../hooks/useBlogs';
import { BlogCard } from '../components/BlogCard';
import { getInitials, getReadTimeMinutes } from '../utils';
import type { Blog } from '../types';

function matchesQuery(blog: Blog, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [blog.title, blog.excerpt, blog.category, blog.author]
    .join(' ')
    .toLowerCase()
    .includes(q);
}

/** Full blog listing — GET /getBlogs, with search + category filter. */
export function BlogsPage() {
  const { data, isLoading, isError } = useBlogs();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const blogs = useMemo(() => data ?? [], [data]);

  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const blog of blogs) {
      if (blog.category.trim()) unique.add(blog.category.trim());
    }
    return ['All', ...Array.from(unique).sort()];
  }, [blogs]);

  const filtered = useMemo(
    () =>
      blogs.filter(
        (blog) =>
          (activeCategory === 'All' || blog.category === activeCategory) &&
          matchesQuery(blog, query),
      ),
    [blogs, activeCategory, query],
  );

  const isFiltering = query.trim() !== '' || activeCategory !== 'All';
  const [lead, ...rest] = isFiltering ? [] : filtered;
  const gridBlogs = isFiltering ? filtered : rest;

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('All');
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mist-100">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary-100 opacity-60 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-success-100 opacity-50 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <nav className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-500">
            <Link to="/" className="transition-colors hover:text-primary-600">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary-600">Blogs</span>
          </nav>

          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="flex w-fit items-center gap-2 rounded-full border border-primary-600/30 bg-primary-600/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-primary-600">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
                Our Blog
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
                Stories &amp; market insights
              </h1>
              <p className="mt-3 max-w-xl text-[14px] font-medium leading-relaxed text-muted-500 sm:text-[15px]">
                Expert analysis, price trends and stories from India&apos;s
                commodity markets — written by the KMR LIVE team.
              </p>
            </div>

            {/* Search */}
            <div className="w-full lg:max-w-sm">
              <label htmlFor="blog-search" className="sr-only">
                Search blogs
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_8px_30px_rgb(10,36,114,0.08)] ring-1 ring-navy-900/5 transition-all focus-within:border-primary-300 focus-within:ring-2 focus-within:ring-primary-100">
                <Search className="h-4.5 w-4.5 shrink-0 text-muted-400" strokeWidth={2.5} />
                <input
                  id="blog-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stories, topics, authors…"
                  className="w-full bg-transparent text-[14px] font-medium text-navy-900 outline-none placeholder:text-muted-400"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mist-100 text-muted-500 transition-colors hover:bg-mist-200 hover:text-navy-900"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category pills */}
          {!isLoading && categories.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                const count =
                  category === 'All'
                    ? blogs.length
                    : blogs.filter((b) => b.category === category).length;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-navy-900 text-white shadow-md'
                        : 'bg-white text-navy-800 ring-1 ring-navy-900/10 hover:bg-mist-100 hover:ring-primary-200'
                    }`}
                  >
                    {category}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-mist-100 text-muted-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {isLoading && <BlogsSkeleton />}

        {!isLoading && (isError || blogs.length === 0) && (
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center sm:p-14">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mist-100 text-primary-600">
              <Newspaper className="h-7 w-7" />
            </span>
            <p className="mt-4 text-[17px] font-extrabold text-navy-900">
              No blogs available right now
            </p>
            <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] font-medium leading-relaxed text-muted-500">
              Please check back soon for expert market analysis and stories from
              the KMR LIVE team.
            </p>
            <Link
              to="/"
              className="group mx-auto mt-5 inline-flex h-[44px] items-center rounded-xl bg-primary-600 px-6 text-sm font-bold text-white shadow-md transition-colors hover:bg-primary-700"
            >
              Back to home
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {!isLoading && blogs.length > 0 && filtered.length === 0 && (
          <div className="mx-auto max-w-lg rounded-3xl border border-dashed border-gray-200 bg-white p-10 text-center sm:p-14">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-mist-100 text-primary-600">
              <Search className="h-7 w-7" />
            </span>
            <p className="mt-4 text-[17px] font-extrabold text-navy-900">
              No stories match your search
            </p>
            <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] font-medium leading-relaxed text-muted-500">
              Try a different keyword or browse another category.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mx-auto mt-5 inline-flex h-[44px] items-center rounded-xl bg-navy-900 px-6 text-sm font-bold text-white shadow-md transition-colors hover:bg-navy-800"
            >
              Clear filters
              <X className="ml-2 h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {!isLoading && filtered.length > 0 && (
          <>
            {isFiltering && (
              <p className="mb-6 text-[13px] font-bold uppercase tracking-wider text-muted-400">
                Showing{' '}
                <span className="text-navy-900">
                  {filtered.length} of {blogs.length}
                </span>{' '}
                {filtered.length === 1 ? 'story' : 'stories'}
              </p>
            )}

            {/* Lead story */}
            {lead && <LeadCard blog={lead} />}

            {/* Grid */}
            {gridBlogs.length > 0 && (
              <div
                className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 ${lead ? 'mt-6 lg:mt-8' : ''}`}
              >
                {gridBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}

/** Large lead story card — first post shown as a horizontal feature. */
function LeadCard({ blog }: { blog: Blog }) {
  const readTime = getReadTimeMinutes(`${blog.excerpt} ${blog.description}`);

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className="group grid grid-cols-1 overflow-hidden rounded-3xl bg-navy-900 ring-1 ring-navy-900/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-15px_rgb(10,36,114,0.5)] md:grid-cols-2"
    >
      <div className="relative min-h-64 overflow-hidden sm:min-h-80 md:min-h-full">
        <img
          src={blog.image}
          alt={blog.imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-navy-900 shadow-sm backdrop-blur-sm">
            {blog.category}
          </span>
          <span className="rounded-full bg-warning-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
            Latest Story
          </span>
        </div>
      </div>

      <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-600/20 blur-3xl"
        />
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] font-bold uppercase tracking-wider text-blue-200">
          {blog.date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              <time dateTime={blog.rawDate} className="normal-case tracking-normal">
                {blog.date}
              </time>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="normal-case tracking-normal">{readTime} min read</span>
          </span>
        </div>

        <h2 className="mt-3 line-clamp-3 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[28px]">
          {blog.title}
        </h2>

        {blog.excerpt && (
          <p className="mt-3 line-clamp-3 text-[14px] font-medium leading-[1.7] text-blue-100/90">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[12px] font-extrabold text-white ring-1 ring-white/25 backdrop-blur-sm">
              {getInitials(blog.author)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-white">
              <User className="h-3.5 w-3.5 text-blue-200" />
              {blog.author}
            </span>
          </span>
          <span className="inline-flex h-[44px] items-center rounded-xl bg-white px-5 text-sm font-bold text-navy-900 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white">
            Read story
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Loading skeleton matching the new layout. */
function BlogsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-white ring-1 ring-navy-900/5 md:grid-cols-2">
        <div className="min-h-64 bg-gray-200 sm:min-h-80" />
        <div className="space-y-4 p-6 sm:p-10">
          <div className="h-4 w-1/3 rounded bg-gray-200" />
          <div className="h-7 rounded bg-gray-200" />
          <div className="h-7 w-4/5 rounded bg-gray-200" />
          <div className="h-4 rounded bg-gray-100" />
          <div className="h-4 w-2/3 rounded bg-gray-100" />
          <div className="h-11 w-36 rounded-xl bg-gray-200" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl bg-white ring-1 ring-navy-900/5"
          >
            <div className="h-52 bg-gray-200" />
            <div className="space-y-3 p-5 sm:p-6">
              <div className="h-4 w-1/3 rounded bg-gray-200" />
              <div className="h-5 rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-100" />
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="h-9 w-24 rounded-full bg-gray-100" />
                <div className="h-9 w-9 rounded-full bg-gray-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogsPage;
