create table if not exists public.governance_polls (
  id text primary key,
  title text not null,
  description text not null default '',
  options text[] not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.governance_votes (
  id bigint generated always as identity primary key,
  poll_id text not null references public.governance_polls (id) on delete cascade,
  user_key text not null,
  option_index integer not null check (option_index >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  unique (poll_id, user_key)
);

alter table public.governance_polls enable row level security;
alter table public.governance_votes enable row level security;

drop policy if exists "public governance polls read" on public.governance_polls;
create policy "public governance polls read"
on public.governance_polls
for select
to anon, authenticated
using (true);

drop policy if exists "public governance polls write" on public.governance_polls;
create policy "public governance polls write"
on public.governance_polls
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "public governance votes read" on public.governance_votes;
create policy "public governance votes read"
on public.governance_votes
for select
to anon, authenticated
using (true);

drop policy if exists "public governance votes write" on public.governance_votes;
create policy "public governance votes write"
on public.governance_votes
for all
to anon, authenticated
using (true)
with check (true);
