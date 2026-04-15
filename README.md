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

Current `.nvmrc`: `20.19.0`

3. Install dependencies.

```bash
npm install
```

4. Start development.

```bash
# Vite dev server
npm run dev

# Storybook (recommended for component work)
npm run storybook
```

## Scripts

```bash
npm run build            # Build library (types + bundles)
npm run test             # Run tests once with Vitest
npm run lint             # ESLint + Prettier + depcheck
npm run format           # Prettier on src files
npm run build-storybook  # Build static Storybook
npm run preview          # Preview Vite build
npm run full             # lint + build + test
```

## Contributing

1. Create a branch from `main`.
2. Add or update tests for your changes.
3. Run `npm run full`.
4. Open a pull request with a clear summary.

## License

MIT
