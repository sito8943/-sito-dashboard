import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    accept: { control: "text" },
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
    accept: ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg",
    multiple: false,
  },
};

export const CustomLabel: Story = {
  args: {
    label: (
      <span className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCloudArrowUp} className="text-sky-500" />
        <span>
          Subir documento{" "}
          <span className="text-xs text-gray-400">(máx. 5MB)</span>
        </span>
      </span>
    ),
    accept: ".pdf,.png,.jpg,.jpeg",
    helperText: "Formatos admitidos: PDF, PNG, JPG",
  },
};

export const MultipleFiles: Story = {
  args: {
    label: "Sube tus archivos",
    multiple: true,
  },
};
