import { Link } from 'react-router';
import { ArrowUpRight, CalendarDays, Clock } from 'lucide-react';
import type { Blog } from '../types';
import { getInitials, getReadTimeMinutes } from '../utils';

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

/** Shared blog card — image with overlay badges, meta row, author + arrow footer. */
export function BlogCard({ blog, className = '' }: BlogCardProps) {
  const readTime = getReadTimeMinutes(`${blog.excerpt} ${blog.description}`);

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className={`group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-navy-900/5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_24px_50px_-12px_rgb(10,36,114,0.25)] hover:ring-primary-200 ${className}`}
    >
      <div className="relative h-52 w-full shrink-0 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent opacity-80" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-navy-900 shadow-sm backdrop-blur-sm">
            {blog.category}
          </span>
          {blog.isFeatured && (
            <span className="rounded-full bg-warning-500 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
              Featured
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-wider text-muted-400">
          {blog.date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-primary-500" />
              <time dateTime={blog.rawDate} className="normal-case tracking-normal">
                {blog.date}
              </time>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary-500" />
            <span className="normal-case tracking-normal">{readTime} min read</span>
          </span>
        </div>

        <h3 className="line-clamp-2 text-[17px] font-extrabold leading-snug text-navy-900 transition-colors duration-300 group-hover:text-primary-600">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="mt-2 line-clamp-2 text-[13.5px] font-medium leading-[1.65] text-muted-500">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-auto pt-5">
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <span className="inline-flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-navy-800 text-[11px] font-extrabold text-white">
              {getInitials(blog.author)}
            </span>
            <span className="truncate text-[13px] font-bold text-navy-900">
              {blog.author}
            </span>
          </span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist-100 text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.5} />
          </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
