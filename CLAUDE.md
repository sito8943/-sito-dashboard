# CLAUDE.md

Guidance for AI agents working in this repository.

## Source Of Truth

- Treat `AGENTS.md` as the primary project guide.
- If there is any conflict, follow `AGENTS.md`.

## Required Workflow

- Run `npm run full` after every change.
- Do not mark work complete unless `npm run full` passes.

## Library Usage Invariants

- Wrap component usage with `TranslationProvider`.
- Wrap each table view with `TableOptionsProvider`.
- `CheckInput` is controlled by `checked`.
- `SelectInput` options use `{ id, value?, name? }`.
- `FileInput` `onChange` receives `ChangeEvent<HTMLInputElement>`.
