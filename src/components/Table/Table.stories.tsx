import "./styles.css";
import "./components/styles.css";
import "./components/Widgets/styles.css";

import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "components";
import { ChevronRight, Close } from "components/SvgIcons";
import type { BaseDto } from "lib";
import { FilterTypes } from "lib";
import { TranslationProvider } from "providers";

type Row = BaseDto & { name: string; age: number };

const mockTranslations: Record<string, string> = {
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
  "_accessibility:components.table.filters.range.start": "Start value",
  "_accessibility:components.table.filters.range.end": "End value",
  "_accessibility:components.table.selectRow": "Select row",
  "_accessibility:components.table.selectAllRows": "Select all visible rows",
};

const mockT = (key: string, options?: { count?: number }) =>
  mockTranslations[key]?.replace("{{count}}", String(options?.count ?? 0)) ??
  key;

const meta: Meta<typeof Table<Row>> = {
  title: "Components/Table",
  component: Table as any,
  tags: ["autodocs"],
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

export const Basic: Story = {
  args: {
    entity: "users",
    title: "Usuarios",
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

const singleRowActions = (row: Row) => [
  {
    id: "view",
    tooltip: `View ${row.name}`,
    icon: <ChevronRight className="w-4 h-4" />,
    onClick: () => undefined,
  },
];

const multiRowActions = (row: Row) => [
  {
    id: "details",
    tooltip: `Details for ${row.name}`,
    icon: <ChevronRight className="w-4 h-4" />,
    onClick: () => undefined,
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

export const WithSimpleActions: Story = {
  args: {
    entity: "users",
    title: "Users with actions",
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
    title: "Users with bulk actions",
    data,
    columns: [
      { key: "name", label: "Name", sortable: true },
      { key: "age", label: "Age", sortable: true },
    ],
    actions: multiRowActions,
  } as any,
};
