# godsbattle.net

my personal corner of the internet — portfolio, writing, and the occasional rabbit hole.

**stack:** next.js 16 · react 19 · tailwind v4 · self-hosted inter · deployed to cloudflare workers via [opennext](https://opennext.js.org/cloudflare)

## structure

```
web/
├── app/            # routes: home, /posts, /resume, /free
├── components/     # hand-rolled — no component library
├── content/posts/  # blog posts as markdown, one folder per slug
└── lib/            # markdown pipeline (remark/rehype + hugo shortcode compat)
```

## develop

```sh
cd web
pnpm install
pnpm dev        # http://localhost:3000
```

## deploy

pushes to `main` deploy automatically via github actions. `pnpm deploy` from `web/` does the same thing manually.

## notes

- post URLs (`/posts/<slug>/`) are permanent — they're linked from youtube video descriptions. old hugo-era paths 301 in `next.config.ts`.
- the site is intentionally quiet: one typeface, no color, hierarchy through opacity, no divider lines. inspired by [jakub.kr](https://jakub.kr) and [emilkowal.ski](https://emilkowal.ski).
