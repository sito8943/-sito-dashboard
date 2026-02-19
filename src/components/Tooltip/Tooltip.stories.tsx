import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "components";

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
    children: (
      <button className="px-3 py-1 bg-gray-200 rounded">Hover aquí</button>
    ),
  },
};
