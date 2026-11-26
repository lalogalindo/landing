# SITE MANIFEST: MercSoft Web Repository

## Project Overview
Marketing landing page and lead-capture platform for MercSoft (software & AI studio), originally bootstrapped via Emergent (`.emergent/emergent.yml`). Features a bilingual landing page, contact inquiry system, and WhatsApp lead chatbot.

## Audit Date and Git Snapshot
- **Audit Date**: 2026-11-25
- **Current Branch**: `main` (synced with `origin/main`)
- **HEAD Commit**: `3ac653b` ("Cleanup")
- **Git Working Tree**: Clean (untracked empty `package-lock.json` at root from previous bare `npm i`)
- **Evidence**: `git status`, `git branch -a`, `git log -n 1`

## Architecture Summary
Multi-tier monorepo containing a decoupled frontend, Vercel Python serverless API, and legacy standalone backend:
- **Frontend**: Single Page Application (SPA) in `frontend/` powered by Vite + React.
- **Serverless API**: Python FastAPI application in `api/index.py` mounted as Vercel serverless functions.
- **Legacy Backend**: Standalone FastAPI service in `backend/server.py` with `render.yaml` configuration.

## Technology Stack
| Layer | Technologies | Key Files |
|---|---|---|
| **Frontend Framework** | React 19, Vite 6, React Router DOM 7 | `frontend/package.json`, `frontend/vite.config.js` |
| **Styling & UI** | Tailwind CSS 3.4, Radix UI, shadcn/ui, Framer Motion 12 | `frontend/tailwind.config.js`, `frontend/src/styles/` |
| **Icons & Media** | Phosphor Icons, Lucide React | `frontend/src/components/` |
| **Serverless API** | Python 3, FastAPI 0.110, Motor (MongoDB), Resend SDK | `api/index.py`, `requirements.txt` |
| **Deployment** | Vercel (Production SPA + Serverless), Render (Alternative) | `vercel.json`, `render.yaml` |

## Essential Directory Tree
```
landing-web/
├── api/
│   └── index.py             # Vercel Python serverless API entry (/api/*)
├── backend/
│   ├── server.py            # Standalone FastAPI server (legacy/Render)
│   └── requirements.txt     # Backend Python dependencies
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Brand assets (main-logo.png)
│   │   ├── components/      # UI sections (Hero, Nav, Contact, Chatbot, ScrollToTop, etc.)
│   │   │   └── ui/          # Radix/shadcn primitive components
│   │   ├── config/          # Centralized configuration (team.js)
│   │   ├── i18n/            # Localization dictionary (translations.js)
│   │   ├── styles/          # Theme stylesheets (theme-corporate.css, etc.)
│   │   ├── pages/           # Page routes (Landing, About, BusinessCard, NotFound)
│   │   ├── App.jsx          # Route declarations & toast wrapper
│   │   └── index.jsx        # React root mounting
│   ├── package.json         # Frontend dependencies and scripts
│   └── vite.config.js       # Vite configuration and aliases
├── requirements.txt         # Root Python dependencies for Vercel deployment
├── render.yaml              # Render deployment descriptor
└── vercel.json              # Vercel build, output & routing config
```

## Application Entry Points and Routes
- **Client Application**: `frontend/index.html` -> `frontend/src/index.jsx` -> `frontend/src/App.jsx`
- **Routing Infrastructure**: React Router DOM 7 SPA routing with `<ScrollToTop />` and Vercel SPA fallback.
- **Public Routes**:
  - `/` — Main landing container (`frontend/src/pages/Landing.jsx`)
  - `/about` — About Us page (`frontend/src/pages/About.jsx`)
  - `/egalindo` — Interactive digital business card (`frontend/src/pages/BusinessCard.jsx`)
  - `/mromero` — Interactive digital business card (`frontend/src/pages/BusinessCard.jsx`)
  - `*` — Branded 404 page (`frontend/src/pages/NotFound.jsx`)
- **Serverless API Handler**: `api/index.py` (FastAPI instance `app`, router `api_router`)
- **Standalone Server Handler**: `backend/server.py` (`uvicorn server:app`)

