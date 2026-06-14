# Changelog

All notable changes to this project will be documented in this file.

## [0.0.85] - 2026-06-14

### Added

- Added `className`, `iconClassName`, and `labelClassName` to `ActionType` so consumers can style action buttons, icon wrappers, and visible labels more precisely.
- Added support for passing action-level button/icon classes through table row sticky actions and selection-bar multi actions.
- Added Storybook and test coverage for `Actions.showTooltips={false}` and for the new action-part class hooks.

### Changed

- Updated `Actions` so icon-only actions use the library `Tooltip` component by default instead of relying on tooltip-specific data attributes on `Action`.
- Updated consumer docs (`docs/usage-guide.md`, `docs/style-customization.md`, and `docs/translations-reference.md`) to document tooltip behavior and the new action styling hooks.

### Fixed

- Fixed tooltip rendering and positioning by moving `Tooltip` to a portal-based implementation that supports hover and focus triggers, closes on `Escape`, clamps horizontally to the viewport, and flips below the trigger when there is no room above.
- Fixed standalone and grouped action tooltip support so `Actions` shows accessible tooltips for icon-only actions by default, while still allowing an opt-out via `showTooltips={false}`.

## [0.0.84] - 2026-06-05

### Changed

- Tightened the `Table` and filter TypeScript surface so filter keys and column keys can be constrained with generics instead of falling back to broad `string` keys.
- Updated `TableFilters`, `useTableOptions`, `TableOptionsProvider`, `ColumnType`, filter widgets, active filter chips, and related table helpers to preserve typed filter and column keys across sorting, hidden columns, and filter state.
- Enabled type-aware ESLint rules for the TypeScript codebase and aligned table/filter components with the stricter checks.
- Reorganized consumer docs by splitting the previous `docs/usage-guide.md` into focused guides: `docs/getting-started.md`, `docs/table-guide.md`, and `docs/table-state.md`, while keeping `docs/usage-guide.md` as the lightweight entry point.

### Fixed

- Fixed multiple table/filter typing mismatches surfaced by `tsc` after the generic key changes, including `ActiveFilters`, `Rows`, `TableHeader`, filter widgets, and `TableOptionsProvider`.
- Fixed unsafe filter value formatting in active filter chips to avoid stringifying arbitrary objects as `"[object Object]"`.
- Fixed Storybook and lint integration issues introduced by type-aware ESLint, including `.storybook` project-service parsing and non-awaited `viteFinal` configuration.

## [0.0.83] - 2026-06-05

### Added

- Added `autoSelectOnBlur?: boolean` prop to `AutocompleteInput` (defaults to `true`) so single-select inputs automatically select an option on blur when the typed text exactly matches an available option label.
- Added `AutocompleteInput` Storybook scenarios `AutoSelectOnBlur` and `AutoSelectOnBlurDisabled` to document the default blur auto-selection behavior and the opt-out via `autoSelectOnBlur={false}`.
- Added regression test coverage for `AutocompleteInput` blur auto-selection behavior with both the default enabled state and the explicit disabled state.

### Changed

- Updated consumer documentation (`README.md`, `docs/usage-guide.md`, and `AGENTS.md`) to document `AutocompleteInput.autoSelectOnBlur` and its default behavior.

## [0.0.82] - 2026-04-18

### Added

- Added `stopPropagation?: boolean` prop to `Action` (defaults to `false`) that calls `event.stopPropagation()` on click, preventing the click event from bubbling to parent handlers.
- Added `Action` Storybook file (`Action.stories.tsx`) with scenarios `Basic`, `WithText`, `Disabled`, `WithoutTooltip`, `StopPropagation`, and `WithoutStopPropagation` to document the new prop.

### Changed

- Updated `Action` JSDoc and consumer `usage-guide.md` to document the new `stopPropagation` prop.

## [0.0.81] - 2026-04-18

### Added

- Added `closeOnClick?: boolean` prop to `Dropdown` (defaults to `true`) that auto-closes the dropdown when clicking inside it.
- Added `Dropdown` Storybook scenarios `CloseOnClick` and `KeepOpenOnClick` to document the new auto-close behavior and the opt-out via `closeOnClick={false}`.
- Added `Dropdown` test coverage for default auto-close, explicit `closeOnClick={true}`, and persistent `closeOnClick={false}` behavior on both inner children and the menu container.

### Changed

