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

const colors = [
  "default",
  "primary",
  "secondary",
  "error",
  "warning",
  "success",
  "info",
] as const;

const variants = ["text", "outlined", "submit"] as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {variants.map((variant) => (
        <div key={variant}>
          <p
            style={{
              margin: "0 0 8px 0",
              fontWeight: 600,
              textTransform: "capitalize",
              fontSize: "13px",
              color: "#666",
            }}
          >
            {variant}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {colors.map((color) => (
              <IconButton
                key={color}
                variant={variant}
                color={color}
                icon={<Close className="w-3 h-3" />}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
