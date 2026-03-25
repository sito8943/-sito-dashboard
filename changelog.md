# Changelog

All notable changes to this project will be documented in this file.

## [0.0.73] - 2026-03-25

### Added

- Added `TableOptionsProvider.initialState` to allow configuring initial `currentPage`, `pageSize`, `pageSizes`, `sortingBy`, `sortingOrder`, and `filters`.
- Added tests for `TableOptionsProvider` initial state overrides, value normalization, and reset behavior against configured defaults.

### Changed

- Updated consumer documentation with `TableOptionsProvider.initialState` usage and reset behavior tied to configured `initialState` defaults.

## [0.0.72] - 2026-03-25

### Fixed

- Fixed `TextInput` floating label behavior for `type="date"` to keep the label elevated and avoid overlap with the browser native date placeholder.
- Added regression test coverage for `TextInput` date inputs to ensure `keep-label-up` is applied by default.

## [0.0.71] - 2026-03-24

### Added

- Added `native?: boolean` prop to `SelectInput`:
  - `true` (default): keeps native `<select>` behavior.
  - `false`: enables custom options UI rendered from a `TextInput` + listbox.
- Added keyboard UX for non-native `SelectInput`:
  - `ArrowUp` / `ArrowDown` to move highlighted option.
  - `Enter` to open/select.
  - `Escape` to close.
- Added keyboard UX for `AutocompleteInput` suggestions:
  - `ArrowUp` / `ArrowDown` to navigate suggestions.
  - `Enter` to select highlighted suggestion.
  - `Escape` to close suggestions.
- Added visual highlighted state for active `SelectInput` option and `AutocompleteInput` suggestion.
- Added `SelectInput` Storybook story: `CustomOptions`.
- Added new form UX tests:
  - `SelectInput.test.tsx` (native default + keyboard navigation in non-native mode).
  - `AutocompleteInput.test.tsx` (keyboard selection with arrows + Enter).

### Changed

- Updated styling guidance in `AGENTS.md`: any Tailwind color `@apply` must be defined only in `src/styles/base-colors.css`.
- Centralized new color-related `@apply` rules for select/autocomplete option states in `src/styles/base-colors.css`.

## [0.0.70] - 2026-03-19

### Added

- New `ColumnVisibilityMenu` component: dropdown with checkboxes to hide/show table columns at runtime (uses `TableColumns` SVG icon).
- New `canHideColumns` prop on `Table`: controls whether the column visibility menu appears in the header toolbar.
- New `canReset` prop on `Table`: renders a reset button (uses `BarsStaggered` SVG icon) that restores filters, sort, and hidden columns to their default values.
- New `hideable` prop on `ColumnType`: columns with `hideable: false` are excluded from the visibility menu.
- New `defaultHiddenColumns` prop on `TableOptionsProvider`: sets initially hidden columns.
- New `hiddenColumns`, `toggleColumn`, `setHiddenColumns`, and `resetTableOptions` in `TableOptionsContext`.
- Exported `BarsStaggered` SVG icon.
- Form inputs now accept `ReactNode` as label.
- 3 new unit tests for `getSortedVisibleColumns` with `hiddenColumns` parameter.
- 10 new integration tests for column visibility toggle and reset button behavior.
- New Storybook stories: `WithColumnVisibility` and `WithColumnVisibilityAndFilters`.

### Changed

- `getSortedVisibleColumns` now accepts an optional `hiddenColumns` array as second parameter.
- `Columns` and `Rows` components consume `hiddenColumns` from `TableOptionsContext` to filter columns at runtime.

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
