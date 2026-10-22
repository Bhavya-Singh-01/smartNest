-- Phase 3: SmartNest Care — support tickets, status history, feedback, photos.
--
-- Lifecycle: submitted → under_review → in_progress → resolved → closed.
-- Tickets are created by customers with a direct insert (RLS-checked), but
-- (Rows reference profiles, which cascade from auth.users, so names can be
-- embedded in queries.) Every later change goes through the functions below, which validate the
-- transition, check who is acting, and append a ticket_updates row with the
-- author and timestamp. Nobody can update support_tickets directly.

create type public.ticket_status as enum ('submitted', 'under_review', 'in_progress', 'resolved', 'closed');
create type public.ticket_priority as enum ('low', 'normal', 'high', 'urgent');
create type public.ticket_category as enum (
  'device_offline', 'connectivity', 'installation', 'automation', 'malfunction', 'security_privacy', 'other'
);
create type public.ticket_update_kind as enum (
  'created', 'status_change', 'staff_reply', 'internal_note', 'customer_reply', 'assignment'
);

-- Support staff need a way to contact customers; keep the sign-up email on the profile.
alter table public.profiles add column email text;
update public.profiles p set email = u.email from auth.users u where u.id = p.id;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create function public.owns_device(p_device_id uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.user_devices where id = p_device_id and owner_id = (select auth.uid()));
$$;
revoke execute on function public.owns_device(uuid) from anon;

-- ---------- tickets ----------
create sequence public.support_ticket_seq;

create table public.support_tickets (
  id            uuid primary key default gen_random_uuid(),
  ref           text not null unique default 'pending', -- always replaced by set_ticket_ref()
  owner_id      uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  device_id     uuid references public.user_devices (id) on delete set null,
  room_id       uuid references public.rooms (id) on delete set null,
  category      public.ticket_category not null,
  title         text not null check (char_length(trim(title)) between 3 and 120),
  description   text not null check (char_length(trim(description)) between 10 and 4000),
  priority      public.ticket_priority not null default 'normal',
  status        public.ticket_status not null default 'submitted',
  photo_path    text check (photo_path is null or photo_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(jpg|png|webp)$'),
  assigned_to   uuid references public.profiles (id) on delete set null,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  resolved_at   timestamptz,
  closed_at     timestamptz
);
create index support_tickets_owner_idx on public.support_tickets (owner_id, updated_at desc);
create index support_tickets_status_idx on public.support_tickets (status, updated_at desc);
create index support_tickets_device_idx on public.support_tickets (device_id);

-- Human-readable ID, e.g. SN-2026-00042, assigned by the database. Runs as
-- definer so customers never need direct access to the sequence.
create function public.set_ticket_ref()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  new.ref := 'SN-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.support_ticket_seq')::text, 5, '0');
  new.status := 'submitted';
  return new;
end;
$$;
create trigger support_tickets_set_ref before insert on public.support_tickets
  for each row execute function public.set_ticket_ref();

create table public.ticket_updates (
  id           uuid primary key default gen_random_uuid(),
  ticket_id    uuid not null references public.support_tickets (id) on delete cascade,
  author_id    uuid references public.profiles (id) on delete set null,
  author_role  public.user_role not null,
  kind         public.ticket_update_kind not null,
  from_status  public.ticket_status,
  to_status    public.ticket_status,
  message      text check (message is null or char_length(message) <= 4000),
  is_internal  boolean not null default false,
  created_at   timestamptz not null default now(),
  constraint ticket_updates_internal_only_notes check (not is_internal or kind in ('internal_note', 'assignment'))
);
create index ticket_updates_ticket_idx on public.ticket_updates (ticket_id, created_at);

create table public.user_feedback (
  id          uuid primary key default gen_random_uuid(),
  ticket_id   uuid not null unique references public.support_tickets (id) on delete cascade,
  owner_id    uuid not null references public.profiles (id) on delete cascade,
  rating      integer not null check (rating between 1 and 5),
  comment     text check (comment is null or char_length(comment) <= 1000),
  created_at  timestamptz not null default now()
);

-- The opening timeline entry is written when the ticket is created.
create function public.log_ticket_created()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.ticket_updates (ticket_id, author_id, author_role, kind, to_status)
  values (new.id, new.owner_id, 'customer', 'created', 'submitted');
  return new;
end;
$$;
create trigger support_tickets_log_created after insert on public.support_tickets
  for each row execute function public.log_ticket_created();

