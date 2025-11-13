import React, { useEffect, useMemo, useState } from 'react';
import { getReportPdfUrl } from '../api';

/**
 * PUBLIC_INTERFACE
 * PdfPreview
 * Embeds a PDF viewer in an iframe for the generated report and provides a download button.
 */
export default function PdfPreview({ reportId }) {
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);

  const src = useMemo(() => {
    if (!reportId) return '';
    return getReportPdfUrl(reportId, true);
  }, [reportId]);

  useEffect(() => {
    setErrored(false);
    if (!src) return;
    setLoading(true);
    // Fallback timeout in case iframe doesn't trigger onLoad for error states
    const t = setTimeout(() => {
      setLoading(false);
      // If still loading after timeout, consider it an error
      setErrored(true);
    }, 4000);
    return () => clearTimeout(t);
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
    setErrored(false);
  };

  if (!reportId) {
    return (
      <section className="section" aria-label="PDF Preview">
        <header className="section-header">
          <h2 className="section-title">PDF Preview</h2>
          <p className="section-subtitle">Generate a report to preview the PDF here.</p>
        </header>
        <div className="card muted">No report generated yet.</div>
      </section>
    );
  }

  return (
    <section className="section" aria-label="PDF Preview">
      <header className="section-header">
        <h2 className="section-title">PDF Preview</h2>
        <p className="section-subtitle">
          The PDF is rendered inline below. Use the button to download a copy.
        </p>
      </header>

      <div className="card pdf-viewer-card">
        <div className="pdf-toolbar">
          <a
            href={getReportPdfUrl(reportId, false)}
            className="btn btn-secondary"
            aria-label="Download PDF"
          >
            Download PDF
          </a>
        </div>

        <div className="pdf-container">
          {loading && (
            <div className="pdf-overlay" role="status" aria-live="polite">
              Loading PDF preview...
            </div>
          )}
          {errored && (
            <div className="pdf-error card error" role="alert">
              Could not load PDF preview. Try downloading instead.
            </div>
          )}
          <iframe
            title="Report PDF Preview"
            className="pdf-iframe"
            src={src}
            onLoad={handleLoad}
          />
        </div>
      </div>
    </section>
  );
}
