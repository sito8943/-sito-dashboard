import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "components";
import { ChevronDown, Close, Filters } from "components";

const meta = {
  title: "Components/Buttons/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    icon: <Close />,
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["text", "outlined", "submit"],
    },
    color: {
      control: { type: "select" },
      options: [
        "default",
        "primary",
        "secondary",
        "error",
        "warning",
        "success",
        "info",
      ],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Close className="w-3 h-3" />,
    variant: "text",
    color: "default",
  },
};

export const WithFilters: Story = {
  args: {
    icon: <Filters className="w-3 h-3" />,
    variant: "text",
    color: "default",
  },
};

export const WithChevron: Story = {
  args: {
    icon: <ChevronDown className="w-3 h-3" />,
    variant: "text",
    color: "default",
  },
};

export const ErrorOnHover: Story = {
  args: { icon: <Close className="w-3 h-3" />, color: "error" },
};
