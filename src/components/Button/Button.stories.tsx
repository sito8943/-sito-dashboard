import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "components";

const meta = {
  title: "Components/Buttons/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click me",
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { variant: "text", color: "default" },
};

export const Outlined: Story = {
  args: { variant: "outlined", color: "default", children: "Click me" },
};

export const Submit: Story = {
  args: { variant: "submit", color: "primary", children: "Click me" },
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
              <Button key={color} variant={variant} color={color}>
                {color}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
