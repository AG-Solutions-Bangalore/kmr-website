import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { useLenis } from "lenis/react";
import Navbar from "./header/Navbar";
import Footer from "./footer/Footer";
import { TestimonialSection } from "@/modules/testimonial";
import { FaqSection } from "@/modules/faq";

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // Lenis owns the scroll position — a plain window.scrollTo gets
    // overridden on the next animation frame, leaving the new page
    // stuck at the previous offset (e.g. footer).
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

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
