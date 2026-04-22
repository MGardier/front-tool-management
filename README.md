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



## 🏗️ Architecture

### Feature-based structure

I chose a feature-based architecture for its flexibility on small to
medium projects. This approach enables proper maintenance and evolution
while allowing the project structure to scale in complexity with the needs.
It also improves readability: when opening a folder, only the relevant
code for that feature is visible, avoiding clutter from unrelated concerns.

### API layer separated from features

The API layer lives in `lib/api/`, decoupled from feature modules. This
choice is driven by two observations:

1. API calls are not necessarily tied to a single feature — a resource
   like `/tools` is consumed by the Dashboard, the Tools page, and the
   Analytics page. Centralizing them avoids duplication.
2. Separating API logic from feature logic improves clarity, readability,
   and most importantly evolvability: the API layer can evolve
   independently from the modules that consume it.

### Two-layer split: `api` + `service`

Within each resource, I split concerns into two layers:

- **`*.api.ts`** — a deliberately simple layer that handles only the HTTP
  call itself. Returns the raw `AxiosResponse<T>`.
- **`*.service.ts`** — handles everything around the call: data mapping,
  Zod validation, normalization, and business-oriented operations
  (e.g. `fetchActiveToolsCount`, `fetchRecentTools`).

This separation keeps each layer focused and testable.

### Custom hooks per query

Each TanStack Query is wrapped in its own custom hook rather than called
inline in components. This small-grained decomposition makes evolutions,
additions, and fixes easy to target and maintain, and keeps components
focused on rendering rather than data orchestration.

### UI states

Each block handles four states consistently:

- **Loading** → `Skeleton` components (shimmer animation, matches the final layout to avoid layout shift)
- **Error (no data yet)** → `<ErrorState />` with a retry button
- **Empty** → `<EmptyState />` with a contextual message
- **Data** → the real component

Stale data is preserved when a background refetch fails (the error state only replaces the view on first load).

Global React crashes are caught by `<ErrorBoundary>` at `main.tsx`, which renders `<GlobalErrorFallback />` (fullscreen, with Retry + Go home).

## 📊 Data Integration Strategy

### Runtime validation with Zod

The backend exposes multiple inconsistencies and edge cases (detailed
below). I chose to validate, filter, and normalize all API responses
with Zod rather than trusting the API as-is. This is especially
important because this app is stat-driven: the data *is* the product.
Passing corrupted data through to the UI would directly impact the
end user.

Zod acts as an **adaptation layer** at the service level, before any
data reaches the React tree.

### Total count via `X-Total-Count` header (temporary workaround)

The backend does not return explicit total counts on list endpoints,
which prevents displaying key metrics to the user. As a temporary
workaround, I read the `X-Total-Count` response header (requires
`Access-Control-Expose-Headers: X-Total-Count` on the server, which
is set on the provided API).

This is a **temporary solution** — the backend should expose proper
count endpoints or include the total in the response body.

### Filtering invalid records (Tools)

The Tools API still contains legacy test data with incomplete or
malformed records (e.g. records with only `id` and `name`). As a
temporary safeguard, these are filtered out at the service layer
via per-item `safeParse`, so they never reach the UI and never break
business rules.

This filtering is **temporary** and should be resolved by cleaning
up the backend data. A log is emitted in development mode to surface
how many records are filtered on each fetch.

### Inconsistencies in `owner_department` (Tools)

The `owner_department` field on tools has two known issues:

- It sometimes references departments that don't exist in `/departments`,
  which impacts the user experience (unknown departments shown in the UI).
- Casing is inconsistent across records (`"Engineering"` vs `"engineering"`).

Casing is normalized client-side via Zod transforms. However,
cross-resource validation (verifying the department actually exists)
is **not** performed at the schema level — this would require a
secondary API call during parsing and is a backend responsibility.

### JSON Server comparison operators

JSON Server v1 no longer supports the full set of comparison operators.
Specifically, `_gt`, `_gte`, `_lt`, `_lte`, and `_ne` behave
inconsistently: some are silently ignored and return the full
resource unfiltered, producing misleading results.



These operators are kept as commented-out entries in the TypeScript
query param types, to document the intent and ease future migration.

### `_embed=users` on `/departments`

The `_embed=users` query parameter on the `/departments` endpoint
consistently returns an empty `users: []` array, likely due to a
seed configuration mismatch. This does not affect the Dashboard (J6)
but is worth noting for the Analytics page (J8) if cross-data between
users and departments becomes necessary.

### KPI "Active Tools" — server-side case sensitivity

The server-side filter `?status=active` is case-sensitive. Records
with `status: "Active"` (capitalized, seed anomaly) are **not**
counted by the server-side filter.

I assume the convention is lowercase `"active"`, and treat the
capitalized entries as data anomalies. The Zod schema normalizes
casing for UI display consistency, but the KPI count reflects the
server-side filtered result — aligned with the expected data
convention.