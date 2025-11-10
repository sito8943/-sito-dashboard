import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TextInput } from "components";
import { State } from "components";

const meta: Meta<typeof TextInput> = {
  title: "Components/Form/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "inline-radio",
      options: [State.default, State.error, State.good],
    },
    label: { control: "text" },
    helperText: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: "Nombre",
    placeholder: "Ingresa tu nombre",
    state: State.default,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Correo",
    placeholder: "nombre@dominio.com",
    helperText: "Nunca compartiremos tu correo.",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Usuario",
    helperText: "Campo requerido",
    state: State.error,
    required: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const ControlledExample = () => {
      const [value, setValue] = useState("");
      return (
        <div className="max-w-sm">
          <TextInput
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label={args.label ?? "Controlado"}
            placeholder={args.placeholder ?? "Escribe algo..."}
          />
          <p className="mt-2 text-sm text-gray-500">Valor: {value || "(vacío)"}</p>
        </div>
      );
    };
    return <ControlledExample />;
  },
  args: {
    state: State.default,
  },
};

