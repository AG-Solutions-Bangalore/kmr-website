import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useLenis } from "lenis/react";
import Navbar from "./header/Navbar";
import Footer from "./footer/Footer";
import { TestimonialSection } from "@/modules/testimonial";
import { FaqSection } from "@/modules/faq";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    const scrollToHashTarget = () => {
      if (!hash) return false;
      const el = document.getElementById(hash.replace("#", ""));
      if (!el) return false;
      // Lenis owns the scroll position — use it so sticky header offset applies smoothly.
      if (lenis) {
        lenis.scrollTo(el, { offset: -76, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return true;
    };

    if (hash) {
      // Same-page hash change scrolls immediately; cross-page nav
      // (e.g. /about -> /#categories) needs a retry after HomePage mounts.
      if (!scrollToHashTarget()) {
        const t1 = setTimeout(scrollToHashTarget, 120);
        const t2 = setTimeout(scrollToHashTarget, 500);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
      return;
    }

    // Plain route change — back to top (Lenis owns scroll, plain
    // window.scrollTo gets overridden on the next animation frame).
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenis]);

  return null;
}

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global FAQ — API rows win; home falls back to static FAQs; other pages render nothing when empty. */}
      <FaqSection />

      {/* Global testimonials — renders only when the API returns rows for the current page slug. */}
      <TestimonialSection />

      <Footer />
    </div>
  );
}
