-- Phase 4: full planner — catalogue-driven recommendations with reasons,
-- existing devices, warnings and "add to My Home".

-- ---------- catalogue: which planner slot a product can fill ----------
-- planner_slot ties a product to one of the planner's rule-based slots
-- (lib/planner.ts). The planner picks the cheapest active product per slot,
-- preferring verified (non-sample) products.
alter table public.device_catalog
  add column planner_slot text check (planner_slot is null or planner_slot in (
    'hub', 'bulb', 'switch', 'speaker', 'speaker2', 'lock', 'camera_out', 'camera_in',
    'sensor', 'motion_sec', 'eplug', 'motion_energy', 'acctrl', 'thermostat'
  )),
  add column needs_hub boolean not null default false;

create index device_catalog_slot_idx on public.device_catalog (planner_slot) where active;

update public.device_catalog set planner_slot = 'hub' where slug = 'sample-smart-hub';
update public.device_catalog set planner_slot = 'bulb' where slug = 'sample-smart-bulb';
update public.device_catalog set planner_slot = 'switch' where slug = 'sample-smart-switch';
update public.device_catalog set planner_slot = 'speaker' where slug = 'sample-smart-speaker';
update public.device_catalog set planner_slot = 'lock' where slug = 'sample-smart-lock';
update public.device_catalog set planner_slot = 'camera_out' where slug = 'sample-outdoor-camera';
update public.device_catalog set planner_slot = 'camera_in' where slug = 'sample-indoor-camera';
update public.device_catalog set planner_slot = 'sensor', needs_hub = true where slug = 'sample-door-window-sensor';
update public.device_catalog set planner_slot = 'motion_sec', needs_hub = true where slug = 'sample-motion-sensor';
update public.device_catalog set planner_slot = 'eplug' where slug = 'sample-energy-plug';
update public.device_catalog set planner_slot = 'acctrl' where slug = 'sample-ac-controller';
update public.device_catalog set planner_slot = 'thermostat' where slug = 'sample-smart-thermostat';

-- Two more sample types so every planner slot has a catalogue entry.
insert into public.device_catalog (slug, category, name, connectivity, est_price_inr, planner_slot, needs_hub) values
  ('sample-motion-sensor-lighting', 'motion_sensor', 'Motion sensor (auto-off lighting)', 'Zigbee', 1300, 'motion_energy', true),
  ('sample-speaker-second-room', 'speaker', 'Second smart speaker (multi-room)', 'Wi-Fi + Bluetooth', 3000, 'speaker2', false);

-- ---------- plans remember existing devices, warnings and reasons ----------
alter table public.home_plans
  add column existing text[] not null default '{}' check (existing <@ array['hub', 'speaker', 'lighting', 'lock', 'camera', 'sensors', 'plug', 'climate']),
  add column warnings text[] not null default '{}' check (cardinality(warnings) <= 20),
  add column added_to_home_at timestamptz;

alter table public.plan_items
  add column catalog_id uuid references public.device_catalog (id) on delete set null,
  add column device_category public.device_category,
  add column reason text check (reason is null or char_length(reason) <= 500);

grant update (existing, warnings, added_to_home_at) on public.home_plans to authenticated;

-- ---------- save_home_plan v2 ----------
drop function public.save_home_plan(uuid, text, public.home_type, integer, text[], integer, jsonb);

create function public.save_home_plan(
  p_plan_id    uuid,
  p_name       text,
  p_home_type  public.home_type,
  p_rooms      integer,
  p_priorities text[],
  p_budget     integer,
  p_existing   text[],
  p_warnings   text[],
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
    insert into public.home_plans (name, home_type, rooms, priorities, budget, total, existing, warnings)
    values (trim(p_name), p_home_type, p_rooms, p_priorities, p_budget, v_total, coalesce(p_existing, '{}'), coalesce(p_warnings, '{}'))
    returning id into v_plan_id;
  else
    update public.home_plans
       set name = trim(p_name), home_type = p_home_type, rooms = p_rooms, priorities = p_priorities,
           budget = p_budget, total = v_total,
           existing = coalesce(p_existing, '{}'), warnings = coalesce(p_warnings, '{}'),
           added_to_home_at = null
     where id = p_plan_id
    returning id into v_plan_id;
    if v_plan_id is null then
      raise exception 'plan not found' using errcode = 'P0002';
    end if;
    delete from public.plan_items where plan_id = v_plan_id;
  end if;

  insert into public.plan_items (plan_id, position, item_key, name, category, qty, unit_price, line_total, note, catalog_id, device_category, reason)
  select v_plan_id, (ord - 1)::int, i ->> 'item_key', i ->> 'name', i ->> 'category',
         (i ->> 'qty')::int, (i ->> 'unit_price')::int,
         (i ->> 'qty')::int * (i ->> 'unit_price')::int, nullif(i ->> 'note', ''),
         nullif(i ->> 'catalog_id', '')::uuid, nullif(i ->> 'device_category', '')::public.device_category, nullif(i ->> 'reason', '')
    from jsonb_array_elements(p_items) with ordinality as t(i, ord);

  return v_plan_id;
end;
$$;
revoke execute on function public.save_home_plan(uuid, text, public.home_type, integer, text[], integer, text[], text[], jsonb) from anon, public;
grant execute on function public.save_home_plan(uuid, text, public.home_type, integer, text[], integer, text[], text[], jsonb) to authenticated;

-- ---------- add a saved plan's devices to My Home (once) ----------
-- One user_devices row per unit ("Smart bulb 1", "Smart bulb 2", …). Runs as
-- the caller, so RLS still limits it to the caller's own plan and devices.
create function public.add_plan_to_home(p_plan_id uuid)
returns integer
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_added_at timestamptz;
  v_count    integer;
begin
  select added_to_home_at into v_added_at
    from public.home_plans where id = p_plan_id and owner_id = auth.uid() for update;
  if not found then raise exception 'plan not found' using errcode = 'P0002'; end if;
  if v_added_at is not null then raise exception 'already added' using errcode = '22023'; end if;

  insert into public.user_devices (name, category, catalog_id, notes)
  select left(case when pi.qty > 1 then pi.name || ' ' || n else pi.name end, 80),
         coalesce(pi.device_category, c.category, 'other'),
         pi.catalog_id,
         'Added from plan: ' || hp.name
    from public.plan_items pi
    join public.home_plans hp on hp.id = pi.plan_id
    left join public.device_catalog c on c.id = pi.catalog_id
    cross join lateral generate_series(1, pi.qty) as n
   where pi.plan_id = p_plan_id
   order by pi.position, n;
  get diagnostics v_count = row_count;

  update public.home_plans set added_to_home_at = now() where id = p_plan_id;
  return v_count;
end;
$$;
revoke execute on function public.add_plan_to_home(uuid) from anon, public;
grant execute on function public.add_plan_to_home(uuid) to authenticated;
