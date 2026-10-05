import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import type { Blog } from '../types';

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

/** Shared blog card — matches the Market Insights visual language. */
export function BlogCard({ blog, className = '' }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${blog.slug}`}
      className={`blog-element group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] ${className}`}
    >
      <div className="relative h-48 w-full overflow-hidden sm:h-56">
        <img
          src={blog.image}
          alt={blog.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="rounded-full border border-teal-100 bg-teal-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600">
            {blog.category}
          </span>
          {blog.date && (
            <time
              dateTime={blog.rawDate}
              className="shrink-0 text-[11px] font-semibold text-muted-400"
            >
              {blog.date}
            </time>
          )}
        </div>

        <h3 className="mb-3 line-clamp-2 text-[16px] font-extrabold leading-tight text-navy-900 transition-colors duration-300 group-hover:text-[#145eb5]">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="mb-6 line-clamp-2 text-[13px] font-medium leading-[1.6] text-muted-500">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center text-[13px] font-bold text-[#145eb5]">
          Read More
          <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
