# Work Plan: Shelf — Book Discovery App

Based on [Practical Exercise_ Shelf — Senior Full Stack Frontend Developer.md](../Practical%20Exercise_%20Shelf%20%E2%80%94%20Senior%20Full%20Stack%20Frontend%20Developer.md). The hard limit is **4 hours** — prioritize a working, deployable app over polish.

---

## Success criteria (all four deliverables)

| # | Deliverable | Done when |
|---|-------------|-----------|
| 1 | Public GitHub repo | Small, frequent commits with clear messages |
| 2 | Live URL | Deployed on Vercel / Netlify / Cloudflare Pages with API key in platform env |
| 3 | README | Setup, assumptions, tradeoffs, unfinished items, AI usage |
| 4 | Screen recording | ≤5 min Loom walkthrough of app + code |

---

## Phase 0 — Prep (15–20 min, before coding)

**Goal:** Remove unknowns so you don’t rework later.

1. **Get Google Books API key**
   - Google Cloud Console → new project → enable Books API → create API key
   - Restrict the key (HTTP referrer for prod, localhost for dev)

2. **Call the API manually** (assignment requirement)
   ```bash
   curl "https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=YOUR_KEY"
   curl "https://www.googleapis.com/books/v1/volumes/VOLUME_ID&key=YOUR_KEY"
   ```
   - Note optional/missing fields: `imageLinks`, `description`, `publishedDate`, `categories`
   - Map API responses to typed models without inventing or substituting missing values

3. **Sketch architecture**
   - **Server-side API proxy** in Nuxt so the key never hits the browser
   - Routes: `/` (search), `/book/[id]` (detail), shortlist in UI (header drawer or `/shortlist`)
   - Shortlist: `localStorage` (simplest, survives refresh)

---

## Phase 1 — Project scaffold (25–30 min)

**Goal:** Runnable Nuxt 4 app with Tailwind v4 and env setup.

| Task | Time |
|------|------|
| `npx nuxi@latest init shelf` (or equivalent Nuxt 4 scaffold) | 5 min |
| Add Tailwind CSS v4 per Nuxt docs | 10 min |
| TypeScript + folder structure | 5 min |
| `.env` + `.env.example` (`GOOGLE_BOOKS_API_KEY=`) | 2 min |
| Initial commit: `"chore: scaffold Nuxt 4 + Tailwind v4"` | 2 min |
| Central design tokens (CSS variables or `@theme` in Tailwind v4) | 5 min |

**Suggested structure:**
```
server/api/books/search.get.ts
server/api/books/[id].get.ts
pages/index.vue
pages/book/[id].vue
components/BookCard.vue
components/BookDetail.vue
components/ShortlistPanel.vue
composables/useShortlist.ts
types/book.ts
```

---

## Phase 2 — Core features (90–100 min)

### 2a. Search page (~35 min)

- [ ] Search input with debounce (~300ms)
- [ ] `useFetch` / `$fetch` → `/api/books/search?q=...`
- [ ] Results grid: cover, title, author, year
- [ ] Loading, empty, and error states
- [ ] Click result → navigate to `/book/[id]`
- [ ] Commit: `"feat: add book search with results grid"`

### 2b. Detail page (~25 min)

- [ ] Dynamic route `/book/[id]`
- [ ] Fetch from `/api/books/[id]`
- [ ] Show: large cover, description, publisher, page count, categories
- [ ] Back to search + 404 for invalid ID
- [ ] Commit: `"feat: add book detail page"`

### 2c. Shortlist (~30 min)

- [ ] `useShortlist` composable: add, remove, list, persist to `localStorage`
- [ ] “Add to shortlist” on search cards and detail page
- [ ] Shortlist UI (header badge + slide-over or dedicated page)
- [ ] Remove from shortlist; show count
- [ ] Commit: `"feat: add persistent shortlist"`

### 2d. Server API proxy (~10 min)

- [ ] `search.get.ts` — proxy to Google Books search
- [ ] `[id].get.ts` — proxy to volume detail
- [ ] Map response to typed `Book` / `BookDetail` models (no fallbacks — see Technical decisions)
- [ ] Commit: `"feat: add server-side Google Books API proxy"`

---

## Phase 3 — UI polish (20–25 min)

