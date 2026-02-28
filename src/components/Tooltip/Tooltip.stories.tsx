import type { Meta, StoryObj } from "@storybook/react";
import { Button, Tooltip } from "components";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Información útil",
    children: <Button variant="submit">Hover aquí</Button>,
  },
};
