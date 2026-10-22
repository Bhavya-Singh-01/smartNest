import { execSync } from "node:child_process";

// DB/E2E tests create and delete users, so they run against the LOCAL
// Supabase stack (`npx supabase start`), never the project in .env.local.
// Settings come from `supabase status`; set ALLOW_REMOTE_DB_TESTS=1 plus the
// three env vars to target a disposable hosted project instead.
export function loadEnv() {
  if (process.env.ALLOW_REMOTE_DB_TESTS === "1") {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    const secretKey = process.env.SUPABASE_SECRET_KEY;
    if (!url || !publishableKey || !secretKey) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and SUPABASE_SECRET_KEY.");
    return { url, publishableKey, secretKey };
  }

  let status: string;
  try {
    status = execSync("npx supabase status -o env", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    throw new Error("Local Supabase isn't running. Start it with `npx supabase start` (Docker Desktop must be running).");
  }
  const vars: Record<string, string> = {};
  for (const line of status.split(/\r?\n/)) {
    const m = /^([A-Z_]+)="(.*)"$/.exec(line.trim());
    if (m) vars[m[1]] = m[2];
  }
  const url = vars.API_URL;
  const publishableKey = vars.PUBLISHABLE_KEY ?? vars.ANON_KEY;
  const secretKey = vars.SECRET_KEY ?? vars.SERVICE_ROLE_KEY;
  if (!url || !publishableKey || !secretKey) throw new Error("Could not read local Supabase settings from `supabase status`.");
  return { url, publishableKey, secretKey };
}