-- ---------- lifecycle rules ----------
-- Allowed status moves. Staff move tickets forward (or back for rework);
-- customers can only confirm a resolution (→ closed) or reopen it.
create function public.ticket_transition_allowed(p_from public.ticket_status, p_to public.ticket_status, p_staff boolean)
returns boolean language sql immutable set search_path = '' as $$
  select case
    when p_staff then (p_from, p_to) in (
      ('submitted', 'under_review'), ('submitted', 'in_progress'), ('submitted', 'closed'),
      ('under_review', 'in_progress'), ('under_review', 'resolved'), ('under_review', 'closed'),
      ('in_progress', 'under_review'), ('in_progress', 'resolved'), ('in_progress', 'closed'),
      ('resolved', 'in_progress'), ('resolved', 'closed')
    )
    else (p_from, p_to) in (('resolved', 'closed'), ('resolved', 'under_review'))
  end;
$$;

create function public.check_message(p_message text, p_required boolean)
returns text language plpgsql immutable set search_path = '' as $$
declare v text := nullif(trim(coalesce(p_message, '')), '');
begin
  if p_required and v is null then raise exception 'message required' using errcode = '22023'; end if;
  if v is not null and char_length(v) > 4000 then raise exception 'message too long' using errcode = '22023'; end if;
  return v;
end;
$$;

-- Staff: change status (with an optional visible message), reply, or add an internal note.
create function public.staff_update_ticket(
  p_ticket_id uuid,
  p_status    public.ticket_status,
  p_message   text,
  p_internal  boolean
)
returns void language plpgsql security definer set search_path = '' as $$
declare
  v_current public.ticket_status;
  v_message text;
begin
  if not public.is_admin() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  select status into v_current from public.support_tickets where id = p_ticket_id for update;
  if v_current is null then raise exception 'ticket not found' using errcode = 'P0002'; end if;

  if p_status is not null and p_status <> v_current then
    if p_internal then raise exception 'status changes are visible to the customer' using errcode = '22023'; end if;
    if not public.ticket_transition_allowed(v_current, p_status, true) then
      raise exception 'cannot move ticket from % to %', v_current, p_status using errcode = '22023';
    end if;
    v_message := public.check_message(p_message, false);
    update public.support_tickets
       set status = p_status, updated_at = now(),
           resolved_at = case when p_status = 'resolved' then now() else resolved_at end,
           closed_at = case when p_status = 'closed' then now() else null end
     where id = p_ticket_id;
    insert into public.ticket_updates (ticket_id, author_id, author_role, kind, from_status, to_status, message)
    values (p_ticket_id, auth.uid(), 'admin', 'status_change', v_current, p_status, v_message);
  else
    v_message := public.check_message(p_message, true);
    if v_current = 'closed' and not p_internal then
      raise exception 'ticket is closed' using errcode = '22023';
    end if;
    update public.support_tickets set updated_at = now() where id = p_ticket_id;
    insert into public.ticket_updates (ticket_id, author_id, author_role, kind, message, is_internal)
    values (p_ticket_id, auth.uid(), 'admin', case when p_internal then 'internal_note' else 'staff_reply' end::public.ticket_update_kind, v_message, p_internal);
  end if;
end;
$$;

create function public.assign_ticket_to_me(p_ticket_id uuid)
returns void language plpgsql security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  update public.support_tickets set assigned_to = auth.uid(), updated_at = now() where id = p_ticket_id;
  if not found then raise exception 'ticket not found' using errcode = 'P0002'; end if;
  insert into public.ticket_updates (ticket_id, author_id, author_role, kind, message, is_internal)
  values (p_ticket_id, auth.uid(), 'admin', 'assignment', 'Assigned to ' || (select full_name from public.profiles where id = auth.uid()), true);
end;
$$;

