import type { Meta, StoryObj } from "@storybook/react";
import type { Option } from "components";
import { AutocompleteInput } from "components";
import { State } from "components";
import { useState } from "react";

const meta: Meta<typeof AutocompleteInput> = {
  title: "Components/Form/AutocompleteInput",
  component: AutocompleteInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AutocompleteInput>;

const options: Option[] = [
  { id: 6, name: "Kiwi" },
  { id: 7, name: "Fresa" },
  { id: 8, name: "Uva" },
  { id: 9, name: "Naranja" },
  { id: 10, name: "Mandarina" },
  { id: 11, name: "Piña" },
  { id: 12, name: "Cereza" },
  { id: 13, name: "Mango" },
  { id: 14, name: "Papaya" },
  { id: 15, name: "Durazno" },
  { id: 16, name: "Ciruela" },
  { id: 17, name: "Arándanos" },
  { id: 18, name: "Frambuesa" },
  { id: 19, name: "Coco" },
  { id: 20, name: "Guayaba" },
  { id: 21, name: "Lima" },
  { id: 22, name: "Limón" },
  { id: 23, name: "Maracuyá" },
  { id: 24, name: "Higo" },
  { id: 25, name: "Granada" },
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
            value={value}
            onChange={(nextValue) =>
              setValue(Array.isArray(nextValue) ? nextValue : null)
            }
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

export const Default: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<Option | Option[] | null>({
        name: "Default",
        id: 1,
      });

      return (
        <div className="max-w-sm flex gap-2">
          <button onClick={() => setValue({ name: "another", id: 2 })}>
            Set another value
          </button>
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
