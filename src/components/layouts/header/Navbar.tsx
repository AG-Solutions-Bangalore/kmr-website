import { useRef } from "react";
import { Link, useLocation } from "react-router";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/common/logo.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Category", path: "#category" },
  { label: "Features", path: "#features" },
  { label: "FAQ", path: "#faq" },
  { label: "Contact Us", path: "#contact" },
];

function Navbar() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

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
      <div className="mx-auto flex h-19.25 w-full max-w-7xl items-center justify-between px-4">
        {/* Left: Logo */}
        <div className="flex w-1/4 items-center">
          <Link to="/" className="nav-logo flex-shrink-0">
            <img
              src={logo}
              alt="KMR LIVE"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex flex-1 items-center justify-center h-full">
          {NAV_LINKS.map((link) => {
            // Very simple active check. In a real app, handle hash links differently if needed.
            const isActive =
              location.pathname === link.path ||
              (location.pathname === "/" && link.path === "/");

            return (
              <Link
                key={link.label}
                to={link.path}
                className={`nav-link relative flex h-full items-center px-4 text-[13px] font-bold tracking-wide transition-colors lg:px-5 ${
                  isActive ? "text-primary-600" : "text-navy-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="nav-actions-wrapper flex w-1/4 items-center justify-end gap-5">
          <button className="text-navy-800 hover:text-primary-600">
            <Search className="h-[22px] w-[22px]" strokeWidth={2.5} />
          </button>

          <Button className="hidden sm:flex h-[42px] px-6 text-sm font-bold bg-[#145eb5] hover:bg-[#145eb5]/90 text-white shadow-md rounded-lg">
            Download App
            <Download className="ml-2 h-[18px] w-[18px]" strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