-- Customer: reply on an open ticket.
create function public.customer_reply(p_ticket_id uuid, p_message text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_status public.ticket_status;
begin
  select status into v_status from public.support_tickets
   where id = p_ticket_id and owner_id = auth.uid() for update;
  if v_status is null then raise exception 'ticket not found' using errcode = 'P0002'; end if;
  if v_status = 'closed' then raise exception 'ticket is closed' using errcode = '22023'; end if;
  update public.support_tickets set updated_at = now() where id = p_ticket_id;
  insert into public.ticket_updates (ticket_id, author_id, author_role, kind, message)
  values (p_ticket_id, auth.uid(), 'customer', 'customer_reply', public.check_message(p_message, true));
end;
$$;

-- Customer: confirm the fix (resolved → closed) and leave a rating.
create function public.customer_confirm_resolution(p_ticket_id uuid, p_rating integer, p_comment text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_status public.ticket_status;
begin
  select status into v_status from public.support_tickets
   where id = p_ticket_id and owner_id = auth.uid() for update;
  if v_status is null then raise exception 'ticket not found' using errcode = 'P0002'; end if;
  if not public.ticket_transition_allowed(v_status, 'closed', false) then
    raise exception 'only resolved tickets can be confirmed' using errcode = '22023';
  end if;
  if p_rating is null or p_rating not between 1 and 5 then raise exception 'rating must be 1-5' using errcode = '22023'; end if;
  update public.support_tickets set status = 'closed', closed_at = now(), updated_at = now() where id = p_ticket_id;
  insert into public.ticket_updates (ticket_id, author_id, author_role, kind, from_status, to_status, message)
  values (p_ticket_id, auth.uid(), 'customer', 'status_change', v_status, 'closed', 'Customer confirmed the issue is resolved.');
  insert into public.user_feedback (ticket_id, owner_id, rating, comment)
  values (p_ticket_id, auth.uid(), p_rating, public.check_message(p_comment, false));
end;
$$;

-- Customer: the fix didn't work (resolved → under_review), with an explanation.
create function public.customer_reopen_ticket(p_ticket_id uuid, p_message text)
returns void language plpgsql security definer set search_path = '' as $$
declare v_status public.ticket_status;
begin
  select status into v_status from public.support_tickets
   where id = p_ticket_id and owner_id = auth.uid() for update;
  if v_status is null then raise exception 'ticket not found' using errcode = 'P0002'; end if;
  if not public.ticket_transition_allowed(v_status, 'under_review', false) then
    raise exception 'only resolved tickets can be reopened' using errcode = '22023';
  end if;
  update public.support_tickets set status = 'under_review', resolved_at = null, updated_at = now() where id = p_ticket_id;
  insert into public.ticket_updates (ticket_id, author_id, author_role, kind, from_status, to_status, message)
  values (p_ticket_id, auth.uid(), 'customer', 'status_change', v_status, 'under_review', public.check_message(p_message, true));
end;
$$;

revoke execute on function
  public.staff_update_ticket(uuid, public.ticket_status, text, boolean),
  public.assign_ticket_to_me(uuid),
  public.customer_reply(uuid, text),
  public.customer_confirm_resolution(uuid, integer, text),
  public.customer_reopen_ticket(uuid, text)
from anon, public;
grant execute on function
  public.staff_update_ticket(uuid, public.ticket_status, text, boolean),
  public.assign_ticket_to_me(uuid),
  public.customer_reply(uuid, text),
  public.customer_confirm_resolution(uuid, integer, text),
  public.customer_reopen_ticket(uuid, text)
to authenticated;

-- ---------- Row Level Security ----------
alter table public.support_tickets enable row level security;
alter table public.ticket_updates enable row level security;
alter table public.user_feedback enable row level security;

create policy "Customers read their tickets" on public.support_tickets for select to authenticated
  using (owner_id = (select auth.uid()));
create policy "Staff read all tickets" on public.support_tickets for select to authenticated
  using (public.is_admin());
create policy "Customers open tickets about their own devices" on public.support_tickets for insert to authenticated
  with check (
    owner_id = (select auth.uid())
    and (device_id is null or public.owns_device(device_id))
    and (room_id is null or public.owns_room(room_id))
    and (photo_path is null or split_part(photo_path, '/', 1) = (select auth.uid())::text)
  );

create policy "Customers read public updates on their tickets" on public.ticket_updates for select to authenticated
  using (not is_internal and exists (select 1 from public.support_tickets t where t.id = ticket_id and t.owner_id = (select auth.uid())));
create policy "Staff read all updates" on public.ticket_updates for select to authenticated
  using (public.is_admin());

create policy "Customers read their feedback" on public.user_feedback for select to authenticated
  using (owner_id = (select auth.uid()));
create policy "Staff read feedback" on public.user_feedback for select to authenticated
  using (public.is_admin());

revoke all on public.support_tickets, public.ticket_updates, public.user_feedback from anon, authenticated;
grant select on public.support_tickets, public.ticket_updates, public.user_feedback to authenticated;
grant insert (device_id, room_id, category, title, description, priority, photo_path) on public.support_tickets to authenticated;
revoke all on sequence public.support_ticket_seq from anon, authenticated;

-- Live timeline updates (Realtime respects the select policies above).
alter publication supabase_realtime add table public.support_tickets, public.ticket_updates;

-- ---------- ticket photos (private storage) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('ticket-photos', 'ticket-photos', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- Files live under {user_id}/... ; owners upload/read their folder, staff read all.
create policy "Customers upload ticket photos to their folder" on storage.objects for insert to authenticated
  with check (bucket_id = 'ticket-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Customers read their ticket photos" on storage.objects for select to authenticated
  using (bucket_id = 'ticket-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Staff read all ticket photos" on storage.objects for select to authenticated
  using (bucket_id = 'ticket-photos' and public.is_admin());
create policy "Customers delete their ticket photos" on storage.objects for delete to authenticated
  using (bucket_id = 'ticket-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
