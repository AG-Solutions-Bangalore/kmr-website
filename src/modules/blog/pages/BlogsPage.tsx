import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useBlogs } from '../hooks/useBlogs';
import { BlogCard } from '../components/BlogCard';

/** Full blog listing — GET /getBlogs. */
export function BlogsPage() {
  const { data, isLoading, isError } = useBlogs();
  const blogs = data ?? [];

  return (
    <div className="w-full bg-gradient-to-b from-[#f0f7ff] to-white py-12 sm:py-16">
      <div className="container mx-auto max-w-[1300px] px-4 md:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <div className="mb-3 flex w-fit items-center gap-2 rounded-full border border-blue-200/50 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5] sm:mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#145eb5]" />
            Our Blog
          </div>
          <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-navy-900 sm:text-[2.2rem]">
            Latest Blogs &amp; Insights
          </h1>
          <p className="text-[14px] font-medium text-muted-500">
            Expert analysis, news and trends from the commodity market.
          </p>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
              >
                <div className="h-48 bg-gray-200 sm:h-56" />
                <div className="space-y-3 p-5 sm:p-6">
                  <div className="h-4 w-1/3 rounded bg-gray-200" />
                  <div className="h-5 rounded bg-gray-200" />
                  <div className="h-4 w-2/3 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && (isError || blogs.length === 0) && (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
            <p className="text-[15px] font-bold text-navy-900">
              No blogs available right now
            </p>
            <p className="mx-auto mt-1 max-w-sm text-[13px] font-medium text-muted-500">
              Please check back soon for expert market analysis and stories.
            </p>
            <Link
              to="/"
              className="group mx-auto mt-4 inline-flex items-center text-[13px] font-bold text-[#145eb5]"
            >
              Back to home
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        )}

        {!isLoading && blogs.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogsPage;
