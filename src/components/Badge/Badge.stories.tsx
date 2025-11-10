import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "components";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Zero: Story = { args: { count: 0 } };
export const Small: Story = { args: { count: 3 } };
export const Large: Story = { args: { count: 99 } };

