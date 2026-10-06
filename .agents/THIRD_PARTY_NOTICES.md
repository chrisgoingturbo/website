# Third-party skill notices

`.agents/skills` holds copies of third-party agent skills, most of them synced
from the trackmyprop repo. `skills-lock.json` records the upstream source, ref,
path, and snapshot hash for each imported skill.

## Source mapping

| Upstream source | Bundled skills | License |
| --- | --- | --- |
| `antfu/skills` | `vite`, `vitest` | MIT |
| `jakubkrehel/skills` | `interface-review` and the `better-*` skills | MIT |
| `mattpocock/skills` | `grill-me` | MIT |
| `shadcn/ui`, `shadcn/improve` | `shadcn`, `improve` | MIT |
| `wshobson/agents` | `rust-async-patterns` | MIT |
| `Leonxlnx/taste-skill` | `design-taste-frontend` | see upstream |

The `motion` skill is Motion's own agent skill (motion.dev) and has no entry in
`skills-lock.json`. Skills not listed here predate this file; check their
upstream licenses before relying on redistribution rights.

## MIT notices

The following upstream copyright notices apply:

- Copyright (c) 2025-PRESENT Anthony Fu <https://github.com/antfu>
- Copyright (c) 2026 Jakub Krehel
- Copyright (c) 2026 Matt Pocock
- Copyright (c) 2023 shadcn
- Copyright (c) 2026 shadcn
- Copyright (c) 2024 Seth Hobson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
