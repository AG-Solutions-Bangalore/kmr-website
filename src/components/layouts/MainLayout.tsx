import { Link, Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { PATHS } from '../../routes/paths';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ScrollToTop />

      {/* Temporary shell header — replace with real Navbar */}
      <header className="border-b border-[var(--color-border-light)] bg-white">
        <nav className="container flex h-16 items-center justify-between">
          <Link to={PATHS.home} className="text-lg font-extrabold text-[var(--color-navy-800)]">
            KMR <span className="text-primary-600">LIVE</span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Link
              to={PATHS.home}
              className="rounded-lg px-4 py-2 text-[var(--color-navy-800)] transition hover:bg-[var(--color-mist-100)]"
            >
              Home
            </Link>
            <Link
              to={PATHS.about}
              className="rounded-lg px-4 py-2 text-[var(--color-muted-600)] transition hover:bg-[var(--color-mist-100)] hover:text-[var(--color-navy-800)]"
            >
              About Us
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Temporary shell footer — replace with real Footer */}
      <footer className="footer-gradient mt-auto">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-[var(--color-footer-text)] sm:flex-row">
          <p>© 2025 KMR LIVE. All rights reserved.</p>
          <p>Privacy Policy | Terms & Conditions</p>
        </div>
      </footer>
    </div>
  );
}
