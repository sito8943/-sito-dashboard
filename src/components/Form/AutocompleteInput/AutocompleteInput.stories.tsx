import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AutocompleteInput } from "components";
import { State } from "components";
import type { Option } from "components";

const meta: Meta<typeof AutocompleteInput> = {
  title: "Components/Form/AutocompleteInput",
  component: AutocompleteInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AutocompleteInput>;

const options: Option[] = [
  { id: 1, name: "Manzana" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Melón" },
  { id: 4, name: "Sandía" },
  { id: 5, name: "Pera" },
];

export const Single: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<Option | Option[] | null>(null);
      return (
        <div className="max-w-sm">
          <AutocompleteInput
            {...args}
            label="Fruta"
            placeholder="Escribe para filtrar"
            options={options}
            value={value}
            onChange={setValue}
          />
          {!Array.isArray(value) && (
            <p className="mt-2 text-sm text-gray-500">
              Valor: {value ? String(value.name ?? value.value) : "(vacío)"}
            </p>
          )}
        </div>
      );
    };
    return <Example />;
  },
  args: { state: State.default },
};

export const Multiple: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<Option[] | null>(null);
      return (
        <div className="max-w-sm">
          <AutocompleteInput
            {...args}
            label="Frutas"
            placeholder="Selecciona varias"
            multiple
            options={options}
            value={value as any}
            onChange={setValue as any}
          />
          <p className="mt-2 text-sm text-gray-500">
            Valor:{" "}
            {Array.isArray(value)
              ? value.map((v) => v.name).join(", ")
              : "(vacío)"}
          </p>
        </div>
      );
    };
    return <Example />;
  },
  args: { state: State.default },
};
