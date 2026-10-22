# SmartNest — Setup

## 1. Local development (no Supabase account needed)

Requires Node 24+ and Docker Desktop (running).

```bash
npm install
npx supabase start        # local Postgres + Auth + Storage + Mailpit (first run downloads images)
npx supabase status       # shows local URL and keys
```

Create `.env.local` from `.env.example` with the local values from `supabase status`
(`API_URL`, `PUBLISHABLE_KEY`, `SECRET_KEY`), then:

```bash
npm run dev               # http://localhost:3000
```

Emails (sign-up confirmation, password reset) are caught by Mailpit at
http://127.0.0.1:54324 — nothing is really sent.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm test` | Unit tests (planner, validation) |
| `npm run test:db` | Database security tests (RLS, roles) — **local stack only** |
| `npm run db:types` | Regenerate `lib/supabase/database.types.ts` after a migration |
| `npx supabase db reset` | Rebuild the local DB from `supabase/migrations` |

## 2. Hosted Supabase project

1. Create a project at supabase.com.
2. **Apply migrations:**
   ```bash
   npx supabase login
   npx supabase link --project-ref <your-project-ref>
   npx supabase db push
   ```
   (Or paste each file from `supabase/migrations/` into the SQL Editor, in order.)
3. **Auth → URL Configuration:**
   - Site URL: your production URL (e.g. `https://smartnest.vercel.app`)
   - Redirect URLs: `http://localhost:3000/**` and `https://<your-domain>/**`
4. **Auth → Providers → Email:** enable "Confirm email". Minimum password length 8,
   require letters and digits.
5. **Auth → Emails → Templates:** replace the *Confirm signup* and *Reset password*
   templates with the contents of `supabase/templates/confirmation.html` and
   `supabase/templates/recovery.html`. These link to `/auth/confirm`, which the app
   needs to verify the token.
6. **Email sending:** the built-in sender allows only a few emails per hour. Fine for a
   demo; for real users add custom SMTP (Auth → SMTP Settings, e.g. Resend).
7. Copy keys into `.env.local` (Project Settings → API Keys):
   - `NEXT_PUBLIC_SUPABASE_URL` — Project URL
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` — publishable key (or legacy anon key)
   - `SUPABASE_SECRET_KEY` — secret key (or legacy service_role). Server/scripts only.

> Free projects pause after about a week without activity. Open the dashboard before a demo.

## 3. Granting support-staff (admin) access

Users can never make themselves admin. In the Supabase SQL Editor:

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'staff@example.com');
```

## 4. Deploy to Vercel

1. Import the repository in Vercel (framework: Next.js, defaults are fine).
2. Settings → Environment Variables (Production and Preview):
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
   Add `SUPABASE_SECRET_KEY` only when a server feature needs it (demo reset, Phase 6).
3. Deploy. `NEXT_PUBLIC_*` values are baked in at build time — redeploy after changing them.
4. Put the Vercel URL into Supabase Auth → URL Configuration (step 2.3).
