import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SelectInput } from "components";
import { State } from "components";

const meta: Meta<typeof SelectInput> = {
  title: "Components/Form/SelectInput",
  component: SelectInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

const sampleOptions = [
  { id: "", value: "Seleccione..." },
  { id: 1, value: "Opción 1" },
  { id: 2, value: "Opción 2" },
  { id: 3, value: "Opción 3" },
];

export const Default: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<string | number>("");
      return (
        <div className="max-w-sm">
          <SelectInput
            {...args}
            label="Selecciona una opción"
            options={sampleOptions}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Elige una opción"
          />
          <p className="mt-2 text-sm text-gray-500">Valor: {String(value)}</p>
        </div>
      );
    };
    return <Example />;
  },
  args: { state: State.default },
};

export const ErrorState: Story = {
  render: Default.render,
  args: { state: State.error, helperText: "Campo requerido" },
};

