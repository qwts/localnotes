# Agent context: localnotes

Canonical, vendor-neutral agent context for this repository, per
[ENG-0006](https://github.com/qwts/playbook-engineering/blob/main/docs/decisions/ENG-0006-agentic-primitives-governance.md).
Vendor files are thin adapters onto this file and do not restate it.

## Shared agent conventions and skills

PR-first workflow, validation-before-push, commit and PR hygiene, and the
untrusted-input threat model are defined once in the
[org-wide agent conventions](https://github.com/qwts/playbook-engineering/blob/main/docs/reference/agent-conventions.md).
Before creating or copying a repo-local skill, consult the
[shared agent skills](https://github.com/qwts/playbook-engineering/blob/main/skills/README.md)
index and reuse an existing skill when it fits. This repository inherits the
playbook's [shared SOPs](https://github.com/qwts/playbook-engineering/blob/main/docs/sop/README.md)
and [engineering decisions](https://github.com/qwts/playbook-engineering/blob/main/docs/decisions/README.md)
by default; record any variance explicitly.

## Product

`localnotes` is a single-user, local-first notes app built as a Vite, React,
and TypeScript SPA. Notes stay exclusively in browser `localStorage`: no
backend, accounts, cloud sync, or note-data network requests. The desktop-first
UI uses plain CSS and custom components rather than an external UI library.

The two-pane application contains a notes list and editor. Notes sort by
`updatedAt` descending and auto-save on change. All persistence goes through
the storage utility, which recovers from malformed stored JSON with an empty
collection. Note deletion requires confirmation, and create, open, edit, and
delete flows must remain keyboard-accessible.

## Commands and gates

```bash
npm run dev
npm run lint
npm test
npm run build
```

Run one Vitest file with `npm run test:file -- <path>`. Before pushing, run
lint, tests, and the production build. CI also runs the governed
machine-memory-guard conformance test and advanced CodeQL workflow.

## Current scope

Search, tags and folders, export/import, Markdown editing, authentication,
cloud sync, AI features, mobile layout, and attachments remain out of scope
unless an approved feature issue changes that boundary.
