import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "./header/Navbar";

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

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