**Goal:** Clean, consistent UI without over-investing.

- [ ] Apply design tokens (colors, spacing, typography)
- [ ] Responsive layout (mobile-first grid)
- [ ] Handle absent fields in the presentation layer (conditional rendering), not in mappers
- [ ] Truncate long titles/descriptions in the UI where needed
- [ ] Commit: `"style: apply design tokens and responsive layout"`

---

## Phase 4 — Storybook (25–30 min, hard cap)

**Goal:** Stories for **at least 2 presentational components**.

| Priority | Component | Why |
|----------|-----------|-----|
| 1 | `BookCard` | Search results, props-driven |
| 2 | `BookDetail` or shortlist item | Rich props, good demo value |

- [ ] Install Storybook for Nuxt/Vue
- [ ] 2–3 stories per component (default, no cover, long title)
- [ ] **If config blocks you after ~30 min:** stop, document in README, move on

Commit: `"feat: add Storybook stories for BookCard and BookDetail"`

---

## Phase 5 — Deploy (20–25 min)

1. Push to **public** GitHub repo
2. Connect Vercel / Netlify / Cloudflare Pages
3. Set `GOOGLE_BOOKS_API_KEY` in platform env (not in repo)
4. Smoke test: search, detail, shortlist, refresh
5. Commit any deploy fixes: `"fix: deployment config"`

---

## Phase 6 — Documentation & recording (25–30 min)

### README (~15 min)

- [ ] Local setup (`pnpm install`, `.env`, `pnpm dev`)
- [ ] Assumptions (e.g. shortlist in localStorage, year from `publishedDate`)
- [ ] Tradeoffs (no auth, no backend DB, Storybook scope)
- [ ] Unfinished / broken (honest list)
- [ ] AI usage (what AI helped with, what you changed)

### Screen recording (~10 min)

- [ ] App: search → detail → add/remove shortlist → refresh
- [ ] Code: API proxy, shortlist composable, one component
- [ ] “First production change: …” (e.g. error monitoring, API caching, tests)
- [ ] Unlisted Loom link in README or submission email

---

## Recommended 4-hour timeline

```
0:00 – 0:20   Phase 0: API key + explore responses
0:20 – 0:50   Phase 1: Scaffold + tokens
0:50 – 2:30   Phase 2: Search, detail, shortlist, API proxy
2:30 – 2:55   Phase 3: UI polish
2:55 – 3:25   Phase 4: Storybook (30 min max)
3:25 – 3:50   Phase 5: Deploy
3:50 – 4:00   Phase 6: README + record (or finish README if over)
```

If you slip, cut in this order:
1. Storybook extras (keep 2 component stories minimum)
2. UI polish
3. Shortlist UI polish (keep add/remove + persistence)

Do **not** cut: server proxy, search, detail, shortlist persistence, deploy, README honesty.

---

## Commit checklist (throughout)

Aim for **8–12 commits**, e.g.:

1. `chore: scaffold Nuxt 4 + Tailwind v4`
2. `feat: add design tokens`
3. `feat: add Google Books API proxy`
4. `feat: add book search page`
5. `feat: add book detail page`
6. `feat: add shortlist with localStorage`
7. `style: responsive layout and empty states`
8. `feat: add Storybook for BookCard and BookDetail`
9. `chore: add README and env example`
10. `fix: deployment adjustments`

---

## Technical decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| API key | Nuxt `server/api/*` routes | Never exposed to browser |
| Shortlist storage | `localStorage` | Meets “survives refresh” with minimal time |
| Shortlist location | Header icon + panel | Visible without extra route |
| State | Composables + `useFetch` | Matches Nuxt/Vue 3 patterns |
| Missing API fields | **No fallbacks in mappers** — map only what the API returns; use optional/nullable types and handle absence in the UI | Keeps the data layer honest; inconsistent API data is surfaced explicitly rather than masked |

---

## Pre-submission checklist

- [ ] Search works end-to-end
- [ ] Detail page has its own URL
- [ ] Shortlist add/remove survives refresh
- [ ] No API key in repo or client bundle
- [ ] `.env.example` present
- [ ] Live URL works
- [ ] README complete
- [ ] Recording link included
- [ ] Unfinished items documented honestly
