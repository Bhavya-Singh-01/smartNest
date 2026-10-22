-- Phase 1: user profiles and roles.
--
-- Every auth user gets a profile row (created by trigger). The role decides
-- access: 'customer' by default; 'admin' can only be granted by a database
-- administrator (SQL editor / seed script), never by the user themselves.

create type public.user_role as enum ('customer', 'admin');

create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text not null check (char_length(full_name) between 1 and 100),
  phone       text check (phone is null or phone ~ '^\+?[0-9 ()-]{7,20}$'),
  role        public.user_role not null default 'customer',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is 'Public profile and role for each auth user.';

-- Keep updated_at current on every update (reused by later tables).
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Create the profile when a user signs up. full_name comes from sign-up
-- metadata; the role is always the default, whatever the client sends.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Role check used by RLS policies across the schema. security definer so it
-- can read profiles without recursing through the profiles policies.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

-- ---------- Row Level Security ----------
alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

create policy "Admins can read all profiles"
  on public.profiles for select
  to authenticated
  using (public.is_admin());

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Column-level privileges: signed-in users may only change name and phone.
-- No insert/delete grants: rows are created by the trigger and removed with
-- the auth user. Role changes need a privileged (service/postgres) connection.
revoke all on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (full_name, phone) on public.profiles to authenticated;

revoke execute on function public.is_admin() from anon;
