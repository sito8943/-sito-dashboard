import "./styles.css";
import "./components/styles.css";
import "./components/Widgets/styles.css";

import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "components";
import { ChevronRight, Close, Filters } from "components/SvgIcons";
import type { BaseDto } from "lib";
import { FilterTypes } from "lib";
import { TranslationProvider, useTableOptions } from "providers";
import { useEffect, useMemo, useState } from "react";
import { fn } from "storybook/test";

type Row = BaseDto & { name: string; age: number };

const mockTranslations: Record<string, string> = {
  "_accessibility:components.table.selectedCount": "Selected {{count}} items",
  "_accessibility:labels.actions": "Actions",
  "_accessibility:buttons.filters": "Filters",
  "_accessibility:buttons.previous": "Previous page",
  "_accessibility:buttons.next": "Next page",
  "_accessibility:buttons.clear": "Clear",
  "_accessibility:buttons.applyFilters": "Apply filters",
  "_accessibility:buttons.openActions": "Open actions",
  "_accessibility:components.table.pageSizes": "Rows per page",
  "_accessibility:components.table.jumpToPage": "Jump to page",
  "_accessibility:components.table.of": "of",
  "_accessibility:components.table.empty": "No data available",
  "_accessibility:components.table.filters.range.start": "Start value",
  "_accessibility:components.table.filters.range.end": "End value",
  "_accessibility:components.table.selectRow": "Select row",
  "_accessibility:components.table.selectAllRows": "Select all visible rows",
};

const mockT = (key: string, options?: Record<string, unknown>) => {
  const count = typeof options?.count === "number" ? options.count : 0;

  return mockTranslations[key]?.replace("{{count}}", String(count)) ?? key;
};

