# @sito/dashboard

`@sito/dashboard` is a React + TypeScript UI library for dashboard and admin interfaces.

## Highlights

- `Table` component with sorting, filtering, pagination, row selection, bulk actions, and expandable rows.
- Reusable UI pieces: `Badge`, `Button`, `Chip`, `Dropdown`, `IconButton`, `Loading`, `Tooltip`, `SvgIcons`, `Actions`, and `ActionsDropdown`.
- Form controls: `TextInput`, `SelectInput`, `AutocompleteInput`, `CheckInput`, and `FileInput`.
- Built-in providers for translations and table state (`TranslationProvider`, `TableOptionsProvider`).

## Installation

```bash
# npm
npm install @sito/dashboard

# yarn
yarn add @sito/dashboard

# pnpm
pnpm add @sito/dashboard
```

### Peer dependency

- `@sito/ui` (`>=0.3.2 <0.4.0`)
- `react` (`>=18.2 <20`)
- `react-dom` (`>=18.2 <20`)

## Quick Usage

Import directly from `@sito/dashboard` (do not import from internal paths).

```tsx
import {
  FilterTypes,
  Table,
  TableOptionsProvider,
  TranslationProvider,
  type BaseDto,
} from "@sito/dashboard";

type UserRow = BaseDto & {
  name: string;
  age: number;
};

const rows: UserRow[] = [
  { id: 1, deletedAt: null, name: "John Doe", age: 30 },
  { id: 2, deletedAt: null, name: "Jane Smith", age: 25 },
];

const t = (key: string) => key;

export function UsersTable() {
  return (
    <TranslationProvider t={t} language="en">
      <TableOptionsProvider>
        <Table<UserRow>
          entity="users"
          title="Users"
          data={rows}
          columns={[
            {
              key: "name",
              label: "Name",
              sortable: true,
              filterOptions: {
                type: FilterTypes.text,
                placeholder: "Search by name",
              },
            },
            { key: "age", label: "Age", sortable: true },
          ]}
          actions={(row) => [
            {
              id: "view",
              tooltip: `View ${row.name}`,
              icon: <span>View</span>,
              onClick: () => console.log("View", row),
              sticky: true, // always visible; omit to place in the ellipsis dropdown
            },
          ]}
        />
      </TableOptionsProvider>
    </TranslationProvider>
  );
}
```

## Form Input Notes

- `SelectInput` expects `Option` items with an `id` (plus optional `value`/`name`).
- `AutocompleteInput` supports `autoSelectOnBlur` (`true` by default). In single-select mode, blur selects the matching option when the typed text exactly matches an option label, ignoring case and surrounding spaces.
- `AutocompleteInput` accepts an optional `createOption` configuration. It shows the consumer-rendered creation row only when the trimmed input has no exact option match, then passes that value to `createOption.onCreate` when selected with the mouse or keyboard.
- `CheckInput` is controlled with `checked` (not `value`).
- `FileInput` `onChange` receives the native input event; read files from `e.currentTarget.files`.
- `FileInput` supports `unstyled` (and alias `hiddenContainer`) to render only the native file input when you provide a custom upload UI.

```tsx
<FileInput
  id="profile-photo-file-input"
  unstyled
  inputClassName="hidden"
  accept="image/jpeg,image/png,image/webp"
  onChange={(e) => onUpload(e.currentTarget.files?.[0] ?? null)}
/>
```

## `TableOptionsProvider` Initial State

`TableOptionsProvider` supports optional `initialState` configuration:

```tsx
import { SortOrder, TableOptionsProvider } from "@sito/dashboard";

<TableOptionsProvider
  defaultHiddenColumns={["email"]}
  initialState={{
    currentPage: 0,
    pageSize: 50,
    pageSizes: [25, 50, 100],
    sortingBy: "createdAt",
    sortingOrder: SortOrder.ASC,
    filters: { status: "active" },
  }}
>
  <UsersTable />
</TableOptionsProvider>;
```

## Core `Table` Props

