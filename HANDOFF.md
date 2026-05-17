# godsbattle.net — Hugo → Next.js Migration Handoff

This doc fully briefs the next session. Read it top to bottom before touching code.

---

## TL;DR — What this is

Migration of **godsbattle.net** (Christian Obanaka's personal site) from Hugo (Blowfish theme) to **Next.js 16 + React 19 + Tailwind v4**, deploying to Vercel. The new build lives in `web/` alongside Hugo so the live site keeps working until cutover.

The site is one thing wearing four hats:
1. **Personal portfolio + resume** (the home page IS the resume)
2. **Blog** (29 existing posts about PC optimization, software, gaming)
3. **trackmyprop landing** (his prop firm trader portfolio tracker, coming soon, with email waitlist)
4. **Free downloads "store"** (TradingView color packs, Notion templates, more — every download is a $0 whop purchase)

---

## CRITICAL constraint — URL preservation

The 29 blog posts at `/posts/<slug>/` are linked from his YouTube channel descriptions on every video. Manually updating those YouTube links would be enormously painful.

**Rule:** Mirror Hugo's URL structure exactly. Never rename existing post URLs. Use `vercel.json` 301 redirects for any taxonomy URLs (`/tags/*`, `/categories/*`, `/series/*`, `/authors/*`) that we drop, and for `/proptracker/ → /trackmyprop/`.

---

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16.2.6 (App Router) | Turbopack is default in v16 — no `--turbopack` flag needed |
| Runtime | React 19.2.4 | View Transitions, `useEffectEvent`, Activity available |
| Styling | Tailwind v4 + `@theme inline` | Tokens defined in `web/app/globals.css` |
| Theme | `next-themes` (class strategy) | `defaultTheme="system"`, `enableSystem` |
| Fonts | Geist Sans + Geist Mono + Instrument Serif | Serif italic is the one-distinctive-typographic-moment |
| Color | OKLCH only | Warm-tinted neutrals (no `#fff`/`#000`), warm amber accent `oklch(66% 0.18 50)` |
| Markdown | `gray-matter` + `unified` (remark-parse → remark-gfm → remark-rehype with `allowDangerousHtml` → rehype-raw → rehype-stringify) | |
| YouTube | `lite-youtube-embed` web component (loaded on client only via dynamic import) | |
| Deploy | Vercel | Project root will be `web/` subdir; configure in Vercel project settings |
| Auth | None | Downloads handled by whop (link-out, not embedded checkout) |
| Forms | None on our side | trackmyprop waitlist goes to whop's built-in waitlist |

**Next 16 breaking changes worth knowing:**
- `params` and `searchParams` are Promises — always `await`
- Use the global `PageProps<'/posts/[slug]'>` and `LayoutProps<'/route'>` helpers (no import needed; auto-generated)
- `middleware.ts` is renamed to `proxy.ts` (we don't need either — using `vercel.json` for redirects)
- `images.domains` deprecated — use `images.remotePatterns`
- `next lint` removed — use ESLint directly
- `revalidateTag` requires a second arg (cacheLife profile)

---

## Repo layout

```
/Volumes/website/GitHub/website/
├── content/posts/<slug>/index.md      # Hugo posts, READ BY Next.js at build
├── content/posts/<slug>/featured.webp # post thumbnail
├── content/proptracker/               # legacy Hugo trackmyprop page
├── themes/blowfish/                   # legacy Hugo theme
├── hugo.toml                          # legacy Hugo config
├── public/                            # legacy Hugo build output
├── HANDOFF.md                         # this file
├── .claude/skills/                    # 16 design/quality skills
└── web/                               # NEW Next.js project
    ├── app/
    │   ├── layout.tsx                 # root layout, fonts, ThemeProvider
    │   ├── providers.tsx              # 'use client' next-themes wrapper
    │   ├── globals.css                # OKLCH tokens, type setup, motion defaults
    │   ├── page.tsx                   # HOME (current iteration)
    │   └── favicon.ico
    ├── lib/
    │   ├── posts.ts                   # post reading + meta
    │   ├── markdown.ts                # markdown → HTML pipeline
    │   └── shortcodes.ts              # Hugo shortcode → HTML transformer
    ├── components/
    │   └── youtube-lite.tsx           # 'use client' lite-youtube registration
    ├── types/
    │   └── lite-youtube-embed.d.ts    # ambient module declaration
    ├── public/
    │   └── avatar.webp                # godsbattle logo (placeholder)
    ├── package.json
    ├── tsconfig.json
    └── next.config.ts
```

After cutover: delete Hugo files (`content/proptracker/`, `themes/`, `hugo.toml`, `archetypes/`, `i18n/`, `layouts/`, `resources/`, `static/`, `public/`, `go.mod`, `go.sum`, `assets/`). **Keep** `content/posts/` for now — Next.js reads from it.

---

## Design DNA (locked references)

| Surface | Reference | What to take |
|---|---|---|
| Site shell, hero, type rhythm | **jakub.kr** | Narrow centered column ~620px; avatar+name compact unit; bio as prose with inline social links; quiet section captions; one distinctive type moment (his is *care deeply* serif italic mid-sentence) |
| Blog index `/posts` | **oliur.com/blog** | Vertical stack of full-width cards: large `featured.webp` + bold sentence-case title + 1-line excerpt. No date or tags on the index. |
| Free downloads `/free` | **platsupply.com** | Section-rows by category. Mockup-style product cards on light gray. Big colored "featured" hero for trackmyprop "coming soon". Replace `$X` price slot with `Free` badge. |

These are LOCKED. Don't propose alternatives without prompting.

---

## Brand & voice

- Personal name **Christian Obanaka** — proper case
- Product brand **trackmyprop** — **always lowercase** (one word, never TrackMyProp). See [trackmyprop branding memory](/Users/christian/.claude/projects/-Volumes-website-GitHub-website/memory/trackmyprop_branding.md)
- All other site copy is **lowercase voice** (sections, body, footer captions, link words)
- **NO em dashes anywhere** in copy — use commas, colons, semicolons, periods, parentheses (impeccable absolute ban)

Social handles:
- YouTube: youtube.com/godsbattle (channel name "godsbattle")
- X: x.com/chrisgoingturbo
- Instagram: instagram.com/chrisgoingturbo
- GitHub: github.com/chrisgoingturbo
- Email: christian@godsbattle.net

---

## Decisions log

| Decision | Value | When |
|---|---|---|
| Framework | Next.js (over Astro) | User picked React |
| Subdir | `web/` (not sibling repo) | Coexists with Hugo cleanly |
| Component library | None — hand-roll for minimalist DNA | (no shadcn) |
| Store URL slug | `/free` | |
| Whop integration | Link-out button (no embedded checkout) | |
| Waitlist destination | Whop's built-in waitlist | Single source of truth |
| Tags | Dropped entirely | Not shown anywhere |
| Videos section on home | No — embeds inline in posts only | |
| `/proptracker/` URL | 301 redirect to `/trackmyprop/` | |
| Color palette | Tinted warm neutrals + single warm amber accent `oklch(66% 0.18 50)` | Per impeccable: never `#fff`/`#000`, tint toward brand hue |
| Display font moment | Instrument Serif italic at ~26px in accent color | The "one moment" per jakub.kr DNA |
| Microinteractions | Custom ease-out `cubic-bezier(0.23, 1, 0.32, 1)` at 180ms; `:active scale(0.97)` | Per emil-design-eng |

---

## 8-phase migration plan

| # | Phase | Status | Notes |
|---|---|---|---|
| 1 | Scaffold Next.js project alongside Hugo | ✅ done | Builds clean, static prerender works |
| 2 | Content pipeline (markdown + Hugo shortcodes) | ✅ done | All 5 shortcodes handled: `youtubeLite`, `article`, `github`, `button`, `alert` |
| 3 | Home page (jakub.kr DNA) | 🔄 iterating | First cut shipped, audit + second iteration done. See "Phase 3 status" below |
| 4 | Blog index + post page (oliur.com DNA) | ⏳ pending | `/posts` index + `/posts/[slug]` dynamic. URLs preserved exactly |
| 5 | trackmyprop landing | ⏳ pending | Hero + "coming soon" + Notify-me email → whop waitlist |
| 6 | Free downloads (platsupply DNA) | ⏳ pending | Section rows by category, "Get for free" → whop product page |
| 7 | Redirects, sitemap, robots | ⏳ pending | `vercel.json` 301s + sitemap.xml + robots.txt |
| 8 | Deploy + cutover | ⏳ pending | Vercel staging → smoke test old YouTube post URLs → DNS cutover → delete Hugo files |

---

## Phase 3 status (where we paused)

**First cut** had: hero with avatar + name + role + 2-paragraph bio, projects section (trackmyprop card), writing list (6 recent posts), free section (mini-card teaser), footer.

**User feedback:** "still looks low key made without [care]" — wanted real design polish.

**Audit performed against impeccable + emil-design-eng + frontend-design skills. Findings + fixes (now in code):**

| Issue | Fix shipped |
|---|---|
| Em dashes in bio copy | All replaced with commas/parens |
| Pure white/black tokens | Tinted warm: bg `oklch(98.5% 0.004 70)`, fg `oklch(18% 0.006 60)` |
| Identical card structures | trackmyprop = 180px gradient+dot preview area + content row; free = numbered text rows (no card) |
| Same `p-5` padding everywhere | Varied per section |
| Flat type scale (everything ~14-15px) | Hero name 15/medium, role 13/muted, body 15/leading-1.7, captions 11px UPPERCASE tracked, the *care a lot* phrase 26px serif italic accent |
| `*care a lot*` italic blended in | Now 26px in amber — actually reads as a voice break |
| Zero saturated color | Single accent (warm amber) used in 3 places: the italic phrase, trackmyprop pill, hover states |
| Generic `→` arrow CTA | Replaced with prose CTA "browse the shelf →" |
| Template copyright footer | Personal sign-off: "*built quietly. say hi at email, or find me as @chrisgoingturbo (almost everywhere).*" |
| No microinteractions | Added `:active scale(0.97)`, custom ease-out, pulsing dot on "soon" pill |

**Still placeholder, awaiting real assets:**
- trackmyprop card preview area is a gradient + dot pattern (will become real screenshot in phase 5)
- Avatar is the godsbattle logo (could swap for personal photo if user provides one)

**Next iteration could:**
- Add an announcement pill at the top ("trackmyprop launching soon", linking to `/trackmyprop`)
- Refine bio copy further with user input
- Try a different accent hue if amber doesn't sit right

---

## Skills available (use them aggressively)

16 design/quality skills copied to `/Volumes/website/GitHub/website/.claude/skills/` from proptracker on 2026-05-15. They auto-activate at session start in this project directory.

**Design fundamentals:**
- `frontend-design` — distinctive production-grade interfaces, no AI slop aesthetics
- `emil-design-eng` — Emil Kowalski's craft philosophy (animation, polish, taste)
- `make-interfaces-feel-better` — invisible details that compound (concentric border radius, optical alignment, font smoothing, tabular numbers, hit areas, scale-on-press)
- `impeccable` — design audit/critique system with absolute bans (no em dashes, no pure white/black, no identical card grids, no glassmorphism, no gradient text, no side-stripe borders)
- `bencium-innovative-ux-designer`, `interaction-design`, `interface-design`, `ui-ux-pro-max`, `gpt-taste`

**Color/visual:**
- `oklch-skill` — perceptually uniform color, palette generation, contrast checks
- `baseline-ui` — animation timing, type scale, accessibility baseline

**Quality/audit:**
- `react-doctor` — React code review
- `fixing-accessibility`, `wcag-audit-patterns` — a11y audits
- `fixing-motion-performance` — animation perf

**Workflow:**
- `create-feature` — end-to-end UI feature build (grills the user first)

**Before any UI work, read these SKILL.md files at minimum:**
- `.claude/skills/impeccable/SKILL.md` (absolute bans + design laws)
- `.claude/skills/emil-design-eng/SKILL.md` (animation framework + craft principles)
- `.claude/skills/make-interfaces-feel-better/SKILL.md` (invisible-details checklist)
- `.claude/skills/frontend-design/SKILL.md` (avoid generic AI aesthetics)

---

## Memory files (read first in any new session)

These auto-load via the Claude memory system but reference them explicitly if the harness doesn't:

- `/Users/christian/.claude/projects/-Volumes-website-GitHub-website/memory/MEMORY.md` — index
- `/Users/christian/.claude/projects/-Volumes-website-GitHub-website/memory/website_migration.md` — full project context
- `/Users/christian/.claude/projects/-Volumes-website-GitHub-website/memory/trackmyprop_branding.md` — brand rules (lowercase, /trackmyprop URL)

---

## Dev commands

```bash
# Start dev server (Turbopack default, http://localhost:3000)
cd /Volumes/website/GitHub/website/web && npm run dev

# Production build (verifies types + prerenders)
cd /Volumes/website/GitHub/website/web && npm run build

# Lint
cd /Volumes/website/GitHub/website/web && npm run lint

# Add a dependency
cd /Volumes/website/GitHub/website/web && npm install <pkg>
```

The dev server URL is **http://localhost:3000** (with port). Just `localhost` hits port 80 and shows blank.

---

## Hugo shortcodes inventory (for the content pipeline)

The 29 markdown posts use 5 Hugo shortcodes, all handled in `web/lib/shortcodes.ts`:

| Shortcode | Form | Becomes |
|---|---|---|
| `youtubeLite` | Self-closing: `{{< youtubeLite id="X" label="Y" >}}` | `<lite-youtube videoid="X" playlabel="Y">` web component |
| `article` | Self-closing: `{{< article link="/posts/slug/" >}}` | Post card with title + excerpt + image, looked up from post index |
| `github` | Self-closing: `{{< github repo="user/name" >}}` | GitHub repo card link |
| `button` | Paired: `{{< button href="..." >}}label{{< /button >}}` | Styled link |
| `alert` | Paired: `{{< alert >}}content{{< /alert >}}` | `<div class="alert">` callout |

**Phase 4 will need to add CSS for `.post-card`, `.github-card`, `.btn`, `.alert` classes** (the shortcode transformer outputs them but they're unstyled right now).

---

## Open items that need user input before phase 5

1. trackmyprop tagline / one-liner copy
2. trackmyprop preview screenshot (or placeholder direction)
3. Whop product URLs for the free downloads (TradingView color packs slug, Notion templates slug)
4. Whether to add an announcement pill on home for "trackmyprop coming soon"
5. Personal avatar photo (or stay with godsbattle logo)

---

## Quick re-orient checklist for next session

1. Read this HANDOFF.md
2. Read `.claude/skills/impeccable/SKILL.md` + `.claude/skills/emil-design-eng/SKILL.md` (the design laws)
3. Run `cd web && npm run dev` and visit `http://localhost:3000` to see current state
4. Check `TaskList` if available for live phase tracking
5. Resume at the current phase (was phase 3 iteration; next up is phase 4 blog routes)
