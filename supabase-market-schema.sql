create table if not exists public.market_pools (
  market_key text primary key,
  point_reserve integer not null check (point_reserve > 0),
  event_token_reserve integer not null check (event_token_reserve > 0),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.market_user_positions (
  market_key text not null references public.market_pools (market_key) on delete cascade,
  user_key text not null,
  token_balance integer not null default 0 check (token_balance >= 0),
  point_delta integer not null default 0,
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (market_key, user_key)
);

create table if not exists public.trade_logs (
  id bigint generated always as identity primary key,
  market_key text not null references public.market_pools (market_key) on delete cascade,
  user_key text not null,
  side text not null check (side in ('buy', 'sell')),
  quantity integer not null check (quantity > 0),
  point_amount integer not null check (point_amount > 0),
  price_before numeric(12, 2) not null,
  price_after numeric(12, 2) not null,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.market_pools enable row level security;
alter table public.market_user_positions enable row level security;
alter table public.trade_logs enable row level security;

drop policy if exists "public market pools read" on public.market_pools;
create policy "public market pools read"
on public.market_pools
for select
to anon, authenticated
using (true);

drop policy if exists "public market pools write" on public.market_pools;
create policy "public market pools write"
on public.market_pools
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "public market positions read" on public.market_user_positions;
create policy "public market positions read"
on public.market_user_positions
for select
to anon, authenticated
using (true);

drop policy if exists "public market positions write" on public.market_user_positions;
create policy "public market positions write"
on public.market_user_positions
for all
to anon, authenticated
using (true)
with check (true);

drop policy if exists "public trade logs read" on public.trade_logs;
create policy "public trade logs read"
on public.trade_logs
for select
to anon, authenticated
using (true);

drop policy if exists "public trade logs write" on public.trade_logs;
create policy "public trade logs write"
on public.trade_logs
for all
to anon, authenticated
using (true)
with check (true);

create table if not exists public.governance_polls (
  id text primary key,
  title text not null,
  description text not null default '',
  options text[] not null,
  url text not null,
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
