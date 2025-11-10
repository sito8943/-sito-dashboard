import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "components";
import type { BaseDto } from "lib";
import { FilterTypes } from "lib";

type Row = BaseDto & { name: string; age: number };

const meta: Meta<typeof Table<Row>> = {
  title: "Components/Table",
  component: Table as any,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Table<Row>>;

const data: Row[] = [
  { id: 1, deleted: false, name: "Alice", age: 28 },
  { id: 2, deleted: false, name: "Bob", age: 34 },
  { id: 3, deleted: false, name: "Carlos", age: 22 },
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
