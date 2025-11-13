import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import TrendsPreview from './components/TrendsPreview';
import GenerateButton from './components/GenerateButton';
import DownloadLink from './components/DownloadLink';
import PdfPreview from './components/PdfPreview';
import { getTrends, createReport, downloadReport } from './api';

// PUBLIC_INTERFACE
function App() {
  // Theme handling
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // Data and flow state
  const [trends, setTrends] = useState([]);
  const [trendsLoading, setTrendsLoading] = useState(false);
  const [trendsError, setTrendsError] = useState('');

  const [generating, setGenerating] = useState(false);
  const [reportId, setReportId] = useState(null);

  const [toast, setToast] = useState({ message: '', type: 'info', visible: false });

  // Fetch trends on mount
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setTrendsLoading(true);
      setTrendsError('');
      try {
        const data = await getTrends();
        if (!cancelled) setTrends(Array.isArray(data) ? data : (data.items || []));
      } catch (e) {
        if (!cancelled) setTrendsError(e.message || 'Failed to load trends');
        showToast('Failed to load trends', 'error');
      } finally {
        if (!cancelled) setTrendsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // PUBLIC_INTERFACE
  const handleGenerate = async () => {
    setGenerating(true);
    setReportId(null);
    try {
      const res = await createReport();
      const id = res?.reportId || res?.id;
      setReportId(id);
      showToast('Report generated successfully', 'success');
    } catch (e) {
      showToast(e.message || 'Failed to generate report', 'error');
    } finally {
      setGenerating(false);
    }
  };

  // PUBLIC_INTERFACE
  const handleDownload = async (filename) => {
    if (!reportId) return;
    try {
      showToast('Preparing download...', 'info');
      const blob = await downloadReport(reportId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'ai-trends-report.docx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast('Download started', 'success');
    } catch (e) {
      showToast(e.message || 'Failed to download report', 'error');
    }
  };

  // Minimal toast system
  const showToast = (message, type = 'info') => {
    setToast({ message, type, visible: true });
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
    }, 2500);
  };

  const headerStyles = useMemo(
    () => ({
      '--primary': '#2563EB',
      '--secondary': '#F59E0B',
      '--surface': '#ffffff',
      '--background': '#f9fafb',
      '--text': '#111827',
    }),
    []
  );

  return (
    <div className="App" style={headerStyles}>
      <header className="navbar ocean">
        <div className="navbar-content">
          <div className="brand">
            <span className="brand-logo" aria-hidden="true">🌊</span>
            <div className="brand-text">
              <h1 className="title">AI Trends Report</h1>
              <p className="subtitle">Mechanical Engineering • Ocean Professional</p>
            </div>
          </div>
          <div className="actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title="Toggle color theme"
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <h2 className="hero-title">Generate a polished .docx report in seconds</h2>
            <p className="hero-desc">
              Preview the latest AI trends impacting mechanical engineering, then generate and download a formatted Word report.
            </p>
            <div className="hero-actions">
              <GenerateButton onClick={handleGenerate} generating={generating} />
              <DownloadLink
                available={!!reportId}
                onDownload={handleDownload}
                disabled={generating || !reportId}
              />
            </div>
            {reportId && (
              <p className="hint">
                Report ready. You can download it now.
              </p>
            )}
          </div>
        </section>

        <TrendsPreview trends={trends} loading={trendsLoading} error={trendsError} />

        <PdfPreview reportId={reportId} />
      </main>

      <footer className="footer">
        <p className="footer-text">
          Built with React • Backend base: {process.env.REACT_APP_API_BASE || 'not configured'}
        </p>
      </footer>

      <div
        className={`toast ${toast.visible ? 'show' : ''} ${toast.type}`}
        role="status"
        aria-live="polite"
      >
        {toast.message}
      </div>
    </div>
  );
}

export default App;
