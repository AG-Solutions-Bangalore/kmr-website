import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router";
import {
  ChevronRight,
  Download,
  Home,
  Mail,
  Menu,
  Newspaper,
  Phone,
  Users,
  X,
} from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { useCompany, formatIndianMobile, COMPANY_FALLBACK } from "@/modules/company";
// Logo served from `public/logo.webp` (stable URL, cached by the browser).
const logo = "/logo.webp";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Home", path: "/", icon: Home },
  { label: "About Us", path: "/about", icon: Users },
  { label: "Blogs", path: "/blog", icon: Newspaper },
  { label: "Contact Us", path: "/contact", icon: Mail },
];

function isPathActive(pathname: string, path: string) {
  return pathname === path || (path === "/blog" && pathname.startsWith("/blog"));
}

function Navbar() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();
  const { data: company = COMPANY_FALLBACK } = useCompany();

  const closeMenu = () => setMobileMenuOpen(false);

  // Close the sidebar on every route change.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock page scroll while the sidebar is open (Lenis + native fallback).
  // Both <html> and <body> are locked — iOS Safari ignores a body-only lock.
  useEffect(() => {
    if (mobileMenuOpen) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, lenis]);

  // Close on Escape.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  useGSAP(
    () => {
      // Professional Apple-like ease
      const customEase = "power3.out";
      const tl = gsap.timeline({ defaults: { ease: customEase } });

      // 1. Cinematic drop of the navbar container (faster)
      tl.from(navRef.current, {
        y: -15,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.8,
      })
        // 2. Logo gracefully un-blurs
        .from(
          ".nav-logo",
          {
            opacity: 0,
            filter: "blur(4px)",
            duration: 0.8,
          },
          "-=0.5",
        )
        // 3. Links smoothly stagger down
        .from(
          ".nav-link",
          {
            opacity: 0,
            y: -8,
            duration: 0.7,
            stagger: 0.05,
            filter: "blur(3px)",
          },
          "-=0.6",
        )
        // 4. Right side actions gently fade and slide in.
        .from(
          ".nav-actions-wrapper",
          {
            opacity: 0,
            x: 10,
            duration: 0.7,
            filter: "blur(4px)",
            clearProps: "all",
          },
          "-=0.6",
        );
    },
    { scope: navRef },
  );

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="mx-auto flex h-19.25 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex items-center md:w-1/4">
          <Link
            to="/"
            className="nav-logo flex-shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={logo}
              alt="KMR LIVE"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex flex-1 items-center justify-center h-full">
          {NAV_LINKS.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/blog" && location.pathname.startsWith("/blog"));

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`nav-link relative flex h-full items-center px-4 text-[13px] font-bold tracking-wide transition-colors lg:px-5 ${
                  isActive
                    ? "text-primary-600"
                    : "text-navy-800 hover:text-primary-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="nav-actions-wrapper flex items-center justify-end gap-3 sm:gap-5 md:w-1/4">
          <Button className="hidden sm:flex h-[42px] px-6 text-sm font-bold bg-[#145eb5] hover:bg-[#145eb5]/90 text-white shadow-md rounded-full">
            Download App
            <Download className="ml-2 h-[18px] w-[18px]" strokeWidth={2.5} />
          </Button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex md:hidden items-center justify-center p-2 rounded-lg text-navy-800 hover:bg-mist-100 hover:text-primary-600 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={2.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar (slide-in drawer, rendered above all content) */}
      {createPortal(
        <div
          className={`md:hidden ${mobileMenuOpen ? "" : "pointer-events-none"}`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Overlay */}
          <div
            onClick={closeMenu}
            className={`fixed inset-0 z-[60] bg-navy-900/50 backdrop-blur-sm transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Panel */}
          <aside
            role="dialog"
            aria-label="Mobile navigation"
            className={`fixed top-0 right-0 z-[61] flex h-full w-[86%] max-w-[340px] flex-col overflow-hidden rounded-l-[20px] bg-white shadow-2xl transition-transform duration-300 ease-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <img src={logo} alt="KMR LIVE" className="h-8 w-auto object-contain" />
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation menu"
                tabIndex={mobileMenuOpen ? 0 : -1}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-mist-100 text-navy-800 transition-colors hover:bg-mist-200"
              >
                <X className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-2">
              {NAV_LINKS.map((link, i) => {
                const isActive = isPathActive(location.pathname, link.path);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={closeMenu}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    style={{
                      transitionDelay: mobileMenuOpen ? `${120 + i * 60}ms` : "0ms",
                    }}
                    className={`flex items-center justify-between border-b border-gray-100 px-2 py-4 text-[15px] font-bold transition-all duration-300 last:border-b-0 ${
                      mobileMenuOpen
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0"
                    } ${
                      isActive
                        ? "text-[#145eb5]"
                        : "text-navy-800"
                    }`}
                  >
                    <span className="flex items-center gap-3.5">
                      <Icon
                        className={`h-5 w-5 ${isActive ? "text-[#145eb5]" : "text-gray-400"}`}
                        strokeWidth={2.25}
                      />
                      {link.label}
                    </span>
                    <ChevronRight
                      className={`h-4 w-4 ${isActive ? "text-[#145eb5]" : "text-gray-300"}`}
                      strokeWidth={2.5}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Footer: CTA + contact */}
            <div className="px-5 pb-6 pt-2">
              <Button
                asChild
                className="h-[48px] w-full rounded-full bg-[#145eb5] text-sm font-bold text-white shadow-md hover:bg-[#145eb5]/90"
                onClick={closeMenu}
              >
                <a href="#app" className="flex items-center justify-center">
                  Download App
                  <Download className="ml-2 h-[18px] w-[18px]" strokeWidth={2.5} />
                </a>
              </Button>
              <div className="mt-4 flex flex-col gap-2.5">
                {company.phones.slice(0, 1).map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-2.5 text-[13px] font-bold text-navy-800"
                  >
                    <Phone className="h-4 w-4 text-[#145eb5]" strokeWidth={2.5} />
                    {formatIndianMobile(phone)}
                  </a>
                ))}
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2.5 text-[13px] font-bold text-navy-800"
                >
                  <Mail className="h-4 w-4 text-[#145eb5]" strokeWidth={2.5} />
                  {company.email}
                </a>
              </div>
            </div>
          </aside>
        </div>,
        document.body,
      )}
    </header>
  );
}

export default Navbar;