| Prop                        | Type                                                              | Required | Description                                                                 |
| --------------------------- | ----------------------------------------------------------------- | -------- | --------------------------------------------------------------------------- |
| `entity`                    | `string`                                                          | No       | Optional logical entity identifier.                                         |
| `data`                      | `TRow[]`                                                          | Yes      | Rows to render. `TRow` must extend `BaseDto` and include `id`.              |
| `columns`                   | `ColumnType<TRow>[]`                                              | No       | Column definitions.                                                         |
| `actions`                   | `(row: TRow) => ActionType<TRow>[]`                               | No       | Per-row action factory.                                                     |
| `title`                     | `string`                                                          | No       | Header title.                                                               |
| `toolbar`                   | `ReactNode`                                                       | No       | Extra content rendered in the table header.                                 |
| `isLoading`                 | `boolean`                                                         | No       | Loading state for table UI.                                                 |
| `filterOptions`             | `FilterOptions`                                                   | No       | Extra options passed to filter behavior/components.                         |
| `canHideColumns`            | `boolean`                                                         | No       | Shows column visibility menu in the header.                                 |
| `canReset`                  | `boolean`                                                         | No       | Shows table reset button in the header.                                     |
| `onSort`                    | `(prop: string, sortOrder: SortOrder) => void`                    | No       | Sort callback when a sortable column is toggled.                            |
| `showSortPreviewOnHover`    | `boolean`                                                         | No       | Previews the next order while hovering an inactive sortable header.         |
| `onRowSelect`               | `(row: TRow, selected: boolean) => void`                          | No       | Row selection callback.                                                     |
| `onSelectedRowsChange`      | `(rows: TRow[]) => void`                                          | No       | Callback with selected rows.                                                |
| `softDeleteProperty`        | `keyof TRow`                                                      | No       | Property name used to determine soft-deleted rows. Defaults to `deletedAt`. |
| `allowMultipleExpandedRows` | `boolean`                                                         | No       | Enables multiple expanded rows (uncontrolled mode).                         |
| `expandedRowId`             | `TRow["id"] \| null`                                              | No       | Controlled expanded row id.                                                 |
| `onExpandedRowChange`       | `(expandedRow: TRow \| null, collapsedRow: TRow \| null) => void` | No       | Called when expanded row changes.                                           |
| `onRowExpand`               | `(expandedRow: TRow, collapsedRow: TRow \| null) => ReactNode`    | No       | Returns content rendered inside expanded row area.                          |
| `className`                 | `string`                                                          | No       | Wrapper class name.                                                         |
| `contentClassName`          | `string`                                                          | No       | Content container class name.                                               |

## Exported API

Main package exports include:

- Components: `Action`, `Actions`, `ActionsDropdown`, `Badge`, `Button`, `Chip`, `Dropdown`, `IconButton`, `Loading`, `SvgIcons`, `Table`, `Tooltip`, `TextInput`, `SelectInput`, `AutocompleteInput`, `CheckInput`, `FileInput`.
- Providers: `FiltersProvider`, `TableOptionsProvider`, `TranslationProvider` and related hooks/types (`useFilters`, `useTableOptions`, `useTranslation`).
- Utilities and models: `FilterTypes`, `SortOrder`, `BaseDto`, and query/filter helpers from `lib`.

## Development Setup

1. Clone the repository.

```bash
git clone https://github.com/sito8943/-sito-dashboard.git
cd -- -sito-dashboard
```

2. Use the expected Node version.

```bash
nvm install
nvm use
```

Current `.nvmrc`: `22.18.0`

3. Install dependencies.

```bash
pnpm install
```

4. Start development.

```bash
# Vite dev server
pnpm run dev

# Storybook (recommended for component work)
pnpm run storybook
```

## Scripts

```bash
pnpm run build            # Build library (types + bundles)
pnpm run test             # Run tests once with Vitest
pnpm run lint             # Type-aware Oxlint validation
pnpm run lint:fix         # Apply safe Oxlint fixes
pnpm run deps:check       # Find unused dependencies
pnpm run format           # Format the repository with Prettier
pnpm run format:check     # Check formatting without writing
pnpm run build-storybook  # Build static Storybook
pnpm run preview          # Preview Vite build
pnpm run full             # lint + build + test
```

## Contributing

1. Create a branch from `main`.
2. Add or update tests for your changes.
3. Run `pnpm run full`.
4. Open a pull request with a clear summary.

## License

MIT
