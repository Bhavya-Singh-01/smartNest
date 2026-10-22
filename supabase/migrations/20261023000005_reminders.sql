-- Phase 5: device manual links and maintenance reminders (in-app only).

alter table public.user_devices
  add column manual_url text check (manual_url is null or (manual_url ~ '^https://' and char_length(manual_url) <= 500));
grant update (manual_url) on public.user_devices to authenticated;

create table public.maintenance_reminders (
  id             uuid primary key default gen_random_uuid(),
  owner_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  device_id      uuid not null references public.user_devices (id) on delete cascade,
  title          text not null check (char_length(trim(title)) between 2 and 80),
  due_date       date not null,
  repeat_months  integer check (repeat_months is null or repeat_months between 1 and 60),
  completed_at   timestamptz,
  created_at     timestamptz not null default now()
);
create index maintenance_reminders_owner_due_idx on public.maintenance_reminders (owner_id, due_date) where completed_at is null;
create index maintenance_reminders_device_idx on public.maintenance_reminders (device_id);

alter table public.maintenance_reminders enable row level security;

create policy "Owners manage reminders for their devices" on public.maintenance_reminders for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()) and public.owns_device(device_id));

revoke all on public.maintenance_reminders from anon, authenticated;
grant select, insert, delete on public.maintenance_reminders to authenticated;
grant update (completed_at) on public.maintenance_reminders to authenticated;

-- Mark a reminder done; a repeating one schedules its next occurrence
-- (counted from the due date, so a schedule doesn't drift when done late).
create function public.complete_reminder(p_reminder_id uuid)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare r public.maintenance_reminders;
begin
  select * into r from public.maintenance_reminders
   where id = p_reminder_id and owner_id = auth.uid() and completed_at is null for update;
  if not found then raise exception 'reminder not found' using errcode = 'P0002'; end if;

  update public.maintenance_reminders set completed_at = now() where id = r.id;
  if r.repeat_months is not null then
    insert into public.maintenance_reminders (device_id, title, due_date, repeat_months)
    values (r.device_id, r.title, (r.due_date + make_interval(months => r.repeat_months))::date, r.repeat_months);
  end if;
end;
$$;
revoke execute on function public.complete_reminder(uuid) from anon, public;
grant execute on function public.complete_reminder(uuid) to authenticated;
