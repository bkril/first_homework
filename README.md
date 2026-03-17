# EPL Stats

A web application for browsing English Premier League club statistics. Browse the full list of teams, view detailed club information, and access protected routes via authentication.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styles | Tailwind CSS v4 + shadcn/ui |
| Auth | [Supabase](https://supabase.com/) (email + password) |
| State | Zustand (persisted in localStorage) |
| Data fetching | [TanStack Query v5](https://tanstack.com/query) |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) (EN / DE) |
| E2E tests | [Playwright](https://playwright.dev/) |
| Teams data | [TheSportsDB API](https://www.thesportsdb.com/) |

## Features

- Full list of EPL clubs with badges and founding year
- Club detail page — stadium, capacity, description, official website
- Language switcher (EN / DE) in the header
- Auth guard — unauthenticated users are redirected to the login page
- New account registration

## Project Structure

```
src/
├── app/
│   ├── (web)/[locale]/         # All pages with locale prefix
│   │   ├── page.tsx            # Home page (team list)
│   │   ├── auth/page.tsx       # Sign in / Sign up (tabs)
│   │   └── items/[id]/page.tsx # Team detail page
│   ├── features/               # Isolated features (auth, teams, language)
│   ├── modules/auth/           # AuthProvider — route protection
│   ├── providers/              # QueryProvider
│   ├── shared/                 # UI components, API, store, utils
│   └── widgets/header/         # Header with navigation
├── i18n/                       # next-intl configuration
└── middleware.ts               # Locale redirect
__tests__/
└── e2e/
    ├── auth.setup.ts           # One-time Playwright auth setup
    └── flows/
        └── main.spec.ts        # E2E tests (3 scenarios)
```

## Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Values can be found in your [Supabase Dashboard](https://app.supabase.com/) → Settings → API.

### 3. Start the dev server

```bash
npm run dev
```

The app will be available at [http://localhost:3000/en](http://localhost:3000/en).

### 4. Production build

```bash
npm run build
npm run start
```

## E2E Tests (Playwright)

### Setup

Create a `.env` file in the project root with the test account credentials (the account must exist in Supabase):

```env
TEST_USER_EMAIL=your_test_email@example.com
TEST_USER_PASSWORD=your_test_password
```

### Run all tests

```bash
npx playwright test
```

### Run in a specific browser

```bash
npx playwright test --project=chromium
```

### View the report after a run

```bash
npx playwright show-report
```

### Test scenarios

| # | Name | Description |
|---|---|---|
| 1 | `should display the list of items` | After login, verifies that team cards are rendered |
| 2 | `should navigate to item details page` | Clicks the first card → checks URL matches `/items/:id` and "Back to list" link is visible |
| 3 | `should redirect unauthenticated user` | No session → verifies redirect to `/auth` |

## Deploy

> Link will be added later.

---

## Screenshots

> *(can be added later)*
