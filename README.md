# Ashley Goh — Portfolio

Personal portfolio for Ashley Goh (product / UX designer, CS background). Content is managed with [Keystatic](https://keystatic.com/) and stored as files in this repo.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Keystatic CMS (`@keystatic/core`, `@keystatic/next`)
- Deploy on Vercel

## Run locally

```bash
npm install
npm run seed    # placeholder images + resume content (safe to re-run)
npm run dev
```

Open [http://localhost:43123](http://localhost:43123).

- **Site:** `/`
- **About:** `/about`
- **Keystatic Admin (local):** `/keystatic`

## Edit content

### Local mode (development)

By default, Keystatic uses **local** storage. Run `npm run dev` and open `/keystatic` to edit:

- **Site settings** — thesis, intro, “Currently”, contact links, section headings/descriptions/order, resume PDF
- **Projects** — case studies (gallery, full story, design + build callout, tags, etc.)
- **About** — photo, line-art portrait, bio, beyond-work cards, background

Changes save directly into the `content/` folder and `public/images/`.

### GitHub mode (production on Vercel)

On Vercel, set storage to GitHub so you can edit live content at `/keystatic`:

1. Deploy this repo to Vercel (see below).
2. In the Vercel project **Environment Variables**, add:
   - `KEYSTATIC_GITHUB_REPO` = `ashleygoh1001/ashleygohportfolio` (your `owner/name`)
   - `NODE_ENV` = `production` (Vercel sets this automatically)
3. Visit **`https://your-app.vercel.app/keystatic`** while logged into GitHub with write access to the repo.
4. Complete the GitHub App authorization flow when prompted.
5. Copy the generated Keystatic env vars into Vercel (Keystatic creates these on first auth locally; on Vercel you add them manually after authorizing once from a local `github` mode session, or follow [Keystatic GitHub mode docs](https://keystatic.com/docs/github-mode)):
   - `KEYSTATIC_GITHUB_CLIENT_ID`
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`
   - `KEYSTATIC_SECRET`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
6. Redeploy. `/keystatic` on production will read/write content via GitHub.

Optional:

- `NEXT_PUBLIC_SITE_URL` — canonical URL for sitemap/Open Graph (e.g. `https://ashleygohportfolio.vercel.app`)

## Add a new project

1. Open `/keystatic` → **Projects** → **Create entry**.
2. Fill in title (slug), section, order, cover image, tags, at-a-glance fields, gallery, full story, optional design + build callout, links.
3. Commit the new files under `content/projects/` and `public/images/projects/` (or let GitHub mode commit for you on production).

## Images & video

- **Cover & gallery images:** upload in Keystatic; files land in `public/images/projects/`. **Alt text is required** on gallery images.
- **About photos:** `public/images/about/`
- **Resume PDF:** upload in Site settings → stored in `public/files/`
- **YouTube/Vimeo:** add a **Video embed** block in the gallery (lazy-loaded facade on the site).
- **MP4:** add an **Uploaded MP4** block (stored in `public/videos/`).

Replace placeholder SVG covers in `public/images/projects/` with your own media anytime.

## Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New Project** → import the repo.
3. Framework preset: **Next.js** (default build command `npm run build`, output `.next`).
4. Add environment variables (see GitHub mode above when you want live CMS editing).
5. Deploy. Your site will be available at `*.vercel.app`.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port 43123 |
| `npm run build` | Production build (static pages + Keystatic routes) |
| `npm run seed` | Regenerate placeholder assets + default JSON content |
| `npm run contrast` | WCAG contrast report for design tokens |

## Contrast

Run `npm run contrast` after changing colors. All checked text/background pairs target WCAG AA (4.5:1 for body text).
