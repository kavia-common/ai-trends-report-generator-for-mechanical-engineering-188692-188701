# AI Trends Report — React Frontend (Ocean Professional)

Modern, minimal React UI to preview AI trends in mechanical engineering and generate a polished .docx report via the backend API.

## Features
- Clean, responsive UI with Ocean Professional theme
- Fetches trends from backend (`/api/trends`)
- Triggers report generation (`POST /api/reports`) and downloads (`GET /api/reports/{id}/download`)
- Minimal dependencies; create-react-app tooling

## Prerequisites
- Node.js 16+ and npm
- Running backend (ASP.NET Core) on http://localhost:3001 (default)

## Quickstart (Development)
1) Install dependencies
   npm install

2) Configure API base
   - Copy .env.example to .env
   - Set REACT_APP_API_BASE to your backend URL (default below)
   REACT_APP_API_BASE=http://localhost:3001

3) Start the app
   npm start
   Open http://localhost:3000

You should see “Backend base: http://localhost:3001” in the footer if .env is picked up.

## Build and Test
- Development server: npm start
- Tests: npm test
- Production build: npm run build

## Environment Variables
The app reads:
- REACT_APP_API_BASE: Base URL of the backend API (e.g., http://localhost:3001)

Note: Only variables prefixed with REACT_APP_ are exposed to the browser.

## End-to-end Flow
1) On load, the app calls GET {REACT_APP_API_BASE}/api/trends to show a preview list.
2) Clicking “Generate Report” calls POST {REACT_APP_API_BASE}/api/reports and stores the returned reportId.
3) Clicking “Download Report” calls GET {REACT_APP_API_BASE}/api/reports/{reportId}/download to fetch the .docx file.

## Troubleshooting
- Trends fail to load:
  - Ensure backend is running on http://localhost:3001 and CORS is enabled (it is by default).
  - Confirm REACT_APP_API_BASE in .env matches the backend origin.

- Download doesn’t start:
  - Make sure “Generate Report” succeeded and a reportId exists before downloading.

- .env changes not applied:
  - Stop and restart npm start after editing .env.

- Port conflicts:
  - Frontend uses 3000; backend uses 3001 (see backend README to change).

## Styling Notes
Theme variables are in src/App.css. Components are built with plain CSS and React, using subtle shadows, rounded corners, and smooth transitions.
