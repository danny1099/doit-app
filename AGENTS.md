# AGENTS.md — Doit App

## Core Philosophy

- Respect existing architecture
- Follow screaming architecture
- Prefer Server Components
- Use centralized typed routes
- Strong typing everywhere
- Reuse shared abstractions
- Avoid unnecessary client-side logic
- Never bypass multi-tenant isolation

## Product Context

Read:

- /docs/product/product.md
- /docs/product/rules.md

---

## Architecture

Read:

- /docs/architecture/folder-structure.md
- /docs/architecture/module-boundaries.md
- /docs/architecture/enviroments-keys.md

---

## Decisions

Use:

- /docs/decisions/centralized-routes.md
- /docs/decisions/server-components.md

---

## Examples

Use:

- /docs/examples/module-example.md
- /docs/examples/trpc-router-example.md
- /docs/examples/trpc-router-global.md
- /docs/examples/server-component-example.md

---

## Patterns

Read:

- /docs/patterns/forms.md
- /docs/patterns/imports-and-naming.md
- /docs/patterns/server-components.md
- /docs/patterns/trpc.md

---

## UI

Read:

- /docs/ui/entity-grouping.md
- /docs/ui/forms-and-modals.md
- /docs/ui/states-and-responsiveness.md
- /docs/ui/system-desing.md

---

## Critical Rules

- Never use relative imports
- Never hardcode routes
- Always use i18n keys
- Always validate with Zod
- Never expose raw backend errors
- Prefer Server Components first
- Never mix entity responsibilities
- Never create duplicate abstractions

---

## Anti Patterns

❌ Business logic inside components
❌ Fetching unnecessarily in Client Components
❌ Forms larger than 3 fields inside modals
❌ Inline translations
❌ Duplicate schemas
❌ Using any in TypeScript

---

## Workflow

1. Read existing implementation
2. Analyze architecture impact
3. Reuse existing patterns
4. Implement with strong typing
5. Validate consistency with the project

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
