import { useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { Search, Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/common/logo.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Category", path: "#category" },
  { label: "Blogs", path: "/blog" },
  { label: "FAQ", path: "#faq" },
  { label: "Contact Us", path: "/contact" },
];

function Navbar() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useGSAP(() => {
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
    .from(".nav-logo", {
      opacity: 0,
      filter: "blur(4px)",
      duration: 0.8,
    }, "-=0.5")
    // 3. Links smoothly stagger down
    .from(".nav-link", {
      opacity: 0,
      y: -8,
      duration: 0.7,
      stagger: 0.05,
      filter: "blur(3px)",
    }, "-=0.6")
    // 4. Right side actions gently fade and slide in.
    .from(".nav-actions-wrapper", {
      opacity: 0,
      x: 10,
      duration: 0.7,
      filter: "blur(4px)",
      clearProps: "all",
    }, "-=0.6");
  }, { scope: navRef });

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-19.25 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <div className="flex items-center md:w-1/4">
          <Link to="/" className="nav-logo flex-shrink-0" onClick={() => setMobileMenuOpen(false)}>
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
                  isActive ? "text-primary-600" : "text-navy-800 hover:text-primary-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="nav-actions-wrapper flex items-center justify-end gap-3 sm:gap-5 md:w-1/4">
          <button 
            aria-label="Search" 
            className="text-navy-800 hover:text-primary-600 p-1.5 transition-colors"
          >
            <Search className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2.5} />
          </button>

          <Button className="hidden sm:flex h-[42px] px-6 text-sm font-bold bg-[#145eb5] hover:bg-[#145eb5]/90 text-white shadow-md rounded-lg">
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

      {/* Mobile Navigation Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-mist-200 bg-white shadow-lg ${
          mobileMenuOpen ? "max-h-[420px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col px-6 space-y-3">
          {NAV_LINKS.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path === "/blog" && location.pathname.startsWith("/blog"));

            return (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 text-[15px] font-bold transition-colors ${
                  isActive ? "text-[#145eb5]" : "text-navy-800 hover:text-[#145eb5]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2 sm:hidden">
            <Button
              asChild
              className="w-full h-[44px] text-sm font-bold bg-[#145eb5] hover:bg-[#145eb5]/90 text-white shadow-md rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <a href="#app" className="flex items-center justify-center">
                Download App
                <Download className="ml-2 h-[18px] w-[18px]" strokeWidth={2.5} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
