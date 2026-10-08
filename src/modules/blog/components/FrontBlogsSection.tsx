import { useMemo, useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useFeaturedBlogs, useFrontBlogs } from '../hooks/useBlogs';
import { BlogCard } from './BlogCard';
import leaf1 from '@/assets/category/leaf1.webp';
import leaf3 from '@/assets/category/leaf3.webp';

gsap.registerPlugin(ScrollTrigger);

interface FrontBlogsSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  /** Max cards to show on the home page. Defaults to 3. */
  limit?: number;
}

/**
 * Front blogs — GET /getFrontBlogs ONLY.
 * Stories already shown in the Featured section (GET /getFeaturedBlogs)
 * are excluded here so each blog appears once on home.
 * Renders NOTHING while loading, on error, or when the API returns no rows.
 */
export function FrontBlogsSection({
  eyebrow = 'Market Insights',
  title = 'Latest Market Insights',
  subtitle = 'Stay informed with expert analysis, news and trends from the commodity market.',
  limit = 3,
}: FrontBlogsSectionProps) {
  const { data } = useFrontBlogs();
  const { data: featured } = useFeaturedBlogs();
  const sectionRef = useRef<HTMLElement>(null);

  // Strictly front-API data: drop any story already rendered as featured.
  const featuredSlugs = useMemo(
    () => new Set((featured ?? []).map((blog) => blog.slug)),
    [featured],
  );
  const blogs = (data ?? [])
    .filter((blog) => !featuredSlugs.has(blog.slug))
    .slice(0, limit);
  const hasData = blogs.length > 0;

  useGSAP(
    () => {
      if (!sectionRef.current || !hasData) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        '.front-blog-header',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power4.out' },
      );

      tl.fromTo(
        '.blog-element',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          clearProps: 'all',
        },
        '-=0.6',
      );

      tl.fromTo(
        '.front-blog-leaf',
        { y: 40, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: 'expo.out' },
        '-=1.0',
      );
    },
    { scope: sectionRef, dependencies: [hasData] },
  );

  if (!hasData) return null;

  const gridClass =
    blogs.length === 1
      ? 'grid grid-cols-1 gap-6 lg:gap-8 max-w-2xl mx-auto'
      : blogs.length === 2
        ? 'grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto'
        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8';

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#f0f7ff] to-white py-12 sm:py-16"
    >
      <img
        src={leaf3}
        alt=""
        aria-hidden="true"
        className="front-blog-leaf pointer-events-none absolute -left-28 top-10 h-auto w-48 object-contain mix-blend-multiply blur-[0.5px] md:w-64 lg:w-80"
      />
      <img
        src={leaf1}
        alt=""
        aria-hidden="true"
        className="front-blog-leaf pointer-events-none absolute -bottom-10 -right-20 h-auto w-52 object-contain mix-blend-multiply blur-[1px] md:w-64 lg:w-80"
      />

      <div className="container relative z-10 mx-auto max-w-[1300px] px-4 md:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 sm:mb-10 md:flex-row md:items-end lg:mb-14">
          <div className="flex max-w-2xl flex-col items-start">
            <div className="front-blog-header mb-3 flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#145eb5] sm:mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#145eb5]" />
              {eyebrow}
            </div>
            <h2 className="front-blog-header mb-2 text-2xl font-extrabold tracking-tight text-navy-900 sm:mb-3 sm:text-3xl lg:text-[2.2rem]">
              {title}
            </h2>
            <p className="front-blog-header text-[13px] font-medium text-muted-500 sm:text-[14px]">
              {subtitle}
            </p>
          </div>

          <Link
            to="/blog"
            className="front-blog-header group hidden h-[42px] items-center rounded-lg border border-[#145eb5]/30 bg-white px-6 text-sm font-bold text-[#145eb5] shadow-sm transition-all duration-300 hover:bg-[#145eb5] hover:text-white md:inline-flex"
          >
            View All Insights
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </Link>
        </div>

        <div className={gridClass}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        <Link
          to="/blog"
          className="group mt-8 inline-flex h-[46px] w-full items-center justify-center rounded-lg border border-[#145eb5] bg-white font-bold text-[#145eb5] shadow-sm transition-all duration-300 hover:bg-[#145eb5] hover:text-white md:hidden"
        >
          View All Insights
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

export default FrontBlogsSection;
