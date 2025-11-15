# Shoply

Shoply is a full-stack e-commerce platform built with Next.js 15, React Server Components, Tailwind CSS, Supabase, and a clean architecture. It delivers a lightning-fast storefront, an RBAC-protected admin dashboard, and a secure API layer backed by PostgreSQL.

## Features
- ✅ React Server Components storefront with SEO-first product, cart, checkout, and wishlist flows
- ✅ Admin dashboard (role: admin) for catalog, order, customer, and analytics management
- ✅ JWT access/refresh auth with httpOnly cookies, middleware RBAC, and Supabase persistence
- ✅ RESTful API routes powered by Zod validation, typed responses, and edge-friendly handlers
- ✅ Supabase schema & SQL migrations optimized for indexing, JSONB order items, and image arrays
- ✅ Tailwind + ShadCN UI kit, charts (Recharts), data tables, modals, skeletons, and dark mode
- ✅ Uploadthing-ready media pipeline with secure URLs & drag-and-drop galleries
- ✅ Mock payment integration ready for Stripe test-mode drop-in

## Getting Started
```bash
npm install
npm run dev
```

Create a `.env.local` based on `.env.example`, then run `npm run dev` to start on [http://localhost:3000](http://localhost:3000).

## Scripts
- `npm run dev` – Next dev server with Turbopack
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Lint via `next lint`
- `npm run typecheck` – TypeScript diagnostics
- `npm run format` – Prettier formatting

## Folder Structure
```
src/
  app/              # App Router (storefront, admin, api)
  components/       # UI primitives, shared widgets
  lib/              # Auth, db, fetchers, utilities
  hooks/            # Client state + queries
  types/            # Domain types & DTOs
  utils/            # Helpers (rbac, currency, seo)
  db/               # SQL schema, seeds, Drizzle/Prisma adapters
```

## Database
Supabase is used as the managed Postgres instance. Migration-ready SQL scripts live under `src/db/schema.sql`. Update Supabase via the CLI or SQL editor.

## Deployment
- Designed for Vercel edge runtimes where possible
- Static assets optimized via Next Image + remote patterns
- Ensure environment secrets are configured via Vercel project settings

## License
MIT © Shoply Team
