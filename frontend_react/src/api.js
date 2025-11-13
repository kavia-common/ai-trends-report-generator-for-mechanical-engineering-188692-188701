const API_BASE = process.env.REACT_APP_API_BASE || '';

/**
 * Build full URL from base and path, ensuring no duplicate slashes.
 * @param {string} path
 * @returns {string}
 */
function buildUrl(path) {
  const base = API_BASE.replace(/\/+$/, '');
  const p = path.replace(/^\//+, '');
  return `${base}/${p}`;
}

// PUBLIC_INTERFACE
export async function getTrends() {
  /** Fetch list of AI trends for preview. GET /api/trends */
  const res = await fetch(buildUrl('/api/trends'), {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to load trends (${res.status}): ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function createReport() {
  /** Request backend to create a report document. POST /api/reports -> { reportId } */
  const res = await fetch(buildUrl('/api/reports'), {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to create report (${res.status}): ${text}`);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function downloadReport(reportId) {
  /** Download the generated DOCX report as a blob. GET /api/reports/{id}/download */
  if (!reportId) throw new Error('Report ID is required for download');
  const res = await fetch(buildUrl(`/api/reports/${encodeURIComponent(reportId)}/download`), {
    method: 'GET',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Failed to download report (${res.status}): ${text}`);
  }
  return res.blob();
}

// PUBLIC_INTERFACE
export function getReportPdfUrl(reportId, inline = true) {
  /** Build the URL for PDF preview/download. GET /api/reports/{id}/pdf[?inline=true] */
  if (!reportId) return '';
  const query = inline ? '?inline=true' : '';
  return buildUrl(`/api/reports/${encodeURIComponent(reportId)}/pdf${query}`);
}
