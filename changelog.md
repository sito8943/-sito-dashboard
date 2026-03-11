# Changelog

All notable changes to this project will be documented in this file.

## [0.0.69] - 2026-03-11

### Added

- Added consumer docs guides: `docs/usage-guide.md` and `docs/style-customization.md`.

### Changed

- Updated docs compatibility reference to `@sito/dashboard` `0.0.69`.
- Added translation keys reference document for consumer projects.
- `Dropdown` now unmounts its menu when `open` is `false` instead of keeping a hidden menu node.
- `ColumnType.renderHead` is now typed as `() => ReactNode` and is rendered in table headers.
- `TablePropsType.entity` is now optional.

### Fixed

- Prevented `vite-plugin-dts` from emitting declarations for `*.test.*` and `*.stories.*` files.
- Fixed table header filters UX by hiding the filters trigger when no filters are configured.
- Fixed active range filter rendering for falsy values (for example `0` and `0`).
- Fixed `TableOptionsProvider` filter parsing to drop empty values while preserving valid falsy values (`0`, `false`) and to reset/clamp pagination when filters, `pageSize`, or `total` change.
- Fixed filter widgets value normalization for preloaded object values in `SelectWidget` and `AutocompleteWidget`.
- Fixed row sticky action behavior to always receive the row entity and stop click propagation via `Action`.
- Fixed `Action` and selection-bar action button accessibility/semantics (`type="button"` and `aria-label` from tooltip).
- Fixed `FileInput` single-file mode (`multiple={false}`) so it replaces previous selection instead of accumulating files.
- Fixed `FileInput` exported types import path to avoid consumer type-resolution issues.

## [0.0.68] - 2026-03-08

### Added

- Expand/collapse visual indicator for table rows with `onRowExpand`: chevron down (`↓`) when collapsed and chevron up (`↑`) when expanded.
- New Storybook scenario `WithPagination` to exercise table pagination behavior with in-memory paged data.
- New Storybook scenario `WithCompleteFeatures` combining sticky actions, dropdown actions, pagination, single-row expansion, and filters.
- Regression test to ensure the row actions dropdown trigger does not expand/collapse expandable rows.

### Changed

- Updated `AGENTS.md` with expandable-row chevron behavior, actions dropdown propagation expectations, and Storybook scenario references.

### Fixed

- Fixed table UX bug where clicking the row actions dropdown trigger could expand/collapse the row.

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
