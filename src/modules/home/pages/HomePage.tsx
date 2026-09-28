export function HomePage() {
  return (
    <section className="container-app section-pad">
      <p className="eyebrow eyebrow-blue">Real Market Information</p>
      <h1 className="h-section mt-3">
        Market Trends, Real Insights, <span className="text-primary-500">Smarter Decisions</span>
      </h1>
      <p className="p-section">
        Get real-time commodity prices, market trends and expert insights to make informed
        business decisions.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="#categories" className="btn-primary">
          Explore Categories
        </a>
        <a href="#app" className="btn-outline">
          Download App
        </a>
      </div>
    </section>
  );
}
