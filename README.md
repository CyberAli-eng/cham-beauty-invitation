# Cham Beauty

Luxury events and experiences.

## Getting started

Requirements: Node.js and npm (or [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

```sh
# Install dependencies
npm i

# Start development server
npm run dev
```

## Tech stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment (Render)

This is a single-page app (SPA). For **https://chamevent.in/gallery** (and other routes) to open in a new tab or on refresh, add a **Rewrite** in Render:

1. In [Render Dashboard](https://dashboard.render.com), open your **Static Site**.
2. Go to **Settings** → **Redirects/Rewrites**.
3. Add a rule:
   - **Source Path:** `/*`
   - **Destination Path:** `/index.html`
   - **Action:** **Rewrite** (not Redirect)
4. Save. Render will redeploy; after that, `/gallery` and all client routes will work when opened directly or in a new tab.

## Scripts

- `npm run dev` — Start dev server with hot reload
- `npm run build` — Production build
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
- `npm run test` — Run tests