- Updated `AGENTS.md` §9 Dropdown props table to document the new `closeOnClick` prop.

## [0.0.80] - 2026-04-13

### Added

- Added `unstyled?: boolean` and `hiddenContainer?: boolean` (alias) to `FileInput` so consumers can render only the native `<input type="file" />` without the default dropzone container, label, and preview UI.
- Added `FileInput` test coverage for `unstyled` and `hiddenContainer` modes to ensure input-only rendering works as expected.

### Changed

- Updated the `FileInput` Storybook `AsProfilePhoto` scenario to use `unstyled` mode for hidden-input profile photo flows.
- Updated documentation to include `FileInput` input-only usage and the `hiddenContainer` alias.

## [0.0.79] - 2026-04-13

### Fixed

- Fixed `TextInput` floating label overlap for native input types with browser-provided UI/text (`datetime-local`, `time`, `month`, `week`, `range`, `color`, and `file`) by keeping the label elevated by default, in addition to `date`.
- Added regression test coverage for `TextInput` floating-label behavior across all supported native overlap-prone input types.

## [0.0.78] - 2026-04-13

### Added

- Added `AutocompleteInput` Storybook scenario `MultipleWithControllerRequired` to document required validation with `react-hook-form` `Controller` in `multiple` mode.
- Added regression tests for `AutocompleteInput` required behavior in `multiple` mode and `TextInput` label required indicator rendering with `aria-required`.

### Changed

- Updated `AutocompleteInput` to resolve required state from both `required` and `aria-required` props and to expose the resulting `aria-required` value on the underlying input.
- Updated `AutocompleteInput` native `required` handling in `multiple` mode so the input is required only while no options are selected.
- Updated `AutocompleteInput` test assertion style to use `required` attribute checks compatible with current testing environment validation APIs.

### Fixed

- Fixed `TextInput` required asterisk rendering to also reflect `aria-required`, not only native `required`.
- Fixed `TextInput` floating label overlap for native input types with browser-provided UI/text (`datetime-local`, `time`, `month`, `week`, `range`, `color`, and `file`) by keeping the label elevated by default, in addition to `date`.
- Added regression test coverage for `TextInput` floating-label behavior across all supported native overlap-prone input types.

## [0.0.77] - 2026-04-13

### Added

- Added `ARCHITECTURE_RULES.md` with mandatory component/hook file-structure rules for agent-driven refactors.
- Added `Dropdown` support files `constants.ts` and `utils.ts` to centralize viewport margins/offsets and positioning helpers.

### Changed

- Refactored `Dropdown` to use extracted `computeDropdownPosition(...)` utility logic instead of keeping positioning calculations inline.
- Updated `DropdownPropsType` to extend `HTMLProps<HTMLDivElement>`, enabling passthrough container attributes (including `className` and other native `div` props).
- Aligned version references to `0.0.77` across package metadata and docs (`AGENTS.md`, `docs/README.md`, and this changelog).

## [0.0.76] - 2026-04-10

### Changed

- Aligned version references across package metadata and documentation to `0.0.76` (`AGENTS.md`, `docs/README.md`, and this changelog).
- Added explicit context typings for provider hooks and provider values so `useTranslation`, `useFilters`, and `useTableOptions` expose clearer return types and value properties in TypeScript IntelliSense.

## [0.0.75] - 2026-04-08

### Added

- Added `classNames(...classNamesList)` utility in `lib` to compose dynamic class names while trimming whitespace, ignoring falsy values, and supporting nested arrays.
- Added unit tests for `classNames` covering whitespace normalization, falsy filtering, nested arrays, and empty input behavior.

### Changed

- Exported `classNames` from `src/lib/index.ts` so it is available through the library `lib` entrypoint.
- Updated components with dynamic `className` composition to use `classNames` (Table, Actions, Badge, Button, Chip, Form inputs, IconButton, Loading, Tooltip) for consistent class output without extra spaces.

## [0.0.74] - 2026-03-27

### Fixed

- Fixed `TextInput` floating label behavior so `keep-label-up` is no longer forced after first focus/blur when there is no value and no placeholder.
- Fixed `TextInput` focus/blur handling to preserve direct `onFocus`/`onBlur` passthrough without internal focus-state side effects.

### Changed

- Updated `TextInput` test coverage to assert that empty inputs without placeholder do not keep the floating label up after focus/blur.

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
