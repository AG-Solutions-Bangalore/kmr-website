import { Link } from 'react-router';
import { PATHS } from './paths';

export function NotFoundPage() {
  return (
    <section className="container-app section-pad text-center">
      <p className="eyebrow eyebrow-blue justify-center">404 — Not found</p>
      <h1 className="h-section mt-3">This page doesn&apos;t exist.</h1>
      <p className="p-section mx-auto mt-2">The link you followed may be broken or the page was removed.</p>
      <Link to={PATHS.home} className="btn-primary mt-6">
        Back to Home
      </Link>
    </section>
  );
}
