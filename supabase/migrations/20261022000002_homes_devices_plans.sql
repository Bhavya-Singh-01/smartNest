-- Phase 2: homes, rooms, device catalogue, user devices and saved home plans.
--
-- Ownership model: every private row is reachable from exactly one user.
--   homes.owner_id, user_devices.owner_id, home_plans.owner_id  → auth.users
--   rooms → homes, plan_items → home_plans (ownership inherited)
-- RLS restricts every private table to its owner; admins can read (not edit)
-- customer data for support. The catalogue is public read, admin write.

create type public.home_type as enum ('apartment', 'house', 'studio');

create type public.device_category as enum (
  'hub', 'lighting', 'plug', 'lock', 'camera', 'door_sensor',
  'motion_sensor', 'speaker', 'climate', 'energy', 'other'
);

-- ---------- homes ----------
create table public.homes (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name        text not null check (char_length(trim(name)) between 1 and 80),
  home_type   public.home_type not null,
  city        text check (city is null or char_length(city) <= 80),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  -- Version 1 supports one home per customer.
  constraint homes_one_per_owner unique (owner_id)
);

create trigger homes_set_updated_at before update on public.homes
  for each row execute function public.set_updated_at();

-- ---------- rooms ----------
create table public.rooms (
  id          uuid primary key default gen_random_uuid(),
  home_id     uuid not null references public.homes (id) on delete cascade,
  name        text not null check (char_length(trim(name)) between 1 and 60),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create unique index rooms_home_name_unique on public.rooms (home_id, lower(trim(name)));

create trigger rooms_set_updated_at before update on public.rooms
  for each row execute function public.set_updated_at();

-- ---------- device catalogue ----------
create table public.device_catalog (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique check (slug ~ '^[a-z0-9-]{2,60}$'),
  category       public.device_category not null,
  name           text not null check (char_length(name) between 1 and 120),
  brand          text,
  model          text,
  connectivity   text,
  est_price_inr  integer check (est_price_inr is null or est_price_inr >= 0),
  source_url     text check (source_url is null or source_url ~ '^https://'),
  -- true = illustrative sample, not a verified product listing
  is_sample      boolean not null default true,
  active         boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger device_catalog_set_updated_at before update on public.device_catalog
  for each row execute function public.set_updated_at();

-- ---------- user devices ----------
create table public.user_devices (
  id               uuid primary key default gen_random_uuid(),
  owner_id         uuid not null default auth.uid() references auth.users (id) on delete cascade,
  room_id          uuid references public.rooms (id) on delete set null,
  catalog_id       uuid references public.device_catalog (id) on delete set null,
  category         public.device_category not null,
  name             text not null check (char_length(trim(name)) between 1 and 80),
  brand            text check (brand is null or char_length(brand) <= 60),
  model            text check (model is null or char_length(model) <= 60),
  purchase_date    date,
  warranty_expiry  date,
  notes            text check (notes is null or char_length(notes) <= 1000),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  constraint user_devices_warranty_after_purchase
    check (warranty_expiry is null or purchase_date is null or warranty_expiry >= purchase_date)
);
create index user_devices_owner_idx on public.user_devices (owner_id, created_at desc);
create index user_devices_room_idx on public.user_devices (room_id);
create index user_devices_warranty_idx on public.user_devices (owner_id, warranty_expiry) where warranty_expiry is not null;

create trigger user_devices_set_updated_at before update on public.user_devices
  for each row execute function public.set_updated_at();

-- ---------- saved home plans ----------
create table public.home_plans (
  id          uuid primary key default gen_random_uuid(),
  owner_id    uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name        text not null check (char_length(trim(name)) between 1 and 80),
  home_type   public.home_type not null,
  rooms       integer not null check (rooms between 1 and 10),
  priorities  text[] not null check (
                cardinality(priorities) between 1 and 5
                and priorities <@ array['lighting', 'security', 'energy', 'climate', 'voice']
              ),
  budget      integer not null check (budget between 5000 and 100000),
  total       integer not null check (total >= 0 and total <= budget),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index home_plans_owner_idx on public.home_plans (owner_id, updated_at desc);

create trigger home_plans_set_updated_at before update on public.home_plans
  for each row execute function public.set_updated_at();

create table public.plan_items (
  id          uuid primary key default gen_random_uuid(),
  plan_id     uuid not null references public.home_plans (id) on delete cascade,
  position    integer not null check (position >= 0),
  item_key    text not null,
  name        text not null,
  category    text not null,
  qty         integer not null check (qty > 0),
  unit_price  integer not null check (unit_price >= 0),
  line_total  integer not null check (line_total = qty * unit_price),
  note        text,
  unique (plan_id, position)
);

-- ---------- ownership helpers (security definer: bypass RLS, no recursion) ----------
create function public.owns_home(p_home_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.homes where id = p_home_id and owner_id = (select auth.uid()));
$$;

create function public.owns_room(p_room_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.rooms r join public.homes h on h.id = r.home_id
    where r.id = p_room_id and h.owner_id = (select auth.uid())
  );
$$;

create function public.owns_plan(p_plan_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.home_plans where id = p_plan_id and owner_id = (select auth.uid()));
$$;

revoke execute on function public.owns_home(uuid), public.owns_room(uuid), public.owns_plan(uuid) from anon;

-- ---------- Row Level Security ----------
alter table public.homes enable row level security;
alter table public.rooms enable row level security;
alter table public.device_catalog enable row level security;
alter table public.user_devices enable row level security;
alter table public.home_plans enable row level security;
alter table public.plan_items enable row level security;

-- homes
create policy "Owners manage their home" on public.homes for all to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy "Admins can read homes" on public.homes for select to authenticated
  using (public.is_admin());

-- rooms (ownership via the home)
create policy "Owners manage rooms in their home" on public.rooms for all to authenticated
  using (public.owns_home(home_id)) with check (public.owns_home(home_id));
create policy "Admins can read rooms" on public.rooms for select to authenticated
  using (public.is_admin());

-- device catalogue: anyone may read active entries; only admins write
create policy "Anyone can read the active catalogue" on public.device_catalog for select to anon, authenticated
  using (active or public.is_admin());
create policy "Admins manage the catalogue" on public.device_catalog for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- user devices: owner only, and a device may only sit in one of the owner's rooms
create policy "Owners manage their devices" on public.user_devices for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()) and (room_id is null or public.owns_room(room_id)));
create policy "Admins can read devices" on public.user_devices for select to authenticated
  using (public.is_admin());

-- plans and their items
create policy "Owners manage their plans" on public.home_plans for all to authenticated
  using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy "Owners manage their plan items" on public.plan_items for all to authenticated
  using (public.owns_plan(plan_id)) with check (public.owns_plan(plan_id));

-- Table privileges: RLS decides rows; grants decide verbs.
revoke all on public.homes, public.rooms, public.device_catalog, public.user_devices, public.home_plans, public.plan_items from anon, authenticated;
grant select on public.device_catalog to anon, authenticated;
grant insert, update, delete on public.device_catalog to authenticated;
grant select, insert, delete on public.homes, public.rooms, public.user_devices, public.home_plans, public.plan_items to authenticated;
grant update (name, home_type, city) on public.homes to authenticated;
grant update (name) on public.rooms to authenticated;
grant update (room_id, catalog_id, category, name, brand, model, purchase_date, warranty_expiry, notes) on public.user_devices to authenticated;
grant update (name) on public.home_plans to authenticated;

-- ---------- save_home_plan: atomic create/replace of a plan and its items ----------
-- security invoker: runs with the caller's rights, so RLS still applies.
-- The app computes items with the planner rules on the server and passes
-- them here; the function re-checks totals so stored plans are consistent.
create function public.save_home_plan(
  p_plan_id    uuid,
  p_name       text,
  p_home_type  public.home_type,
  p_rooms      integer,
  p_priorities text[],
  p_budget     integer,
  p_items      jsonb
)
returns uuid
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_plan_id uuid;
  v_total   integer;
begin
  if jsonb_typeof(p_items) <> 'array' then
    raise exception 'items must be an array' using errcode = '22023';
  end if;

  select coalesce(sum((i ->> 'qty')::int * (i ->> 'unit_price')::int), 0)
    into v_total from jsonb_array_elements(p_items) i;

  if p_plan_id is null then
    insert into public.home_plans (name, home_type, rooms, priorities, budget, total)
    values (trim(p_name), p_home_type, p_rooms, p_priorities, p_budget, v_total)
    returning id into v_plan_id;
  else
    update public.home_plans
       set name = trim(p_name), home_type = p_home_type, rooms = p_rooms,
           priorities = p_priorities, budget = p_budget, total = v_total
     where id = p_plan_id
    returning id into v_plan_id;
    if v_plan_id is null then
      raise exception 'plan not found' using errcode = 'P0002';
    end if;
    delete from public.plan_items where plan_id = v_plan_id;
  end if;

  insert into public.plan_items (plan_id, position, item_key, name, category, qty, unit_price, line_total, note)
  select v_plan_id, (ord - 1)::int, i ->> 'item_key', i ->> 'name', i ->> 'category',
         (i ->> 'qty')::int, (i ->> 'unit_price')::int,
         (i ->> 'qty')::int * (i ->> 'unit_price')::int, nullif(i ->> 'note', '')
    from jsonb_array_elements(p_items) with ordinality as t(i, ord);

  return v_plan_id;
end;
$$;

-- save_home_plan runs with the caller's rights, so the caller needs these column
-- grants; RLS still limits writes to their own plans and the function
-- recomputes the total from the items.
grant update (home_type, rooms, priorities, budget, total) on public.home_plans to authenticated;
revoke execute on function public.save_home_plan(uuid, text, public.home_type, integer, text[], integer, jsonb) from anon;

-- ---------- catalogue reference data ----------
-- Illustrative sample entries (is_sample = true) matching the planner's device
-- types and its estimated India retail prices. Not verified product listings.
insert into public.device_catalog (slug, category, name, connectivity, est_price_inr) values
  ('sample-smart-hub',            'hub',           'Smart hub (Zigbee / Thread / Matter)', 'Wi-Fi + Zigbee / Thread', 3500),
  ('sample-smart-bulb',           'lighting',      'Smart bulb (Wi-Fi, tunable white)',    'Wi-Fi',                   700),
  ('sample-smart-switch',         'lighting',      'Smart switch (2-gang)',                'Wi-Fi',                   1800),
  ('sample-smart-speaker',        'speaker',       'Smart speaker (voice assistant)',      'Wi-Fi + Bluetooth',       3500),
  ('sample-smart-lock',           'lock',          'Smart door lock',                      'Bluetooth / Wi-Fi bridge', 12000),
  ('sample-outdoor-camera',       'camera',        'Outdoor security camera',              'Wi-Fi',                   3200),
  ('sample-indoor-camera',        'camera',        'Indoor security camera',               'Wi-Fi',                   2200),
  ('sample-door-window-sensor',   'door_sensor',   'Door / window sensor',                 'Zigbee',                  1000),
  ('sample-motion-sensor',        'motion_sensor', 'Motion sensor (PIR)',                  'Zigbee',                  1300),
  ('sample-energy-plug',          'plug',          'Energy-monitoring smart plug',         'Wi-Fi',                   1400),
  ('sample-ac-controller',        'climate',       'Smart AC controller (IR)',             'Wi-Fi',                   2500),
  ('sample-smart-thermostat',     'climate',       'Smart thermostat (wired)',             'Wi-Fi',                   14000),
  ('sample-energy-monitor',       'energy',        'Whole-home energy monitor (CT clamp)', 'Wi-Fi',                   6000);
