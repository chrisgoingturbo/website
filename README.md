# godsbattle.net

christian obanaka's personal site — next.js 16 + react 19 + tailwind v4, deployed to cloudflare workers via opennext.

everything lives in [`web/`](web/):

```sh
cd web
pnpm install
pnpm dev      # local dev on :3000
pnpm deploy   # manual deploy (CI deploys automatically on push to main)
```

blog posts are markdown in `web/content/posts/<slug>/index.md`; post URLs (`/posts/<slug>/`) are permanent — they're linked from youtube video descriptions.
