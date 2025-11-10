import type { Meta, StoryObj } from "@storybook/react";
import { FileInput } from "components";
import { State } from "components";

const meta: Meta<typeof FileInput> = {
  title: "Components/Form/FileInput",
  component: FileInput,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    multiple: { control: "boolean" },
    disabled: { control: "boolean" },
    state: {
      control: "inline-radio",
      options: [State.default, State.error, State.good],
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileInput>;

export const Default: Story = {
  args: {
    label: "Selecciona archivo",
    helperText: "Formatos admitidos: PDF, PNG, JPG",
    multiple: false,
  },
};

export const MultipleFiles: Story = {
  args: {
    label: "Sube tus archivos",
    multiple: true,
  },
};

