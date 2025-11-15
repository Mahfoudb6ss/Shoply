create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null check (role in ('admin','customer')) default 'customer',
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric(10,2) not null,
  discount numeric(5,2),
  stock integer not null default 0,
  category_id uuid references public.categories(id) on delete set null,
  images text[] default '{}',
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products(category_id);
create index if not exists products_name_trgm_idx on public.products using gin (name gin_trgm_ops);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  items jsonb not null,
  total_price numeric(10,2) not null,
  status text not null check (status in ('pending','processing','shipped','completed','cancelled')) default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists orders_user_idx on public.orders(user_id);

create table if not exists public.wishlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  quantity integer not null default 1,
  created_at timestamptz not null default now(),
  unique(user_id, product_id)
);
