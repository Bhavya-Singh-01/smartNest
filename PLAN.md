# SmartNest — Implementation Plan

Turns the SmartNest static site into a full-stack web application, following the
project brief in [README.md](README.md). We work phase by phase; a phase is done only
when its checklist is complete and its tests pass.

---

## 1. Current state

**Done (frontend content):** all 11 public pages ported to Next.js 16 (App Router) with
identical content and styling — Home, Basics, Device Manual, Compare, Build,
Installation, Automation, Security, Troubleshooting, Planner, FAQ. Interactive widgets
(search, theme, accordions, checklists, device filter, compare tool, planner) work.
Planner logic is unit-tested and matches the original on 18,600 input combinations.

**Design:** whole site restyled to the "Serif" system in [design.md](design.md) (2026-10-22):
ivory/rich-black palette with one burnished-gold accent, Playfair Display / Source Sans 3 /
IBM Plex Mono, rule lines, small-caps labels. All tokens live at the top of
`app/globals.css`; new screens must use those tokens and existing classes, not one-off colours.
Gold text uses a deeper "ink gold" (#8A6508) and buttons #8F6A08 so they pass WCAG AA.

**Not built yet:** everything behind a login — auth pages, dashboard, My Home, devices,
saved plans, SmartNest Care tickets, admin dashboard, Device Passport, reminders.

**Honesty fixes needed in existing content** (brief: "do not pretend"):
- FAQ promises Live Chat, Community Forum and an email inbox — none exist → replace
  with SmartNest Care tickets.
- Home hero shows live-looking device statuses ("Auto-locked 10 min ago") → label as
  illustration.
- Planner/compare prices are unsourced estimates → label "estimated / sample" or replace
  with sourced catalogue entries.
- Support form is a demo → replace with real tickets.

---

## 2. Backend decision: Supabase

**Verdict: use Supabase.** Not the only option, but the best fit for these requirements.

| Requirement | Supabase | Self-built alternative |
|---|---|---|
| Register / login / persistent sessions | Built in | Auth.js + own user tables |
| Password reset email | Built in | Own token flow + email provider |
| Customer vs admin, data isolation | Row Level Security in the database | Manual checks in every API route |
| Private ticket photos | Storage + access policies | S3 + own signed-URL logic |
| Live ticket updates | Realtime built in | Polling / websockets |
| PostgreSQL + migrations | Managed | Separate DB host |
| Cost for demo | Free tier | Free-ish, 4–5 services |

**Known downsides and how we handle them:**
1. Free projects pause after ~1 week idle → open the project the day before any demo.
2. Built-in email sender is rate-limited (a few emails/hour) → fine for demo; connect a
   free SMTP provider (e.g. Resend) for real use.
3. RLS policies *are* the security boundary → automated tests that attempt cross-user
   and customer-as-admin access and must fail.
4. Moderate lock-in → it is standard PostgreSQL underneath; migrations are plain SQL.

---

## 3. Architecture

| Area | Decision | Reason |
|---|---|---|
| Framework | Next.js 16 App Router (existing) | Already in place; React-based |
| Language | TypeScript for all new code; existing JS content pages stay JS | Typed DB access; no risky rewrite of working pages |
| Styling | Keep the existing SmartNest CSS design system, extend it (dashboard, forms, tables, toasts) | Brand already lives there; brief allows "similarly maintainable" |
| Backend | Supabase: Auth, Postgres, Storage, Realtime | See §2 |
| Supabase in Next | `@supabase/ssr` — cookie-based sessions; server client in Server Components / Server Actions; browser client only for Realtime | Sessions work on server and client |
| Mutations | Server Actions with input validation | Keys and logic stay on the server |
| Authorization | RLS on every table + security-definer SQL functions for admin actions; `proxy.ts` only for optimistic redirects | Enforced in the DB, not just hidden in UI |
| Secrets | `.env.local` (git-ignored); only `NEXT_PUBLIC_SUPABASE_URL` and the publishable/anon key reach the browser; secret/service key server-only (seed scripts) | Brief §3 |
| Local dev | Supabase CLI local stack (Docker) for development and tests; hosted project for production | Safe testing without touching real data |
| Hosting | **Vercel** | Native Next.js support |

**Request flow:** page → server component reads session (inside `<Suspense>`, required by
Cache Components) → Supabase query as that user → RLS filters rows → render.
Writes go through Server Actions → validated → Supabase → RLS / SQL function checks.

---

## 4. Database (target schema)

| Table | Purpose | Key rules |
|---|---|---|
| `profiles` | One row per user: name, phone, `role` (`customer` / `admin`) | Created by trigger on sign-up; users can edit name/phone only, never `role` |
| `homes` | A user's home (name, type, city) | Owner only |
| `rooms` | Rooms in a home | Owner only (via home) |
| `device_catalog` | Curated sample products: brand, model, category, protocol, est. price, source URL, `is_sample` | Read: everyone; write: admin only |
| `user_devices` | Devices a user owns: catalog link or custom, room, purchase date, warranty expiry, notes | Owner only; admin read when linked to a ticket |
| `home_plans` | Saved planner inputs + totals | Owner only |
| `plan_items` | Line items of a plan | Owner only (via plan) |
| `support_tickets` | Readable ID `SN-YYYY-NNNNN`, device, room, category, title, description, priority, status, photo path | Owner: create/read; admin: read/update via function |
| `ticket_updates` | Status change / message / internal note, author, timestamp | Append-only; internal notes hidden from customers |
| `maintenance_reminders` | Per-device reminders (warranty, maintenance) | Owner only |
| `user_feedback` | Resolution confirmation + rating per ticket | Owner of ticket |

Ticket lifecycle enforced in SQL: **Submitted → Under Review → In Progress → Resolved →
Closed** (customer may reopen Resolved → Under Review). Every change writes a
`ticket_updates` row with author and time.

Storage: private bucket `ticket-photos`, path `{user_id}/{ticket_id}/{file}`, images only,
max 5 MB, readable by owner and admins via short-lived signed URLs.

---

## 5. Phases

### Phase 1 — Foundation, authentication, database ✅ (2026-10-22)
- [x] Supabase CLI project (`supabase/`), local stack, migrations folder
- [x] Packages: `@supabase/supabase-js`, `@supabase/ssr`, TypeScript
- [x] Remove unused Tailwind packages/config (styling stays in `globals.css`)
- [x] `.env.example` documenting every variable; `.env.local` git-ignored
- [x] Migration: `profiles` + role, sign-up trigger, RLS, role self-change blocked
- [x] Supabase clients (server / browser) + session refresh in `proxy.ts`
- [x] Pages: `/signup`, `/login`, `/forgot-password`, `/reset-password`, `/auth/confirm`, logout
- [x] Validation + clear error messages on every form
- [x] Protected areas: `/app/*` (logged in), `/admin/*` (admin role) — checked on the server
- [x] Header shows Log in / account menu
- [x] Shared UI: form fields, buttons, alerts, loading/empty/error states
- [x] Tests: validation unit tests; auth + RLS tests against local Supabase
- **Done when:** sign up, log in, reset password, stay logged in, log out all work;
  customers are refused at `/admin`; a user cannot change their own role.
- **Verified:** 15 unit tests, 10 DB security tests (`npm run test:db`), 29-step browser
  run of sign-up → email confirm → login → profile → logout → password reset → admin
  access, plus the 33 original content checks. Setup steps in [SETUP.md](SETUP.md).
- **Also fixed:** phone-width header (menu button was off-screen in the original site).

### Phase 2 — My SmartNest: homes, rooms, devices, saved plans ✅ (2026-10-22)
- [x] Migrations: `homes`, `rooms`, `device_catalog` (+ 13 sample rows, flagged `is_sample` — real sourced products come in Phase 4), `user_devices`, `home_plans`, `plan_items` with RLS
- [x] `/app` dashboard: real counts, warranty reminders, recent devices/plans, quick actions (tickets arrive in Phase 3)
- [x] `/app/home`: create/edit home, add/edit/remove rooms
- [x] `/app/devices`: list, add, edit, remove (confirmation dialog)
- [x] Planner: save / reopen / edit / delete plans when logged in
- [x] Toasts and loading/empty/error states
- [x] Tests: CRUD + cross-user isolation (user B cannot read/modify user A's rows)
- **Done when:** data persists across logout/login and isolation tests pass.
- **Verified:** 20 new DB security tests (30 total), 12 new unit tests,
  46-step browser run (home → rooms → devices → plans → dashboard → persistence →
  cross-customer 404s → support-staff isolation → confirm-deletes → mobile).
- **Also fixed:** support-staff accounts saw every customer's records in their own My
  SmartNest (queries now scoped to the signed-in owner); selects lost their value after a
  validation error (React form reset).

### Phase 3 — SmartNest Care: tickets + admin dashboard ✅ (2026-10-23)
- [x] Migrations: `support_tickets` (ID sequence), `ticket_updates`, status-transition function, storage bucket + policies
- [x] Customer: report issue (device, room, category, title, description, priority, photo)
- [x] Customer: My Tickets list; ticket page with status timeline, responses, resolution notes, confirm resolved / feedback
- [x] Live updates via Supabase Realtime (with refresh fallback)
- [x] `/admin`: overview counts by status
- [x] `/admin/tickets`: search + filters; ticket detail with status control, public reply, internal note, history
- [x] `/admin/catalog`: manage device catalogue
- [x] Tests: lifecycle rules, invalid transitions rejected, customer cannot call admin functions, photo access isolation, file type/size validation
- **Done when:** customer → admin → customer flow works end to end.
- **Verified:** 19 new DB security tests (49 total), 46-step two-browser run (report with photo →
  staff assign/note/status → customer timeline updates live → reopen → resolve → confirm with
  rating → access control → catalogue management → mobile). All earlier suites still pass.
- **Also built:** `user_feedback` (rating on confirm), staff assignment, customer email on
  profiles for support contact. Status changes only via SQL functions; nobody can update a
  ticket row directly. Internal notes never reach customers (RLS + Realtime).

### Phase 4 — Full planner ✅ (2026-10-23, kept minimal)
- [x] Planner engine in TypeScript (`lib/planner.ts`), same rules as before — verified identical to the original planner on 18,600 input combinations
- [x] Products come from the device catalogue (cheapest active product per recommendation, verified entries preferred over samples); staff catalogue edits refresh the planner immediately
- [x] New input: devices you already own (skipped from the plan)
- [x] Results: per-item reason + guide link, sample/source label, per-item cost, total, remaining, cost by category, items that didn't fit (with shortfall), hub warnings
- [x] Budget enforced; clear explanation when nothing fits
- [x] Saved plans keep reasons, warnings and "already own"; **Add to My Home** creates one device per unit (once per plan)
- [x] Clearly labelled as rule-based (no AI claims)
- Dropped on request: voice-assistant/ecosystem matching.
- **Verified:** 4 new DB tests (53 total), rewritten planner unit tests (27 unit total), 18-step browser run; all earlier suites still pass.

### Phase 5 — Device Passport, reminders, polish ✅ (2026-10-23, kept minimal)
- [x] Device page: details, warranty, notes, **manufacturer manual link**, guide links, related tickets (most built in Phases 2–3)
- [x] **Maintenance reminders** per device (one-off or repeating every 1/3/6/12 months; "mark done" schedules the next); due/overdue ones appear on the dashboard with warranty alerts — in-app only
- [x] Feedback on resolved tickets (built in Phase 3)
- [x] Honesty fixes: FAQ no longer promises live chat / forum / email inbox (demo form removed → real SmartNest Care link); home hero device panel labelled as an illustration; "About" no longer claims no data leaves the device
- [x] Home page: "My SmartNest" section explaining what a free account adds, with sign-up call to action
- [x] Search index covers My SmartNest and SmartNest Care
- **Verified:** 7 new DB tests (60 total), 18-step browser run; all earlier suites still pass.

### Phase 6 — Security testing, deployment, demo
- [ ] Full test run: unit, RLS/permission, browser end-to-end of the demo flow
- [ ] Demo accounts (customer + admin) and labelled demo data: home with rooms, devices, ≥2 plans, tickets in every stage with histories, reminders
- [ ] Repeatable demo reset script (never touches real accounts)
- [ ] Hosted Supabase: push migrations, configure auth URLs/emails
- [ ] Deploy to **Vercel** with environment variables; re-run tests against the live URL
- [ ] Deliverables: README (install, config, deploy, test), migrations, feature list + limitations, screenshots, demo script
- **Done when:** the demo workflow works on the deployed URL.

---

## 6. Demo workflow (target)

1. Log in as demo customer → dashboard
2. Open or create a home plan
3. View registered devices
4. Report an issue on a device (with photo)
5. Log in as demo admin → move ticket to In Progress, add a reply
6. Back to customer → updated timeline shows the change

---

## 7. Rough timeline

| Phase | Effort |
|---|---|
| 1. Foundation + auth | 1–2 sessions |
| 2. Home, devices, plans | 2 sessions |
| 3. Tickets + admin | 2–3 sessions |
| 4. Full planner | 1–2 sessions |
| 5. Passport + polish | 2 sessions |
| 6. Test, deploy, demo | 1–2 sessions |

## 8. Needed from the owner

- [ ] Supabase account + project → put URL and keys in `.env.local` (never in chat or git)
- [ ] Decide: own git repository for SmartNest (currently inside another repo)
- [ ] Vercel account (by Phase 6)
- [ ] Demo / submission date
