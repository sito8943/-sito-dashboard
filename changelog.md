# Changelog

All notable changes to this project will be documented in this file.

## [0.0.67] - 2026-03-01

### Added

- New `Action` component: a single action button that renders as icon-only or icon + label (controlled by `showText`).
- New `Actions` component: renders a `<ul>` list of `Action` buttons from an array of action definitions.
- New `ActionsDropdown` component: an ellipsis (`⋮`) `IconButton` that opens a `Dropdown` containing an `Actions` list.
- New `Ellipsis` SVG icon used internally by `ActionsDropdown`.
- Added `sticky?: boolean` prop to `ActionType`: sticky actions are always visible next to the row; non-sticky actions are collected into the `ActionsDropdown`.

### Changed

- Refactored `Table` row actions: actions are now split into sticky (always visible `IconButton`s) and non-sticky (rendered inside `ActionsDropdown`).
- Updated `README.md` highlights and Exported API section to include `Action`, `Actions`, and `ActionsDropdown`.
- Updated `AGENTS.md` with new section 5 (Actions Components), `ActionType.sticky` documentation, and updated exports reference.

## [0.0.62] - 2026-02-19

### Added

- Added a proper `changelog.md` for release tracking.

### Changed

- Reworked `README.md` to provide consistent and accurate package usage examples.
- Fixed imports to use `@sito/dashboard` as the public entrypoint.
- Corrected `Table` action usage from array literal to callback form: `(row) => ActionType[]`.
- Updated development instructions with valid commands from `package.json`.
- Added explicit sections for project description, development setup, testing, and linting.
- Added extra onboarding sections (`Peer dependencies`, `Additional useful scripts`, and `Contributing`).
