# Tool Management

Internal tools dashboard — monitor software tools, budget, departments, and cost per user across the organization.

## Stack

- **React 19** + **TypeScript** + **Vite** (build + dev server)
- **Tailwind CSS v4** (styling, via `@tailwindcss/vite`)
- **TanStack Query** (server state, caching, refetching)
- **Zustand** (client state)
- **Axios** (HTTP client)
- **Zod** (runtime schema validation for API responses and env)
- **React Router** (routing, currently single-page)
- **lucide-react** (icons)

## Getting started

### Prerequisites

- Node.js ≥ 20
- [pnpm](https://pnpm.io/) (the repo ships a `pnpm-lock.yaml`)

### Install

```bash
pnpm install
```

### Environment variables

Create a `.env` at the project root:

```env
VITE_API_BASE_URL=https://tt-jsonserver-01.alt-tools.tech/
```

The app validates this at startup with Zod (`src/app/config/env.schema.ts`) and will refuse to boot if it's missing or invalid.

### Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Vite dev server with HMR |
| `pnpm build` | Typecheck (`tsc -b`) then production build |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | Run ESLint on the project |

## Project structure

```
src/
├── app/                      # App-level concerns (bootstrap,layout, routing, config)
│   ├── config/               # Env schema + validation
│   ├── constants/            # App-wide constants (endpoints, nav links)
│   ├── layout/               # Main layout + navbar
│   ├── provider.tsx          # App providers
│   └── router.tsx
│
├── lib/                      # Cross-cutting technical libraries
│   ├── api/                  # API layer, one folder per module
│   │   ├── analytics/
│   │   ├── departments/
│   │   ├── tools/
│   │   └── ...               # Each has: api.ts | schema.ts | service.ts | types.ts
│   ├── http/                 # Axios client
│   └── query/                # TanStack Query client setup
│
├── modules/                  # Feature modules (one per domain surface)
│   └── dashboard/
│       ├── components/       # Dashboard-specific UI (blocks, cards, skeletons)
│       ├── hooks/            # Data hooks (use-dashboard-kpis, use-recent-tools, …)
│       ├── dashboard.tsx     # Page entry point (pure composition)
│       ├── dashboard.key.ts  # TanStack Query keys
│       ├── types.ts
│       └── utils.ts
│
├── shared/                   # Reusable across modules
│   ├── components/           # Button, Skeleton, EmptyState, Error primitives
│   ├── types/
│   └── utils/
│
├── App.tsx                   # Root app component (providers)
└── main.tsx                  # Entry point (ErrorBoundary + StrictMode)
```

### Architectural conventions

- **Feature-first** — everything specific to a feature lives inside `src/modules/<feature>/`. `Dashboard` doesn't reach into other modules' internals.
- **API layer per resource** — each `src/lib/api/<resource>/` folder exposes `api.ts` (axios calls), `schema.ts` + `types.ts` (Zod schemas + inferred types), `service.ts` (resource-level operations).
- **Path alias** — imports use `@/` to reference `src/` (e.g., `@/shared/components/button/button`).


### UI states

Each block handles four states consistently:

- **Loading** → `Skeleton` components (shimmer animation, matches the final layout to avoid layout shift)
- **Error (no data yet)** → `<ErrorState />` with a retry button
- **Empty** → `<EmptyState />` with a contextual message
- **Data** → the real component

Stale data is preserved when a background refetch fails (the error state only replaces the view on first load).

Global React crashes are caught by `<ErrorBoundary>` at `main.tsx`, which renders `<GlobalErrorFallback />` (fullscreen, with Retry + Go home).
