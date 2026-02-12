# Zephyr Blog

Personal portfolio built with Next.js 14, Tailwind CSS and Framer Motion. The blog section pulls content directly from a Notion database so new posts can be published without touching the codebase.

## Getting Started

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

The site is available at [http://localhost:3000](http://localhost:3000).

## Notion Blog Integration

1. Create a Notion database (table view works best) with at least the following properties:
   - `Name` (Title) — post title.
   - `Slug` (Text or Formula) — unique slug used for routes.
   - `Description` (Rich text) — optional short description for cards and meta tags.
   - `Tags` (Multi-select) — optional tag list.
   - `Date` (Date) — publish date, used for ordering.
   - `Published` (Checkbox) — only checked posts are shown on the site.
2. Create a Notion integration at https://www.notion.so/my-integrations and copy the internal integration token.
3. Share the database with the integration so it can read the content.

### Environment Variables

Create a `.env.local` file in the project root:

```
NOTION_TOKEN=secret_xxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- `NOTION_TOKEN` — internal integration token from step 2.
- `NOTION_DATABASE_ID` — the 32 character ID of your database (found in the URL after `notion.site/`).

Restart the dev server after setting the variables. Once configured, visit `/blog` to see the live content.

## Scripts

- `npm run dev` — start the development server.
- `npm run build` — create an optimized production build.
- `npm run start` — run the production build locally.
- `npm run lint` — run lint checks.