## Local Development Instructions
Do not run `npm install` in the repository root. Run commands targeting `frontend/`:
```bash
# 1. Frontend Development (Port 5173 by default)
cd frontend
npm install --legacy-peer-deps
npm run dev

# Alternative from root directory:
npm run dev --prefix frontend

# 2. Local API Development (Optional Python Backend)
python -m venv venv
venv\Scripts\activate   # Windows (or 'source venv/bin/activate' on Unix)
pip install -r requirements.txt
uvicorn api.index:app --reload --port 8000
```

## Build and Deployment Instructions
- **Build Command**: `npm run build --prefix frontend` (outputs static files to `frontend/dist`).
- **Production CI/CD**: Pushing to `main` triggers Vercel automated deployment.
- **Vercel Engine**: Automatically installs Python dependencies from root `requirements.txt` for `api/index.py`, and runs `installCommand` / `buildCommand` from `vercel.json` for the frontend.

## Vercel Configuration
Defined in root `vercel.json`:
- `installCommand`: `npm install --prefix frontend --legacy-peer-deps`
- `buildCommand`: `npm run build --prefix frontend`
- `outputDirectory`: `frontend/dist`
- `rewrites`:
  - `/api/(.*)` -> `/api/index.py` (Python serverless function)
  - `/(.*)` -> `/index.html` (SPA fallback)

## Missing package.json Diagnosis
- **Cause**: Root directory does not have a `package.json` because this is a multi-tier repository. Node.js dependencies belong exclusively to the frontend, located at `frontend/package.json`.
- **Why Vercel Works**: Vercel reads `vercel.json` from the repository root, which specifies `--prefix frontend` for install and build commands.
- **Resolution**: Developers must navigate to `frontend/` or pass `--prefix frontend` to npm commands. Root `npm install` is neither needed nor supported.

## Component and Page Map
| Component | Path | Description |
|---|---|---|
| `Landing` | `frontend/src/pages/Landing.jsx` | Main landing container |
| `About` | `frontend/src/pages/About.jsx` | Standalone About Us page (Hero, Intro, Principles, Team, CTA) |
| `BusinessCard` | `frontend/src/pages/BusinessCard.jsx` | Interactive digital business card (3D flip, vCard, QR, actions) for `/egalindo` & `/mromero` |
| `NotFound` | `frontend/src/pages/NotFound.jsx` | Branded 404 error page |
| `Nav` | `frontend/src/components/Nav.jsx` | Navigation header with About link & cross-page hash support |
| `Hero` | `frontend/src/components/Hero.jsx` | Hero banner with value proposition |
| `Services` | `frontend/src/components/Services.jsx` | Service offerings grid & reusable `SectionHeader` |
| `Process` | `frontend/src/components/Process.jsx` | Workflow & steps presentation |
| `Privacy` | `frontend/src/components/Privacy.jsx` | Security & confidentiality guarantee |
| `Contact` | `frontend/src/components/Contact.jsx` | Lead form with reCAPTCHA & API submission |
| `Footer` | `frontend/src/components/Footer.jsx` | Footer links & copyright |
| `Chatbot` | `frontend/src/components/Chatbot.jsx` | Interactive widget redirecting to WhatsApp |
| `Logo` | `frontend/src/components/Logo.jsx` | Brand logo renderer |
| `ScrollToTop` | `frontend/src/components/ScrollToTop.jsx` | Handles route scroll reset and anchor scroll |
| `TEAM_MEMBERS` | `frontend/src/config/team.js` | Centralized data store for team members & future cards |

## Styling and Branding
- **Theme Switcher**: `frontend/src/styles/theme.css` imports either `theme-corporate.css` (active) or `theme-vibrant.css`.
- **Design Tokens**: Defined as CSS custom variables (`--bg-page`, `--brand-primary`, `--brand-accent`).
- **Typography**: Google Fonts loaded in `frontend/index.html` & `frontend/src/index.css` (`Outfit`, `IBM Plex Sans`, `JetBrains Mono`, `Inter`).
- **Brand Imagery**: Main logo is at `frontend/src/assets/images/main-logo.png`.

