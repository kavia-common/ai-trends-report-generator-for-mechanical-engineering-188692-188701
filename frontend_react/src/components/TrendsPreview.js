import React from 'react';

/**
 * PUBLIC_INTERFACE
 * TrendsPreview
 * This component renders a list/grid of trend items with titles and summaries.
 */
export default function TrendsPreview({ trends, loading, error }) {
  return (
    <section
      className="section trends-section"
      aria-label="AI Trends Preview"
    >
      <header className="section-header">
        <h2 className="section-title">Latest AI Trends in Mechanical Engineering</h2>
        <p className="section-subtitle">
          A quick preview of the insights that will be compiled into your report.
        </p>
      </header>

      {loading && (
        <div role="status" aria-live="polite" className="card info">
          Loading trends...
        </div>
      )}

      {error && (
        <div role="alert" className="card error">
          {String(error)}
        </div>
      )}

      {!loading && !error && Array.isArray(trends) && trends.length === 0 && (
        <div className="card muted">No trends available at the moment.</div>
      )}

      <div className="trends-grid" role="list">
        {Array.isArray(trends) &&
          trends.map((t, idx) => (
            <article
              role="listitem"
              key={t.id || idx}
              className="trend-card"
              aria-label={t.title || 'Trend'}
              tabIndex="0"
            >
              <h3 className="trend-title">{t.title || 'Untitled trend'}</h3>
              <p className="trend-summary">{t.summary || 'No summary provided.'}</p>
              {t.tags && Array.isArray(t.tags) && t.tags.length > 0 && (
                <div className="trend-tags" aria-label="Trend tags">
                  {t.tags.map((tag, i) => (
                    <span className="tag" key={`${tag}-${i}`}>{tag}</span>
                  ))}
                </div>
              )}
            </article>
          ))}
      </div>
    </section>
  );
}
