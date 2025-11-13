import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GenerateButton
 * Button to trigger report generation.
 */
export default function GenerateButton({ onClick, generating }) {
  return (
    <button
      className={`btn btn-primary btn-large ${generating ? 'btn-loading' : ''}`}
      onClick={onClick}
      disabled={generating}
      aria-busy={generating}
      aria-live="polite"
      aria-label={generating ? 'Generating report...' : 'Generate report'}
    >
      {generating ? 'Generating...' : 'Generate Report'}
    </button>
  );
}
