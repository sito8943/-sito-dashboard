# @sito/dashboard

`@sito/dashboard` is a React + TypeScript UI library focused on reusable dashboard components.

## Project Description

This package provides ready-to-use components for admin/dashboard use cases, with focus on data-heavy screens:

- `Table` with sorting, filtering, pagination, row selection, bulk actions, and expandable rows.
- Form inputs and utility components (`Badge`, `Chip`, `Tooltip`, `Loading`, icons).
- Built-in providers for translations and table state management.

## Installation

```bash
# npm
npm install @sito/dashboard

# yarn
yarn add @sito/dashboard
```

### Peer dependencies

Make sure your app provides compatible versions:

- `react` (`>=18.2 <20`)
- `@emotion/css` (`11.13.5`)

## Usage

Important:

- Import from `@sito/dashboard` (not from `@sito/dashboard/lib`).
- `Table` should be wrapped by `TranslationProvider` and `TableOptionsProvider`.
- `actions` is a callback per row: `(row) => ActionType[]`.

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

const actions = (row: UserRow) => [
  {
    id: "view",
    tooltip: `View ${row.name}`,
    icon: <span>View</span>,
    onClick: () => console.log("View", row),
  },
  {
    id: "delete",
    tooltip: "Delete selected",
    icon: <span>Delete</span>,
    multiple: true,
    onClick: () => console.log("Delete", row),
    onMultipleClick: (selectedRows: UserRow[]) =>
      console.log("Bulk delete", selectedRows.map(({ name }) => name)),
  },
];

const translations: Record<string, string> = {
  "_accessibility:components.table.selectedCount": "Selected {{count}} items",
  "_accessibility:labels.actions": "Actions",
  "_accessibility:buttons.filters": "Filters",
  "_accessibility:buttons.previous": "Previous page",
  "_accessibility:buttons.next": "Next page",
  "_accessibility:buttons.clear": "Clear",
  "_accessibility:buttons.applyFilters": "Apply filters",
  "_accessibility:components.table.pageSizes": "Rows per page",
  "_accessibility:components.table.jumpToPage": "Jump to page",
  "_accessibility:components.table.of": "of",
  "_accessibility:components.table.empty": "No data available",
  "_accessibility:components.table.selectRow": "Select row",
  "_accessibility:components.table.selectAllRows": "Select all visible rows",
};

const t = (key: string, options?: Record<string, unknown>) => {
  if (key === "_accessibility:components.table.selectedCount") {
    const count = typeof options?.count === "number" ? options.count : 0;
    return translations[key].replace("{{count}}", String(count));
  }

  return translations[key] ?? key;
};

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
          actions={actions}
          onRowSelect={(row, selected) => console.log(selected, row)}
          onSelectedRowsChange={(selectedRows) =>
            console.log("Selected rows", selectedRows)
          }
        />
      </TableOptionsProvider>
    </TranslationProvider>
  );
}
```

## Core Table Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `entity` | `string` | Yes | Entity name used by internal components. |
| `data` | `TRow[]` | Yes | Rows to render. `TRow` must extend `BaseDto` and include `id`. |
| `columns` | `ColumnType<TRow>[]` | No | Column definitions. |
| `actions` | `(row: TRow) => ActionType<TRow>[]` | No | Per-row action factory. |
| `title` | `string` | No | Header title. |
| `toolbar` | `ReactNode` | No | Custom header content. |
| `onSort` | `(prop: string, sortOrder: SortOrder) => void` | No | Sort callback. |
| `onRowSelect` | `(row: TRow, selected: boolean) => void` | No | Row selection callback. |
| `onSelectedRowsChange` | `(rows: TRow[]) => void` | No | Selected rows callback. |
| `onRowExpand` | `(expandedRow: TRow, collapsedRow: TRow \| null) => ReactNode` | No | Expand row content callback. |
| `allowMultipleExpandedRows` | `boolean` | No | Allows multiple expanded rows at once. |
| `expandedRowId` | `TRow["id"] \| null` | No | Controlled expansion mode. |

## Development Setup (Step-by-step)

1. Clone the repository.

```bash
git clone https://github.com/sito8943/-sito-dashboard.git
cd -- -sito-dashboard
```

2. Use the expected Node version.

```bash
nvm install 20.19.0
nvm use 20.19.0
```

3. Install dependencies.

```bash
npm install
```

4. Start local development.

```bash
# Vite dev server
npm run dev

# Component-focused development (recommended)
npm run storybook
```

5. Build the library.

```bash
npm run build
```

## How To Run Tests

```bash
# run all tests once
npm run test

# run a specific test file
npm run test -- src/components/Table/Table.expandable.test.tsx
```

## How To Run Linters

```bash
# runs ESLint with auto-fix enabled in this project
npm run lint
```

## Additional Useful Scripts

```bash
# format source files
npm run format

# build static Storybook
npm run build-storybook

# preview production build
npm run preview
```

## Contributing

1. Create a branch from `main`.
2. Add/adjust tests for your changes.
3. Run lint and tests.
4. Open a pull request with a clear summary.

## License

MIT