const meta: Meta<typeof Table<Row>> = {
  title: "Components/Table",
  component: Table as any,
  tags: ["autodocs"],
  args: {
    onSort: fn(),
    onRowSelect: fn(),
    onSelectedRowsChange: fn(),
    onExpandedRowChange: fn(),
  },
  decorators: [
    (Story) => (
      <TranslationProvider t={mockT} language="es">
        <Story />
      </TranslationProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Table<Row>>;

const data: Row[] = [
  { id: 1, deletedAt: null, name: "Alice", age: 28 },
  { id: 2, deletedAt: null, name: "Bob", age: 34 },
  { id: 3, deletedAt: null, name: "Carlos", age: 22 },
  { id: 4, deletedAt: null, name: "Diana", age: 31 },
  { id: 5, deletedAt: null, name: "Eduardo", age: 26 },
  { id: 6, deletedAt: null, name: "Fernanda", age: 29 },
  { id: 7, deletedAt: null, name: "Gabriel", age: 41 },
  { id: 8, deletedAt: null, name: "Helena", age: 24 },
  { id: 9, deletedAt: null, name: "Ismael", age: 37 },
  { id: 10, deletedAt: null, name: "Julia", age: 30 },
  { id: 11, deletedAt: null, name: "Kevin", age: 23 },
  { id: 12, deletedAt: null, name: "Laura", age: 35 },
  { id: 13, deletedAt: null, name: "Miguel", age: 27 },
  { id: 14, deletedAt: null, name: "Natalia", age: 33 },
  { id: 15, deletedAt: null, name: "Oscar", age: 45 },
];

const paginationData: Row[] = Array.from({ length: 95 }, (_, index) => ({
  id: index + 1,
  deletedAt: null,
  name: `User ${index + 1}`,
  age: 20 + (index % 30),
}));

export const Basic: Story = {
  args: {
    entity: "users",
    title: "Usuarios",
    onExpandedRowChange: null,
    data,
    columns: [
      { key: "id", label: "ID", sortable: true },
      {
        key: "name",
        label: "Nombre",
        sortable: true,
        filterOptions: { type: FilterTypes.text, placeholder: "Buscar nombre" },
      },
      {
        key: "age",
        label: "Edad",
        sortable: true,
        filterOptions: { type: FilterTypes.number, min: 0, max: 100 },
      },
    ],
  } as any,
};

export const WithAutocompleteFilter: Story = {
  args: {
    entity: "users",
    title: "Usuarios",
    onExpandedRowChange: null,
    data,
    columns: [
      { key: "id", label: "ID", sortable: true },
      {
        key: "name",
        label: "Nombre",
        sortable: true,
        filterOptions: {
          type: FilterTypes.autocomplete,
          placeholder: "Selecciona nombre",
          multiple: true,
          options: Array.from(new Set(data.map((d) => d.name))).map((n) => ({
            id: n,
            name: n,
          })),
        },
      },
      {
        key: "age",
        label: "Edad",
        sortable: true,
        filterOptions: { type: FilterTypes.number, min: 0, max: 100 },
      },
    ],
  } as any,
};

export const WithControlledFiltersDropdown: Story = {
  render: (args) => {
    const Example = () => {
      const [showFilters, setShowFilters] = useState(true);

      return (
        <Table<Row>
          {...(args as any)}
          onExpandedRowChange={null}
          toolbar={
            <button
              type="button"
              className="filter-dropdown-button normal filter-dropdown-trigger"
              aria-label="Toggle filters"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              <Filters className="filter-dropdown-trigger-icon" />
            </button>
          }
          filterOptions={{
            button: {
              hide: true,
            },
            dropdown: {
              opened: showFilters,
              setOpened: setShowFilters,
            },
          }}
        />
      );
    };

    return <Example />;
  },
  args: {
    entity: "users",
    title: "Usuarios con filtros controlados",
    data,
    columns: [
      { key: "id", label: "ID", sortable: true },
      {
        key: "name",
        label: "Nombre",
        sortable: true,
        filterOptions: { type: FilterTypes.text, placeholder: "Buscar nombre" },
      },
      {
        key: "age",
        label: "Edad",
        sortable: true,
        filterOptions: { type: FilterTypes.number, min: 0, max: 100 },
      },
    ],
  } as any,
};

const singleRowActions = (row: Row) => [
  {
    id: "view",
    tooltip: `View ${row.name}`,
    icon: <ChevronRight className="w-4 h-4" />,
    onClick: () => undefined,
    sticky: true,
  },
];

const multiRowActions = (row: Row) => [
  {
    id: "details",
    tooltip: `Details for ${row.name}`,
    icon: <ChevronRight className="w-4 h-4" />,
    onClick: () => undefined,
    sticky: true,
  },
  {
    id: "remove",
    tooltip: "Remove selected rows",
    icon: <Close className="w-4 h-4" />,
    onClick: () => undefined,
    multiple: true,
    onMultipleClick: () => undefined,
  },
];

const mixedRowActions = (row: Row) => [
  {
    id: "view",
    tooltip: `View ${row.name}`,
    icon: <ChevronRight className="w-4 h-4" />,
    onClick: () => undefined,
    sticky: true,
  },
  {
    id: "edit",
    tooltip: `Edit ${row.name}`,
    icon: <ChevronRight className="w-4 h-4" />,
    onClick: () => undefined,
    sticky: true,
  },
  {
    id: "remove",
    tooltip: "Remove",
    icon: <Close className="w-4 h-4" />,
    onClick: () => undefined,
  },
  {
    id: "archive",
    tooltip: "Archive",
    icon: <Close className="w-4 h-4" />,
    onClick: () => undefined,
  },
];

export const WithSimpleActions: Story = {
  args: {
    entity: "users",
    title: "Users with actions",
    onExpandedRowChange: null,
    data,
    columns: [
      { key: "name", label: "Name", sortable: true },
      { key: "age", label: "Age", sortable: true },
    ],
    actions: singleRowActions,
  } as any,
};

export const WithMultipleActions: Story = {
  args: {
    entity: "users",
    onExpandedRowChange: null,
    title: "Users with bulk actions",
    data,
    columns: [
      { key: "name", label: "Name", sortable: true },
      { key: "age", label: "Age", sortable: true },
    ],
    actions: multiRowActions,
  } as any,
};

export const WithStickyAndDropdownActions: Story = {
  args: {
    entity: "users",
    title: "Users — sticky + dropdown actions",
    onExpandedRowChange: null,
    data,
    columns: [
      { key: "name", label: "Name", sortable: true },
      { key: "age", label: "Age", sortable: true },
    ],
    actions: mixedRowActions,
  } as any,
};

export const WithExpandableRows: Story = {
  render: (args) => {
    const Example = () => {
      const [expandedRowId, setExpandedRowId] = useState<Row["id"] | null>(
        null,
      );

      return (
        <Table<Row>
          {...(args as any)}
          expandedRowId={expandedRowId}
          onExpandedRowChange={(expandedRow) =>
            setExpandedRowId(expandedRow?.id ?? null)
          }
          onRowExpand={(expandedRow, collapsedRow) => (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">
                  Expanded user: {expandedRow.name}
                </p>
                <p className="text-xs opacity-70">Age: {expandedRow.age}</p>
              </div>
              <p className="text-xs opacity-70">
                Collapsed: {collapsedRow?.name ?? "none"}
              </p>
            </div>
          )}
        />
      );
    };

    return <Example />;
  },
  args: {
    entity: "users",
    title: "Users with expandable rows",
    data,
    columns: [
      { key: "name", label: "Name", sortable: true },
      { key: "age", label: "Age", sortable: true },
    ],
  } as any,
};

export const WithMultipleExpandableRows: Story = {
  render: (args) => (
    <Table<Row>
      {...(args as any)}
      allowMultipleExpandedRows
      onRowExpand={(expandedRow, collapsedRow) => (
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold">Expanded user: {expandedRow.name}</p>
            <p className="text-xs opacity-70">Age: {expandedRow.age}</p>
          </div>
          <p className="text-xs opacity-70">
            Collapsed: {collapsedRow?.name ?? "none"}
          </p>
        </div>
      )}
    />
  ),
  args: {
    entity: "users",
    title: "Users with multiple expandable rows",
    data,
    columns: [
      { key: "name", label: "Name", sortable: true },
      { key: "age", label: "Age", sortable: true },
    ],
  } as any,
};

export const WithPagination: Story = {
  render: (args) => {
    const Example = () => {
      const { currentPage, pageSize, setTotal, setCurrentPage } =
        useTableOptions();

      useEffect(() => {
        setTotal(paginationData.length);
      }, [setTotal]);

      useEffect(() => {
        const totalPages = Math.max(
          1,
          Math.ceil(paginationData.length / pageSize),
        );
        if (currentPage >= totalPages) {
          setCurrentPage(totalPages - 1);
        }
      }, [currentPage, pageSize, setCurrentPage]);

      const paginatedRows = useMemo(() => {
        const start = currentPage * pageSize;
        return paginationData.slice(start, start + pageSize);
      }, [currentPage, pageSize]);

      return <Table<Row> {...(args as any)} data={paginatedRows} />;
    };

    return <Example />;
  },
  args: {
    entity: "users",
    title: "Users with pagination",
    columns: [
      { key: "id", label: "ID", sortable: true },
      { key: "name", label: "Name", sortable: true },
      { key: "age", label: "Age", sortable: true },
    ],
  } as any,
};

export const WithCompleteFeatures: Story = {
  render: (args) => {
    const Example = () => {
      const { currentPage, pageSize, setTotal, setCurrentPage, filters } =
        useTableOptions();
      const [expandedRowId, setExpandedRowId] = useState<Row["id"] | null>(
        null,
      );

      const filteredData = useMemo(() => {
        return paginationData.filter((row) => {
          const nameFilter =
            typeof filters.name === "string"
              ? filters.name.trim().toLowerCase()
              : "";
          if (nameFilter && !row.name.toLowerCase().includes(nameFilter)) {
            return false;
          }

          const ageFilter = filters.age as
            | { start?: string | number; end?: string | number }
            | undefined;

          const minAge =
            ageFilter?.start !== null &&
            typeof ageFilter?.start !== "undefined" &&
            ageFilter.start !== ""
              ? Number(ageFilter.start)
              : null;
          const maxAge =
            ageFilter?.end !== null &&
            typeof ageFilter?.end !== "undefined" &&
            ageFilter.end !== ""
              ? Number(ageFilter.end)
              : null;

          if (minAge !== null && !Number.isNaN(minAge) && row.age < minAge) {
            return false;
          }

          if (maxAge !== null && !Number.isNaN(maxAge) && row.age > maxAge) {
            return false;
          }

          return true;
        });
      }, [filters]);

      useEffect(() => {
        setTotal(filteredData.length);
      }, [filteredData.length, setTotal]);

      useEffect(() => {
        const totalPages = Math.max(
          1,
          Math.ceil(filteredData.length / pageSize),
        );
        if (currentPage >= totalPages) {
          setCurrentPage(totalPages - 1);
        }
      }, [currentPage, filteredData.length, pageSize, setCurrentPage]);

      useEffect(() => {
        if (!expandedRowId) return;
        if (!filteredData.some((row) => row.id === expandedRowId)) {
          setExpandedRowId(null);
        }
      }, [expandedRowId, filteredData]);

      const paginatedRows = useMemo(() => {
        const start = currentPage * pageSize;
        return filteredData.slice(start, start + pageSize);
      }, [currentPage, filteredData, pageSize]);

      return (
        <Table<Row>
          {...(args as any)}
          data={paginatedRows}
          expandedRowId={expandedRowId}
          onExpandedRowChange={(expandedRow) =>
            setExpandedRowId(expandedRow?.id ?? null)
          }
          onRowExpand={(expandedRow) => (
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{expandedRow.name}</p>
                <p className="text-xs opacity-70">Age: {expandedRow.age}</p>
              </div>
              <p className="text-xs opacity-70">ID: {expandedRow.id}</p>
            </div>
          )}
        />
      );
    };

    return <Example />;
  },
  args: {
    entity: "users",
    title: "Users with complete features",
    actions: mixedRowActions,
    columns: [
      { key: "id", label: "ID", sortable: true },
      {
        key: "name",
        label: "Name",
        sortable: true,
        filterOptions: {
          type: FilterTypes.text,
          placeholder: "Search by name",
        },
      },
      {
        key: "age",
        label: "Age",
        sortable: true,
        filterOptions: { type: FilterTypes.number, min: 18, max: 80 },
      },
    ],
  } as any,
};
