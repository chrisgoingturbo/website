# godsbattle.net

design engineering portfolio, trackmyprop case study, and an archive of earlier technical writing.

**stack:** next.js 16 · react 19 · tailwind v4 · self-hosted inter · deployed to vercel

## structure

```
web/
├── app/            # routes: home, /work/trackmyprop, /resume, /posts, /free
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

pushes to `main` deploy automatically via vercel.

## notes

- post URLs (`/posts/<slug>/`) are permanent — they're linked from youtube video descriptions. old hugo-era paths 301 in `next.config.ts`.
- the site is intentionally quiet: one typeface, no color, hierarchy through opacity, no divider lines. inspired by [jakub.kr](https://jakub.kr) and [emilkowal.ski](https://emilkowal.ski).
