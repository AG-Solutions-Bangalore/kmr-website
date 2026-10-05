import { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CalendarDays, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useFeaturedBlogs } from '../hooks/useBlogs';

gsap.registerPlugin(ScrollTrigger);

interface FeaturedBlogsSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Featured blogs — GET /getFeaturedBlogs ONLY.
 * Hero layout: first post large on the left, the rest as a side list.
 * Renders NOTHING while loading, on error, or when the API returns no rows.
 */
export function FeaturedBlogsSection({
  eyebrow = 'Featured Stories',
  title = 'Featured Blogs',
  subtitle = 'Hand-picked stories and market analysis from the KMR LIVE team.',
}: FeaturedBlogsSectionProps) {
  const { data } = useFeaturedBlogs();
  const sectionRef = useRef<HTMLElement>(null);

  const blogs = data ?? [];
  const hasData = blogs.length > 0;
  const [hero, ...rest] = blogs;

  useGSAP(
    () => {
      if (!sectionRef.current || !hasData) return;
      gsap.fromTo(
        '.featured-blog-element',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [hasData] },
  );

  if (!hero) return null;

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16"
    >
      <div className="container relative z-10 mx-auto max-w-[1300px] px-4 md:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-10 md:flex-row md:items-end lg:mb-12">
          <div className="flex max-w-2xl flex-col items-start">
            <div className="featured-blog-element mb-3 flex items-center gap-2 rounded-full border border-warning-200 bg-warning-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-warning-600 sm:mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-warning-500" />
              {eyebrow}
            </div>
            <h2 className="featured-blog-element mb-2 text-2xl font-extrabold tracking-tight text-navy-900 sm:mb-3 sm:text-3xl lg:text-[2.2rem]">
              {title}
            </h2>
            <p className="featured-blog-element text-[13px] font-medium text-muted-500 sm:text-[14px]">
              {subtitle}
            </p>
          </div>

          <Link
            to="/blog"
            className="featured-blog-element group hidden h-[42px] items-center rounded-lg border border-[#145eb5]/30 bg-white px-6 text-sm font-bold text-[#145eb5] shadow-sm transition-all duration-300 hover:bg-[#145eb5] hover:text-white md:inline-flex"
          >
            View All Blogs
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Hero card */}
          <Link
            to={`/blog/${hero.slug}`}
            className="featured-blog-element group relative flex min-h-[320px] flex-col justify-end overflow-hidden rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.1)] sm:min-h-[400px] lg:col-span-3"
          >
            <img
              src={hero.image}
              alt={hero.imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
            <div className="relative flex flex-col p-5 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                  {hero.category}
                </span>
                <span className="rounded-full bg-warning-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Featured
                </span>
              </div>
              <h3 className="mb-2 line-clamp-2 text-xl font-extrabold leading-tight text-white sm:text-2xl lg:text-[1.7rem]">
                {hero.title}
              </h3>
              {hero.excerpt && (
                <p className="mb-4 line-clamp-2 max-w-xl text-[13px] font-medium leading-[1.6] text-white/80 sm:text-[14px]">
                  {hero.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] font-semibold text-white/70">
                {hero.author && (
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5" />
                    {hero.author}
                  </span>
                )}
                {hero.date && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <time dateTime={hero.rawDate}>{hero.date}</time>
                  </span>
                )}
              </div>
            </div>
          </Link>

          {/* Side list */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-2">
            {rest.slice(0, 4).map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.slug}`}
                className="featured-blog-element group flex gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_4px_20px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] sm:p-4"
              >
                <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-32">
                  <img
                    src={blog.image}
                    alt={blog.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-teal-600">
                    {blog.category}
                  </span>
                  <h4 className="line-clamp-2 text-[14px] font-extrabold leading-snug text-navy-900 transition-colors group-hover:text-[#145eb5] sm:text-[15px]">
                    {blog.title}
                  </h4>
                  {blog.date && (
                    <time
                      dateTime={blog.rawDate}
                      className="mt-1 text-[11px] font-semibold text-muted-400"
                    >
                      {blog.date}
                    </time>
                  )}
                </div>
              </Link>
            ))}

            {rest.length === 0 && hero && (
              <div className="featured-blog-element flex flex-1 flex-col justify-center rounded-2xl border border-dashed border-gray-200 bg-mist-50 p-6 text-center">
                <p className="text-[14px] font-bold text-navy-900">
                  More featured stories coming soon
                </p>
                <p className="mx-auto mt-1 max-w-xs text-[13px] font-medium text-muted-500">
                  {hero.excerpt || 'Stay tuned for expert market analysis.'}
                </p>
                <Link
                  to={`/blog/${hero.slug}`}
                  className="group mx-auto mt-4 inline-flex items-center text-[13px] font-bold text-[#145eb5]"
                >
                  Read featured story
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBlogsSection;
