import React from 'react';

/**
 * PUBLIC_INTERFACE
 * DownloadLink
 * Provides a button-like link to download the generated report when available.
 */
export default function DownloadLink({ onDownload, available, filename = 'ai-trends-report.docx', disabled }) {
  const handleClick = async (e) => {
    e.preventDefault();
    if (disabled || !available) return;
    await onDownload(filename);
  };

  return (
    <a
      href="#download"
      onClick={handleClick}
      className={`btn btn-secondary ${!available || disabled ? 'btn-disabled' : ''}`}
      aria-disabled={!available || disabled}
      aria-label={available ? 'Download report' : 'Download not available'}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e);
        }
      }}
    >
      Download Report
    </a>
  );
}
