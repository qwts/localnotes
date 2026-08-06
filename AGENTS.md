# AGENTS.md

Canonical, vendor-neutral agent context for this repository, per
[ENG-0006](https://github.com/qwts/playbook-engineering/blob/main/docs/decisions/ENG-0006-agentic-primitives-governance.md).
Vendor-specific files are thin adapters onto this file; shared and product
facts belong here once.

<!-- governed:shared-agent-discovery:start -->
## Shared agent conventions and skills

PR-first workflow, validation-before-push, commit and PR hygiene, and the
untrusted-input threat model are defined once, for every repo, in the
[org-wide agent conventions](https://github.com/qwts/playbook-engineering/blob/main/docs/reference/agent-conventions.md).
Before creating or copying a repo-local skill, consult the
[shared agent skills](https://github.com/qwts/playbook-engineering/blob/main/skills/README.md)
index. Reuse a shared skill when it fits; only a skill genuinely specific
to this repository belongs in its local context.
This repository is governed by
[playbook-engineering](https://github.com/qwts/playbook-engineering) — its
[shared SOPs](https://github.com/qwts/playbook-engineering/blob/main/docs/sop/README.md)
and [engineering decisions](https://github.com/qwts/playbook-engineering/blob/main/docs/decisions/README.md)
apply here by default
([ENG-0008](https://github.com/qwts/playbook-engineering/blob/main/docs/decisions/ENG-0008-shared-sop-inheritance.md):
inherit by default, vary by explicit delta).
<!-- governed:shared-agent-discovery:end -->

## What is specific to this repository

- **Product boundary:** Localnotes is a single-user, browser-only notes app.
  Note data stays in browser `localStorage`; do not add a backend, account,
  cloud-sync, or note-data network path. Scope and acceptance criteria live in
  [the MVP plan](docs/notes-mvp-plan.md).
- **Persistence boundary:** all note persistence goes through
  [`src/storage.ts`](src/storage.ts). Keep its defensive invalid-data fallback,
  and keep note ordering and selection state in
  [`useNotes`](src/hooks/useNotes.ts).
- **Interface:** the app is a Vite, React, and TypeScript SPA using custom
  components and CSS. Preserve keyboard access and confirmation before note
  deletion; current behavior is exercised under [`src/__tests__/`](src/__tests__/).
- **Validation:** run `npm run check:agent-context`, `npm run lint`, `npm test`,
  and `npm run build` before calling a change complete.

Run one Vitest file through the memory guard with
`npm run test:file -- <path>`. CI also runs the governed machine-memory-guard
conformance test. GitHub CodeQL default setup provides the repository's code
scanning until an approved migration replaces it with advanced setup.
