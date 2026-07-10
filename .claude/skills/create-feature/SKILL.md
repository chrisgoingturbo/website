---
name: create-feature
description: Build a new UI component, page/section, or UI-first feature in the trackmyprop desktop app end-to-end — grill for requirements, route through the installed UI Skills design stack, plan with extended thinking, confirm once, then scaffold + write + audit + verify + update the glossary + commit. Use when the user asks to create a feature, build a page, add a section, make a new component, or says "I want to add X" to the desktop app. Applies the project's hard rules (lowercase brand, no ALL CAPS titles, monochrome UI, no decorative icons in cards, max-width layouts, unified component sizes, Bklit charts, Vite-aware desktop renderer work, no direct useEffect) without being asked.
---

# Create a Feature

End-to-end pipeline for building UI work in `apps/desktop/`. Replaces the stressful "explain everything from scratch" loop.

## When to use

- `/create-feature <prompt>` or "add a {page|component|section} for X"
- User wants a new UI component, page/section, or UI-first feature (may have an optional backend tail)
- Anywhere the work lives under `apps/desktop/src/renderer/` (this skill's primary scope)

## When NOT to use

- **Pure backend** work (FastAPI route, DB migration, copier engine) without UI — do it directly, not through this skill.
- **Bugfix** — use `superpowers:systematic-debugging` instead.
- **Design exploration** with no intent to ship code — use `impeccable`, `frontend-design`, `interface-design`, or `ui-ux-pro-max` standalone.
- **Refactor** of existing working UI — this skill is for net-new, not for reshaping.

## Scope

Primary: `apps/desktop/src/renderer/` — components, sections, hooks, types.
Secondary (only if the feature genuinely requires it): `apps/desktop` Vite config/build plumbing, `backend/` routes, `lib/` types, env vars on Vercel / Railway.
Out of scope: `app/` (legacy Next.js marketing site — deprecated per memory).

## UI Skills design stack

The installed UI Skills are part of this pipeline, but project rules always win. If an external design skill suggests color accents, gradients, GSAP-heavy marketing motion, decorative card icons, Radix UI, or hero/landing-page patterns, translate the useful intent into trackmyprop's minimalist monochrome desktop language.

| Moment | Skills to load | Purpose |
| --- | --- | --- |
| Product/interface planning | `interface-design`, `ui-ux-pro-max` | Information architecture, dashboard/tool patterns, anti-template checks, UX flow choices. |
| Visual direction | `frontend-design`, `bencium-innovative-ux-designer` | Use when the user says "you design it" or the feature needs a new visual signature. Keep the result monochrome and operational, not marketing-like. |
| Deep craft mode | `impeccable` | Use only when the user explicitly asks to shape, redesign, or heavily polish an interface. Complete its preflight before edits; do not bypass this skill's CONFIRM gate. |
| Interaction behavior | `interaction-design` | Feedback, loading states, skeletons, hover/focus states, transitions, gesture-like flows, and continuity between UI states. Use `motion/react` and monochrome tokens instead of the skill's generic examples. |
| Build polish | `emil-design-eng`, `make-interfaces-feel-better`, `baseline-ui` | Typography, spacing, surface hierarchy, motion feel, hover states, optical alignment, and anti-slop checks. |
| Accessibility | `fixing-accessibility`, `wcag-audit-patterns` | Forms, dialogs, menus, tables, keyboard flow, focus management, names, errors, and WCAG risk checks. |
| Motion performance | `fixing-motion-performance` | Any Motion/CSS animation, reveal, transition, measurement, scroll-linked behavior, blur, or transform work. |
| React quality | `no-use-effect`, `react-doctor` | Avoid effect choreography and scan changed React code for regressions before commit. |
| Build tooling | `vite` (`skill:vite`) | Use when feature work touches `apps/desktop` Vite config, aliases, env variables, assets, HMR behavior, plugins, build output, or renderer bundling. |
| Avoid by default | `gpt-taste` | This is mostly for high-motion marketing/GSAP work. Do not import GSAP or Awwwards-style page structure into the desktop app unless the user explicitly asks and the project rules still fit. |

## Pipeline (9 phases)

```
LOAD CONTEXT → GRILL → PLAN → CONFIRM → BUILD → AUDIT → VERIFY → GLOSSARY → REPORT+COMMIT
```

Proceed in order. Do not skip phases. Each phase has entry criteria and outputs below.

---

### Phase 0: LOAD CONTEXT (mandatory, always first)

**Read `apps/desktop/GLOSSARY.md` in full** before anything else. This is the single best map of what already exists — components, sections, RPC methods, IPC channels, design tokens, data-model types, navigation groups.

The glossary exists specifically to keep the agent's output consistent across runs. Reading it prevents:
- Re-declaring tokens that already exist (`--color-positive`, chart sub-tokens, radius scale)
- Duplicating components already in `components/ui/` or the custom app components
- Inventing RPC channel names that conflict with existing `auth:*`, `trades:*`, etc.
- Using a section label or shortcut that's already taken
- Drifting on data-model field names

If a concept you're about to add is already in the glossary, **extend it, don't duplicate it**. Note conflicts to the user at CONFIRM.

Also read `apps/desktop/glossary.html` only if the markdown references a visual that clarifies a concept — otherwise the MD is the source of truth for content.

---

### Phase 1: GRILL (adaptive)

**Tool:** invoke the `grill-me` skill.

**Read the user's initial prompt first.** Extract as much as possible, then ask only what's missing. If the prompt answers all 7 questions, skip straight to PLAN.

**Checklist (ask one-at-a-time, with a recommended answer each time):**

1. **Type** — UI component, page/section, or cross-cutting feature?
2. **Placement** — which section (e.g. `sections/analytics.tsx`, new folder `sections/heatmap/`)?
3. **Backend?** — new API route / DB field / env var needed? (default: no)
4. **Data source** — existing endpoint, new endpoint, mock, or none yet?
5. **Design reference (mandatory)** — "match X page", a screenshot, a Figma link, or "you design it". Before asking, auto-grep for reusable components matching the feature (e.g. KPI cards, line charts, stat rows) in `apps/desktop/src/renderer/src/components/` and `sections/journaling-dashboard.tsx`, `sections/day-view/`. Show what you found; ask if any should be reused.
6. **One-line goal** — what should the user be able to *do* after this ships?
7. **Any other constraints** — keybinds, share page integration, print/export, accessibility focus?

Default to "handle empty, loading, and error states" without asking.

**Output:** filled-in answers to all 7 questions.

---

### Phase 2: PLAN (extended thinking)

**Use extended thinking (ultrathink)** to produce the plan. This is the one phase where deep reasoning earns its keep — design decisions compound.

Load context from:
- `interface-design` — primary product-app planning and anti-generic dashboard checks
- `ui-ux-pro-max` — style/pattern catalog and UX heuristics
- `baseline-ui` — Tailwind, typography, accessibility, and layout baseline checks
- `shadcn` MCP — component availability + demos
- `frontend-design` or `bencium-innovative-ux-designer` — only when the feature needs a fresh visual concept; constrain outputs to the monochrome desktop product
- `interaction-design` — user feedback, loading states, state transitions, hover/focus behavior, and continuity between UI states
- `emil-design-eng` and `make-interfaces-feel-better` — polish principles for the build phase
- `fixing-accessibility`, `wcag-audit-patterns`, and `fixing-motion-performance` — audit criteria for interactive and animated surfaces
- `vite` (`skill:vite`) — Vite config, asset, env, alias, HMR, plugin, and renderer bundling guidance when touched
- `no-use-effect` — React state/effect replacement patterns and the `useMountEffect` escape hatch
- Existing codebase — reuse pass results from Phase 1
- `AGENTS.md` first, then `CLAUDE.md` if needed — project rules, verification commands, safety

Produce:
- **File plan** — every path to create or modify, marked NEW / MOD / DEL
- **Component tree** — what renders what, at a glance
- **Data flow** — where data comes from, what transforms apply, how state is held
- **Design skill route** — which UI Skills are relevant, which are intentionally skipped, and why
- **Verification plan** — exact commands that will run in VERIFY (typecheck, lint, targeted tests if any)
- **Rules application map** — for each rule below (typography, brand case, card icons, sizes, max-width, charts, React effects), state how it applies to this feature

**Output:** structured plan, held in memory for the CONFIRM phase.

---

### Phase 3: CONFIRM

Present the plan in **compact format**:

```
Plan: <one-line summary>
  NEW  path/to/new-file-a.tsx
  NEW  path/to/new-file-b.ts
  MOD  path/to/existing.tsx (+import, +mount)
  MOD  apps/desktop/GLOSSARY.md (+<category> entry)
Charts: <library + specific pieces, e.g. "Bklit area-chart via shadcn add">
Data: <source, new endpoints if any>
States: empty • loading • error  — all handled
Rules applied: lowercase brand • no caps titles • no card icons • max-w • unified sizes • tabular-nums • no useEffect
UI Skills: <interface-design + interaction-design + baseline-ui + accessibility/motion/polish skills used; include skill:vite if touched>
Proceed? [y/n]
```

Wait for the user.
- `y` (or yes, go, ship, etc.) → continue to BUILD
- anything else → exit cleanly. No files written, no plan saved, no apology text.

---

### Phase 4: BUILD

Execute the file plan. While writing code:

**Always use:**
- `shadcn` MCP to pull any shadcn components not already present (`npx shadcn@latest add <component>`)
- `shadcn add https://ui.bklit.com/r/{chart}.json` for any chart. Chart types: line, area, bar, candlestick, funnel, ring, pie, radar, sankey, choropleth. **Never** hand-roll Recharts, Tremor, or Visx.
- `interface-design` decisions from PLAN for product structure and information hierarchy
- `frontend-design` / `bencium-innovative-ux-designer` patterns only when PLAN selected them for a distinctive direction; filter out color-heavy, decorative, or marketing defaults
- `baseline-ui` constraints while writing Tailwind and component markup
- `interaction-design` for loading states, skeletons, hover/focus feedback, press feedback, empty/error state transitions, continuity between panels/sheets/dialogs, and interaction timing. Keep motion purposeful; use `motion/react`, transform, and opacity.
- `no-use-effect` before writing any React component or hook: derive state inline, use data-fetching libraries for async data, keep user actions in event handlers, use `useMountEffect` only for one-time external sync, and reset component state with `key` remounts.
- `emil-design-eng` and `make-interfaces-feel-better` for the polish pass (stagger, shadows, border radius, optical alignment, tabular-nums, font-smoothing, hover states, enter/exit animations)
- `fixing-accessibility` rules for any controls, forms, menus, dialogs, keyboard shortcuts, focus states, or icon-only buttons
- `fixing-motion-performance` rules for any animation or transition beyond simple color/opacity/transform hover states
- `vite` (`skill:vite`) when changing `vite.config.ts`, renderer aliases/import patterns, `import.meta.env`, static assets, HMR behavior, plugins, or production build behavior
- Existing components from the reuse-pass results — extend, don't duplicate

**Rule: do not ask the user for capabilities the skill already has.** Vercel env vars, Railway deploy logs, API access, MCP servers, the codebase itself — all directly accessible. Use them. Do not say "please tell me your API base URL" — read `lib/api.ts` or the relevant config.

---

### Phase 5: AUDIT

Invoke the design audit stack on the files written in Phase 4. This catches issues before typecheck so fixes can be unified:

- `web-design-guidelines` for project-level UI guideline compliance
- `baseline-ui` for Tailwind/layout/typography/accessibility baseline violations
- `fixing-accessibility` for any touched interaction surface; add `wcag-audit-patterns` for substantial forms, tables, dialogs, or flows with meaningful accessibility risk
- `fixing-motion-performance` for any touched animation, transition, or Motion code
- `interaction-design` for feedback quality, loading/empty/error state transitions, hover/focus affordances, continuity, and timing
- `make-interfaces-feel-better` for a final polish pass on spacing, surface hierarchy, hit areas, and micro-interactions
- `vite` (`skill:vite`) for any touched Vite config, env, alias, asset, plugin, or renderer build behavior

Fix any findings that are high-confidence and within scope. Low-confidence findings: note in the final report, do not silently ignore or silently fix.

---

### Phase 6: VERIFY

Run in order:

```bash
npx tsc --noEmit
npm run lint
npx -y react-doctor@latest . --verbose --diff
```

Then scan every touched React file for direct `useEffect` imports or calls:

```bash
rg -n "\buseEffect\b" <touched .ts/.tsx files>
```

Any hit is a VERIFY failure unless it is the dedicated `useMountEffect` wrapper implementation. Refactor with the `no-use-effect` skill before continuing.

**Failure recovery — up to 3 auto-fix iterations:**

1. First fail → read the errors, fix them, rerun.
2. Second fail → re-plan the failing section, fix, rerun.
3. Third fail → stop, report the remaining error verbatim to the user. Do not proceed to GLOSSARY or COMMIT.

Track every iteration. The final REPORT must list: "auto-fixed N errors during VERIFY" with a one-line summary of each fix.

If a verification script cannot run (e.g. dev server was needed or `react-doctor` is unavailable), do not start a dev server — per user preference. Say so in the report.

---

### Phase 7: GLOSSARY

Update **both** files:
- `apps/desktop/GLOSSARY.md`
- `apps/desktop/glossary.html`

Trigger conditions (from CLAUDE.md Glossary Maintenance section — update if ANY apply):
- New or removed UI components in `apps/desktop/src/renderer/src/components/ui/`
- New shadcn / third-party registry installs (including new Bklit charts)
- New sections, shortcuts, or navigation groups
- New or changed design tokens, CSS variables, or radius/color values
- New data model types or fields in `apps/desktop/src/renderer/src/lib/types.ts`
- New architecture concepts (RPC methods, IPC channels, daemon changes)
- New platform-specific constants or utilities

Keep the HTML and MD in sync — same entries, same structure, same order.

---

### Phase 8: REPORT + AUTO-COMMIT

**Report format:**

```
✓ Feature: <one-line summary>
Files: N new, M modified
Auto-fixes during VERIFY: K (<one-liner per fix>)
Audit findings deferred: <list, or "none">
Backend changes: <list, or "none">
Glossary: updated (<categories touched, or "no triggers hit">)
```

**Auto-commit:** after a successful run, stage the exact files touched (never `git add -A` or `git add .`) and create a commit with a concise conventional-commit message. Do **not** push. Do **not** use `--no-verify`.

```bash
git add <explicit paths>
git commit -m "$(cat <<'EOF'
feat(<scope>): <one-line summary>

<optional body — what + why in 1–2 sentences>
EOF
)"
```

If pre-commit hooks fail, fix the issue and create a **new** commit (never `--amend`).

---

## Rules (non-negotiable, no need to ask)

### Brand & typography
- **Brand name is always lowercase `trackmyprop`.** Never `TrackMyProp`, never `Track My Prop`, never `TRACKMYPROP`. This includes logo text, document titles, menu labels, and README-style copy.
- **Titles use normal typography — no ALL CAPS.** Section headers, card titles, button labels all follow sentence case or title case, never uppercase.
- Use `tabular-nums` for every dynamic number (P&L, percentages, counts, dates with digits).
- Use SF Pro as the primary font in the desktop renderer. Keep UI `antialiased`. For web-facing features, self-host the variable font (e.g. `InterVariable.woff2` via `next/font/local`) and preload it in `<head>` with `<link rel="preload" as="font" type="font/woff2" crossorigin>` — Google-served Inter doesn't expose the `opsz` axis and adds an extra TLS hop on first paint. The size-adjust / ascent-override fallback that `next/font` generates eliminates the swap-shift.
- **`text-wrap: balance` on every heading**, **`text-wrap: pretty` on every body paragraph.** Headings shouldn't orphan a single word; paragraphs shouldn't widow the last line. Set these once in `globals.css` for `h1, h2, h3, h4` and `p`, not per-component.
- **Underline offset on prose links: `text-underline-offset: 3px`** (not the Tailwind default 4px). Pair with `text-decoration-color: var(--color-border)` that transitions to `var(--color-foreground)` on hover. 4px reads as "line beneath this text"; 3px reads as "this text is a link."
- **Real italics, not slanted sans.** When a feature ships italic body text (`<em>` in prose, blockquote attribution, the word *actually* mid-sentence), pair a true serif italic (e.g. LibreBaskerville Italic 400, also via `next/font/local`) with the sans body. Slanted Inter italic does not carry character. Web only — the desktop renderer keeps SF Pro and can use the OS italic for short inline emphasis without the extra payload.

### Layout & sizing
- **Maximize width.** No stray side bars (white or black) on full-screen pages. Use the existing `max-w-*` convention in the codebase — check `apps/desktop/src/renderer/src/sections/*.tsx` for the current token (typically containers span full width with internal padding).
- **Unified component sizes.** When placing an input next to a toggle, a select next to a button, or any adjacent controls — heights, paddings, and corner radii must match. Use shadcn `size` props, do not hard-code `h-*` / `w-*` / `size-*`.
- **Dialog form controls must be height-audited.** In multi-field dialogs, every top-level form control in the same visual group must share the same height. If the dialog pattern uses `h-10` for `SelectTrigger`, `InputGroup`, date triggers, or custom comboboxes, do not leave plain `<Input>` at the shadcn default `h-8`; set the matching size explicitly and scan the whole dialog for other mismatches before finishing.
- Semantic radius classes only. No `rounded-full` on interactive elements.

### Cards
- **No decorative icons in cards.** No Lucide icons acting as labels, section markers, or filler. Text-only is the minimalist default.
- **Exception — data-driven brand logos are OK.** Firm logos in a challenge-row card are data, not decoration. Use `lib/firm-icons.ts` (`getFirmIcon`) for firm imagery. User avatars are data. Icon buttons with an aria-label on the trailing edge of a card are OK (they're a control, not a label).
- Always use the shadcn `Card` / `CardHeader` / `CardTitle` / `CardContent` primitives. Never a raw `<div class="rounded-lg border">`.

### Colors & tokens
- Use only shadcn semantic tokens: `bg-background`, `bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, etc.
- Do not add new project-specific `var(--*)` tokens for feature work. Existing shadcn preset variables are fine.
- Fully monochrome UI. Do not introduce red, green, accent colors, gradients, or colored status fills. Losses, failures, breached states, and errors are quiet (`text-muted-foreground`); profits, funded states, and success are loud (`text-foreground font-semibold`). Firm logos keep brand colors as the only color exception.
- No inline `style={{}}` for colors. No manual `dark:` overrides when semantic tokens already handle it.
- Form controls use `dark:bg-input/30`, not `dark:bg-input/15`. Before adding a form control, check its dark fill matches the existing shadcn preset.

### Depth & separation (non-negotiable, this keeps cards looking lifted)

Background/card separation comes from the token values themselves, not from workarounds painted at the callsite. Never paper over a missing depth with `bg-muted/60` on a Card root — if cards look flat, the fix is at the token level.

**Page vs card contrast (already configured in `globals.css` — do not regress):**
- Light mode: `--background: oklch(0.97 0 0)` (light gray page) against `--card: oklch(1 0 0)` (pure white cards).
- Dark mode: `--background: oklch(0.115 0 0)` (darker page) against `--card: oklch(0.205 0 0)` (lighter cards).
- If a design review says "cards don't pop" or "no separation", the fix is **not** to paint `bg-muted/60` on Card — that's a code smell. It reintroduces the original problem. Adjust tokens instead, or audit the surface hierarchy below.

**Surface hierarchy — what sits on what:**
- **Page shell (`bg-background`)** — `SidebarInset` only. No individual components should paint this.
- **Card (`bg-card`, via the shadcn `Card` primitive)** — every standalone hero / section / pinned / list container. Cards live on the page bg and must pop via their `bg-card` + the primitive's built-in `ring-1 ring-foreground/10`. Never pass `bg-muted/*` on a Card root.
- **Chip inside a card (`bg-muted/50`)** — mini-stats inside a Card (RoiCard's StatTile, KPI chips in dialogs). Inner chips are demoted against the card surface, not lifted further. The outer Card is already the "lifted" thing; nesting a second `bg-card` inside produces a monochrome box.
- **Chip inside a Dialog** — DialogContent is itself card-coloured (`bg-popover`/`bg-card`). Inner KPI tiles **must** render as `bg-muted/50` chips (plain div, not nested Card) — a nested `<Card>` collides with the dialog surface and the tile becomes invisible. See `OverviewSummaryDialog.KpiTile` for the reference pattern.

**Interactive surface fills (buttons, checkboxes, inputs, selects sitting on cards / page):**
- Outline `Button` variant: use the existing component variant. Do not repaint it with `bg-background`; on light mode the page bg is gray and an outline button should read as a lifted surface.
- `Checkbox` primitive: use the existing component primitive and keep its dark fill aligned with `dark:bg-input/30`.
- `SelectTrigger`, `InputGroup`, date-picker triggers, and bespoke form-control triggers: prefer `bg-card` when sitting on the page and `bg-muted/50` when sitting inside a card; dark mode fill stays `dark:bg-input/30`, never `dark:bg-input/15`.

**Hover states must not collapse toward the page bg:**
- `hover:bg-muted/50` on a card-like element will roughly match the page bg (muted ≈ background on the light palette), so hovering makes the card merge with the page — the opposite of the intended affordance.
- Prefer: `hover:bg-foreground/[0.03]` (a foreground-tinted overlay — darkens in light mode, lightens in dark mode, never matches the page) paired with a slightly darker border like `hover:border-foreground/20`. Works cleanly in both themes and never collapses toward the page.
- For card-content rows (table rows on `bg-card`), `hover:bg-muted/60` is fine — the row sits inside a Card so the muted overlay reads as a row tint, not a page-merge.

**Ring / border for card definition:**
- The `Card` primitive already carries `ring-1 ring-foreground/10`. Don't duplicate it on the Card root. Don't remove it either.
- A raw-div "card-like" container (only permitted when truly not a card — rare) uses `ring-1 ring-foreground/10` to mimic the primitive's definition.

**Status chips — monochrome hierarchy:**
- Badges and status chips use typography, opacity, and border/surface hierarchy instead of color. Quiet states use `text-muted-foreground`; positive or active states use `text-foreground font-medium` or `font-semibold`. Do not add red/green/amber tint fills for status.

**Hover affordance — shadow swap, not transform:**
- A card's hover affordance should be a deeper shadow, not a `translateY(-1px)` lift or `scale(1.02)`. Transforms create motion (good for sparingly-used emphasis); shadow swaps create depth, which is the natural metaphor for "this is interactive, about to be picked up." When every card in a grid lifts on hover, the page feels jittery; when shadows deepen, the page feels solid.
- Pair two shadow tokens at the global level — a resting `--shadow-custom: 0 0 0 1px <ring-α/0.06>, 0 1px 2px -1px <hairline-α/0.06>, 0 2px 4px 0 <bleed-α/0.04>` and a hover `--shadow-custom-hover` with the same shape but ~1.5× the alphas. Apply on the card with `shadow-[var(--shadow-custom)] transition-shadow duration-200 ease-out hover:shadow-[var(--shadow-custom-hover)]`. Transitioning *only* `box-shadow` is intentional — no `transition-all`.
- Reserve transforms for **press feedback** (`active:scale-[0.97]`) and **intentional 3D moments** (drag, drop, sortable). Do not blend transforms with hover lift.
- Hairline-on-page rule: a `Card` already carries `ring-1 ring-foreground/10` from the primitive; do not stack the custom shadow on top of it. For raw-div surfaces (rare), the custom shadow replaces the ring — its first layer (`0 0 0 1px`) IS the ring.

**When cards inside cards is appropriate vs not:**
- ✅ OK: `Card` wrapping the feature, with a `CardFooter` containing a button that routes elsewhere. The footer is the card's own structure.
- ❌ NOT OK: `Card` → `<Card size="sm">` as an inner stat tile. That's what broke `OverviewSummaryDialog` — an inner Card's `bg-card` matches the outer dialog's bg-popover and the tile disappears. Use a plain `bg-muted/50` chip div instead.
- ✅ OK: `Dialog` → inline `bg-muted/50` chip tiles. Dialog IS the card surface; chips are demoted.

### Charts — Bklit only
- All charts come from `https://ui.bklit.com/r/{chart}.json` via `npx shadcn@latest add <url>`. Available: line, area, bar, candlestick, funnel, ring, pie, radar, sankey, choropleth.
- Never hand-roll Recharts, Tremor, Visx, Nivo, or ECharts. Never add new chart deps.
- Keep chart styling monochrome unless rendering firm logos or an already-approved brand asset.
- If a feature needs a chart type Bklit doesn't offer, stop and flag it to the user at the CONFIRM gate.

### UI framework
- **shadcn/ui + Base UI only.** Radix UI is prohibited.
- **Base UI uses `onClick` not `onSelect`** for `DropdownMenuItem` (per memory).
- Before changing internals of `components/ui/*.tsx`, check current shadcn source with `npx shadcn@latest view <component>` and stay aligned unless there's a deliberate documented reason to diverge.
- Never conditionally render animated roots (`Sheet`, `Dialog`, `AlertDialog`, `Popover`, `Tooltip`). Render the root and control visibility via `open`.
- `stopPropagation` only on the nested control, never on wrapper cells or large containers.

### React state & effects
- Invoke the `no-use-effect` skill for every React feature in this pipeline. The desktop renderer is React, so the rule is global here.
- Never import or call `useEffect` directly in feature code. Prefer inline derived values, `useQuery` / TanStack Query for fetching, event handlers for user actions, and `key` remounts for prop-driven resets.
- Use `useMountEffect` only for one-time external synchronization with the DOM, browser APIs, third-party widgets, subscriptions, or stable singleton services. Do not use it as a shortcut for derived state or fetch logic.
- During PLAN, state how data and local state avoid effect choreography. During BUILD, if an existing `useEffect` blocks the feature, identify its purpose first and apply the matching replacement pattern within the owned file scope.

### Dialogs (hard rules rooted in Apple HIG + WAI-ARIA + NN/g)

**Decide the primitive first:**
- **Destructive confirmation, single decision, interrupts the user** (delete, discard, sign out) → `ConfirmDialog` from `components/ui/confirm-dialog.tsx`. This is the **default choice** — do not rebuild it with raw `AlertDialog`.
- **Form, editor, or multi-field flow** (create challenge, rename portfolio, add entry) → `Dialog` + `DialogFooter` + `DialogCancel` + `DialogAction` from `components/ui/dialog.tsx`.
- **Critical warning with no action to take** (rare) → raw `AlertDialog` with no Action, only a Close.
- **List picker / tool palette** (pick an account, pick a firm) → `Dialog` with list items as the actions, no footer, no Cancel/Action buttons. The list rows ARE the actions.
- **Prefer inline undo** over a confirmation dialog when the action is routine and undoable. NN/g: "if you cry wolf too many times, people will stop paying attention." Reserve confirmation for genuinely destructive, irreversible actions.

**Copy rules (non-negotiable):**
- **Title = specific question or statement naming the exact object.** `Delete "USD-FTMO-100k"?` not `Are you sure?` or `Delete account`. Include the item's name via template string.
- **Sentence case.** Short — ≤ 6 words when possible. Never ALL CAPS, never exclamation marks.
- **Description = concrete consequence, one or two short sentences.** "Your unsaved edits will be lost." "142 linked trades will be archived." Do NOT write "This action cannot be undone" unless it literally cannot be — and even then, prefer stating the specific irreversibility ("This cannot be restored").
- **Button label = action verb, mirroring the trigger.** `Delete`, `Discard`, `Sign out`, `Save changes` — never `OK`, `Yes`, `Submit`, `Confirm`. The single accepted generic is `Cancel` on the dismiss button (universal meaning).

**Focus & keyboard (handled by the primitives, don't fight them):**
- For **destructive** confirms, Cancel is the default button (Enter = safe cancel). Apple HIG verbatim. `ConfirmDialog destructive={true}` sets this automatically by passing `autoFocus` to Cancel.
- For **non-destructive** confirms (save, create, continue), the Action button is auto-focused (Enter = confirm). `ConfirmDialog destructive={false}` (or omitted) sets this automatically.
- Esc closes the dialog. Always. Do not intercept. The `esc` Kbd in the Cancel button advertises this.
- Tab trap is enforced by Base UI. Do not add manual focus handling.

**Visual rules:**
- **No decorative icon in the dialog header.** No `Trash2` next to "Delete" — the destructive button color is the signal. Apple-style modern alerts have no warning glyphs.
- **Destructive Action uses `variant="destructive"`.** Never `className="bg-destructive text-destructive-foreground"`; use the variant. Button has a `destructive` variant shipped.
- **Max width `sm:max-w-md` (448px).** If content won't fit, switch from alert/confirm to a `Dialog` or `Sheet` — the flow is wrong for an alert.
- **Kbd inside buttons must use the theme-adaptive classes.** The built-in `*Action` / `*Cancel` primitives apply these:
  - Action button: `bg-current/20 text-current ring-current/25 h-5 min-w-5 [&_svg:not([class*='size-'])]:size-3.5`
  - Cancel button: `bg-foreground/10 text-foreground ring-foreground/20 h-5 min-w-5`
  - Never the default `<Kbd>` class directly — it washes out against solid button backgrounds.

**Async / loading:**
- When the confirm is async, pass `loading={mutation.isPending}` to `ConfirmDialog`. The Action shows a `Loader2` spinner (kbd auto-hides), both buttons disable, and `onOpenChange` is blocked until the mutation resolves.
- The parent closes the dialog from the mutation's `onSuccess`, not optimistically. On error, keep the dialog open and surface the error (toast or inline).

**Never:**
- `<Button>Cancel</Button>` + `<Button type="submit">Save</Button>` raw inside a dialog footer — use `DialogCancel` + `DialogAction`.
- A delete confirm written as `<AlertDialog>` boilerplate when `ConfirmDialog` would do the job in 8 lines.
- A backdrop-dismissable destructive alert — `AlertDialog` disables click-outside by design; do not override.
- A title phrased as "Are you sure?" or "Confirm action" — always restate the specific object.
- An `OK` / `Yes` button label — always an action verb.

**Shortcuts:**
- Compound shortcuts (e.g. `⌘⏎` for "always allow"): pass a custom `kbd` node using `KbdGroup` + `Kbd` + `CornerDownLeftIcon`.
- `hideKbd` only on list-picker rows where no single action is the default.

### Performance & behavior
- **Prioritize performance first, look-and-feel second.** If two implementations both look right, pick the one that renders fewer nodes and mounts faster. No perf budget — aim for the best achievable. Aim to keep a feature's added DOM under ~150 visible nodes; lean DOMs feel faster than any animation can compensate for.
- **Page reveal vs component state — different problems, different solutions.** A *page reveal* is what happens when the route mounts; a *component state change* is a dialog opening, a popover appearing, a dropdown unfolding. These need opposite treatments:
  - **Page reveal: the page is just there.** No staggered fade-up cascade across hero/sections/cards. No page-wide blur enter. The user clicked something, the destination is here — instantly. Page-level motion competes with the content and adds a perceived loading window that wasn't there before. Reference sites (jakub.kr, oliur.com, paco.me) all skip this — the landing has zero entrance animation and feels faster for it.
  - **Component state: motion communicates "this just arrived."** Dialog/popover/dropdown opens deserve a 150–220ms slide-and-fade because the new element appearing without warning is jarring. This is where `tw-animate-css` primitives (`animate-in fade-in-0 slide-in-from-bottom-2 data-[state=open]:...`) earn their keep — they compose onto a single shared `@keyframes enter` / `@keyframes exit` pair via `--tw-enter-*` CSS variables. GPU-friendly, no JS runtime, no per-component keyframe definitions.
- **Easing tokens, not ad-hoc curves.** Use `--ease-out: cubic-bezier(0, 0, .2, 1)` and `--ease-in-out: cubic-bezier(.4, 0, .2, 1)` (Tailwind v4 defaults). Do not sprinkle one-off `cubic-bezier(0.16, 1, 0.3, 1)` / `cubic-bezier(0.23, 1, 0.32, 1)` etc. unless the feature genuinely needs a signature curve — and if so, document the override inline. Consistent easing reads as "considered"; mixed easing reads as "AI-generated."
- **No `filter: blur(...)` in enter animations.** Blur is paint-heavy (not composited cheaply) and creates a window mid-animation where the element looks broken to anyone with slower hardware. It is the single most common "this animation feels buggy" cause in AI-generated UIs. If a transition genuinely needs softness, use `opacity` + tiny `translateY` (≤12px) and let the eye do the rest.
- Transitions for interactions; keyframes only for one-shot staged sequences.
- Animate with `transform` and `opacity`. Avoid layout-affecting properties (`width`, `height`, `top`, `left`, `padding`, `margin`).
- `will-change` only on the actively-animating element, never broadly. `will-change: transform, opacity` for a hover-zoomed image is fine; `will-change: auto` everywhere else.

### Tool use
- Do not ask the user for things you can get yourself: Vercel env vars (`npx vercel env ls` after `npx vercel link --project trackmyprop --yes`), Railway logs, API base URL (`lib/api.ts`), existing types (`lib/types.ts`), auth flow (`lib/auth.ts` / `lib/auth-client.ts` / `backend/auth.py` / `middleware.ts`).
- Do not start dev servers unless the user explicitly asks (per user preference). Typecheck + lint is sufficient for a feature addition.

### Safety
- Never commit `.env*`, secrets, credentials, or downloaded references.
- Never `git add -A` / `git add .` — stage explicit paths.
- Never `git push` or `--no-verify` unless the user explicitly requests it.
- Never run destructive git commands (`reset --hard`, `checkout --`, `clean -f`) without explicit user request.
- Never skip hooks or bypass signing.

---

## Abort paths

- User says `n` at CONFIRM → exit, no files written, no summary saved.
- VERIFY fails 3× → stop before GLOSSARY, report errors, do not commit.
- AUDIT finds a structural issue (e.g. the plan itself violates a rule) → stop, report, let user re-plan.
- Required shadcn or Bklit component fails to install → stop, report, do not write placeholder.

## Reuse-pass grep hints

When running the reuse pass in Phase 1, check these as a starter set:

- KPI / stat cards: `apps/desktop/src/renderer/src/components/track-score-card.tsx`, `sections/journaling-dashboard.tsx`
- Chart wrappers: `apps/desktop/src/renderer/src/components/ui/chart.tsx`, `components/charts/*.tsx`
- Tables: `apps/desktop/src/renderer/src/sections/recent-trades-table.tsx`
- Sheets/dialogs: `apps/desktop/src/renderer/src/sections/challenges/challenge-detail-sheet.tsx`, `sections/journal/trade-detail-sheet.tsx`
- Day-level aggregation views: `apps/desktop/src/renderer/src/sections/day-view/`

Grep for the feature's noun before asking the user — a heatmap query should grep `heatmap`, `matrix`, `calendar`, `grid` first.