## External Integrations
- **MongoDB**: Inquiries & status checks stored via Motor (`api/index.py`).
- **Resend**: Automated email notification on form submission (`api/index.py`).
- **Google reCAPTCHA**: Bot validation on contact submissions (`frontend/src/components/Contact.jsx`, `api/index.py`).
- **WhatsApp**: Direct chat link on click via `Chatbot.jsx` (`https://wa.me/52...`).

## Environment Variables
Values are omitted for security.
| Variable Name | Environment | Purpose |
|---|---|---|
| `MONGO_URL` | Vercel / Backend | MongoDB connection URI (Required) |
| `DB_NAME` | Vercel / Backend | MongoDB database name (Required) |
| `RESEND_API_KEY` | Vercel / Backend | Resend API key for notification emails |
| `SENDER_EMAIL` | Vercel / Backend | Origin email address for transactional email |
| `RECIPIENT_EMAIL` | Vercel / Backend | Destination inbox for contact form leads |
| `RECAPTCHA_SECRET_KEY` | Vercel / Backend | Google reCAPTCHA server verification secret |
| `CONTACT_PHONE` | Vercel / Backend | Contact telephone number |
| `VITE_BACKEND_URL` | Frontend | API base URL for contact form submission |
| `VITE_RECAPTCHA_SITE_KEY`| Frontend | Public Google reCAPTCHA site key |
| `VITE_CONTACT_PHONE` | Frontend | WhatsApp & direct phone contact number |
| `VITE_CONTACT_EMAIL` | Frontend | Display email in UI |

## Source Code Availability
Complete source code is available in the repository (`frontend/src/`, `api/index.py`, `backend/server.py`). The repository does not rely on pre-compiled blobs or missing external repositories.

## Technical Risks and Limitations
1. **Uncaught Backend Exception on Startup**: `api/index.py` accesses `os.environ['MONGO_URL']` directly at module load time; if unset in Vercel project settings, all `/api/*` invocations fail with HTTP 500.
2. **Dual Backend Divergence**: `backend/server.py` and `api/index.py` are near-duplicates. Changes made to one must be mirrored in the other if Render deployment is still in use.
3. **Outdated frontend/README.md**: Contains boilerplate CRA documentation rather than Vite-specific instructions.

## Safe Modification Guide
| Target | Where to Edit |
|---|---|
| **Text and Content** | `frontend/src/i18n/translations.js` (`dict.en` and `dict.es`) |
| **Colors & Typography** | `frontend/src/styles/theme.css`, `theme-corporate.css`, `frontend/src/index.css` |
| **Images & Logos** | Replace `frontend/src/assets/images/main-logo.png` or edit `frontend/src/components/Logo.jsx` |
| **Components & Layout**| `frontend/src/components/` and `frontend/src/components/ui/` |
| **Team & Cards Config**| `frontend/src/config/team.js` |
| **Pages & Routes** | `frontend/src/pages/` and `frontend/src/App.jsx` |
| **Forms & Inquiries** | `frontend/src/components/Contact.jsx` (client) and `api/index.py` (server handler) |
| **Deployment Config** | `vercel.json` (root Vercel configuration) and `requirements.txt` |

## Unknowns Requiring Manual Verification
The following settings exist in external dashboards and cannot be verified locally:
1. **Vercel Dashboard - Environment Variables**: Verify that `MONGO_URL`, `DB_NAME`, `RESEND_API_KEY`, and `RECAPTCHA_SECRET_KEY` are populated in Vercel Project Settings.
2. **Vercel Dashboard - Root Directory**: Ensure project root setting in Vercel is set to `.` (empty/root), not `frontend`, because root `vercel.json` manages both `frontend` build and `api/` serverless functions.
3. **Render Deployment Status**: Confirm whether the Render service (`render.yaml`) is still active or has been deprecated in favor of Vercel serverless.

## Context for Future AI Agents
- **Architecture**: Vite + React 19 SPA (`frontend/`) with Python FastAPI Serverless on Vercel (`api/index.py`).
- **Never Run Root npm Commands**: Always `cd frontend` or pass `--prefix frontend`.
- **Strings/Content**: Do not hardcode strings in components; all copy belongs in `frontend/src/i18n/translations.js`.
- **API Mapping**: Vercel routes `/api/*` directly to `api/index.py`. Local development without Python can mock `/api` or point `VITE_BACKEND_URL` to staging/production.
