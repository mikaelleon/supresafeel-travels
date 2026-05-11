# Feelgood Travels (SurpreSaFeel Travels)

Emotion-first travel planning website for the Philippines: marketing pages, services, and a multi-step **Emotion Travel Survey** that posts responses to **Google Sheets** via Google Apps Script.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Google Sheets integration](#google-sheets-integration)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Build and deploy](#build-and-deploy)
- [Testing](#testing)

## Features

- **Home** — Hero, how it works, sample itineraries, quiz CTA
- **About** — Story, team, values
- **Services** — Mood categories, pricing, process timeline
- **Questionnaire** — Nine-step survey with optional consultation add-on and additional notes; JSON POST to Apps Script
- **Contact** — Contact details and message form (UI only unless you wire it)
- **404** — Not found page

## Tech stack

| Layer | Choice |
|--------|--------|
| UI | React 18, TypeScript |
| Build | Vite 5 |
| Routing | React Router 6 |
| Styling | Tailwind CSS, shadcn/ui (Radix primitives) |
| Icons | Lucide React |
| Forms / UX | react-hook-form, Zod (where used), Sonner, etc. |

## Requirements

- **Node.js** 18+ (20+ recommended)
- **pnpm** (recommended), or npm / yarn

## Getting started

```bash
pnpm install
pnpm dev
```

Dev server defaults to **http://localhost:8080** (see `vite.config.ts`).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GOOGLE_APPS_SCRIPT_URL` | No | Overrides the default survey Apps Script Web App URL. Copy from `.env.example` pattern. |

Use `.env.local` for local overrides (gitignored via `*.local`).

## Google Sheets integration

Survey submissions are documented end-to-end in **`docs/GOOGLE_SHEETS_SURVEY.md`** (Apps Script `doPost`, spreadsheet layout, deployment, troubleshooting). No separate Node backend is required for the default flow: the browser POSTs JSON directly to Google Apps Script.

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start Vite dev server |
| `pnpm run build` | Production build to `dist/` |
| `pnpm run build:dev` | Vite build with development mode |
| `pnpm run preview` | Serve `dist/` locally |
| `pnpm run lint` | Run ESLint |
| `pnpm test` | Run Vitest once |
| `pnpm run test:watch` | Vitest watch mode |

## Project structure

| Path | Role |
|------|------|
| `src/main.tsx` | App bootstrap |
| `src/App.tsx` | Routes, providers |
| `src/pages/` | Page components |
| `src/components/` | Shared UI (Navbar, Footer, shadcn `ui/`) |
| `src/lib/` | Utilities (e.g. `cn`) |
| `docs/` | Operational docs (Google Sheets) |
| `public/` | Static assets |
| `index.html` | HTML shell, meta, fonts |

## Build and deploy

1. Run `pnpm run build`.
2. Upload or connect the **`dist/`** output to any static host (Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, etc.).
3. Configure the host for **SPA fallback** (all non-file routes → `index.html`) so React Router works.
4. Set `VITE_GOOGLE_APPS_SCRIPT_URL` in the host environment if you use a non-default Apps Script deployment.

## Testing

```bash
pnpm test
```

Vitest + Testing Library are configured under `src/test/`.

---

© SurpreSaFeel Travels. Internal project name in `package.json`: `feelgood-travels`.
