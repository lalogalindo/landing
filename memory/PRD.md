# MercSoft — Product Requirements (PRD)

## Original problem statement
> Mi amigo Manuel y yo tenemos una empresa de desarrollo de software. Nuestro lema es que creamos soluciones a los problemas de los clientes. Quiero una landing para nuestro negocio que haga énfasis en que usamos tecnología de punta (incluyendo IA), crea una paleta de colores con el logo como referencia. Quiero una landing moderna y muy visual, que tenga secciones precisas y quiero que hagas una sección de políticas de privacidad y uso de datos. Quiero que también pongas un formulario de contacto que enviará un email a lalogalindo@gmail.com y deja el número de contacto 2221401900 y quiero una leyenda abajo de copyright.

## User personas
- **Prospective clients** (founders, ops/marketing leads) looking for a software studio that solves real problems with modern stack + AI.
- **Manuel & partners (owners)**: receive leads through `lalogalindo@gmail.com`, configure copy/contact info via env, eventually add Spanish + social links.

## Core requirements (static)
- Modern, visually striking landing in **English by default**, parametrizable for Spanish (i18n provider already includes both dictionaries).
- Color palette derived from the multicolor MercSoft logo (cyan, magenta, lime, orange, red on dark obsidian base).
- Sections: Hero, Services, Process, Privacy Policy, Contact, Footer (no About).
- Services to surface: e-commerce, dashboards, self-managed sites, consulting, AI solutions, custom software.
- Process emphasises **requirements gathering** as primary focus (highlighted step + badge).
- Contact form sends email to **lalogalindo@gmail.com** via **Resend**; protected by **Google reCAPTCHA v2**.
- Phone **2221401900** displayed in Contact + Footer.
- Footer copyright: **© 2025 MercSoft**. No social links yet (commented placeholders).
- When Resend free-tier quota is hit → return HTTP 500 (don't break the contract).

## Architecture / tech
- Backend: FastAPI + MongoDB (Motor). Resend (sync SDK via `asyncio.to_thread`). reCAPTCHA verification through `google.com/recaptcha/api/siteverify` using `httpx.AsyncClient`.
- Frontend: React 19 (CRA) + Tailwind + shadcn/ui (Accordion, Sonner toaster) + Phosphor Icons + framer-motion + react-google-recaptcha. i18n via custom React Context (`/src/i18n`).
- All public config (phone, email, recipient, recaptcha site key) routed via `.env` files — no hardcoded secrets.

## What's been implemented (Dec 2025)
- [x] Backend `/api/`, `/api/config`, `/api/status`, `/api/contact` (Pydantic validation + reCAPTCHA verify + Resend send + Mongo persistence + 500 fallback on quota).
- [x] Full landing page with Hero (animated headline, control-room visual, tech ticker), Services (bento grid, glassmorphic + spotlight hover), Process (highlighted requirements step), Privacy (8-section accordion), Contact (form + reCAPTCHA + Sonner toasts), Footer (copyright + phone + email).
- [x] i18n provider with English + Spanish dictionaries.
- [x] Logo embedded from provided asset URL.
- [x] Brand color palette in CSS variables.
- [x] All interactive elements have `data-testid`.
- [x] Backend test suite (6/6 passing) at `/app/backend/tests/test_mercsoft_api.py`.

## Backlog
### P1
- Add a language switcher in Nav (the i18n provider is ready; just add a UI control).
- Replace Google reCAPTCHA test keys with real keys once a domain is registered.
- Verify `lalogalindo@gmail.com` in Resend dashboard or move to a custom verified sender domain to allow full deliverability beyond test mode.

### P2
- Footer social links (LinkedIn / GitHub / X) — code currently commented out.
- Case studies / portfolio section.
- Schedule-a-call integration (Cal.com / Google Calendar).
- Analytics (Plausible / GA4) for conversion tracking on the hero CTA.
- Move `verify_recaptcha` failure detection from string matching to error class/code (code review note).

## Next tasks
- Manual smoke-test of the contact form in a real browser tab (the automated iframe environment can't load reCAPTCHA).
- When ready: register a domain, generate real reCAPTCHA v2 keys, verify Resend sender, swap env values.
