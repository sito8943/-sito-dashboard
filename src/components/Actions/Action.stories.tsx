import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";

import { Action } from "./Action";

const meta = {
  title: "Components/Actions/Action",
  component: Action,
  tags: ["autodocs"],
  args: {
    id: "view",
    tooltip: "View",
    icon: <FontAwesomeIcon icon={faEye} />,
    onClick: () => alert("View"),
  },
} satisfies Meta<typeof Action>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const WithText: Story = {
  args: { showText: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithoutTooltip: Story = {
  args: { showTooltips: false },
};

export const StopPropagation: Story = {
  args: {
    stopPropagation: true,
    tooltip: "Click me (parent click suppressed)",
    onClick: () => alert("Action clicked — parent onClick NOT fired"),
  },
  render: (args) => (
    <div
      onClick={() => alert("Parent clicked")}
      style={{
        padding: 24,
        border: "1px dashed #888",
        cursor: "pointer",
        display: "inline-block",
      }}
    >
      <span style={{ marginRight: 12 }}>Parent container</span>
      <Action {...args} />
    </div>
  ),
};

export const WithoutStopPropagation: Story = {
  args: {
    stopPropagation: false,
    tooltip: "Click me (parent click fires too)",
    onClick: () => alert("Action clicked"),
  },
  render: (args) => (
    <div
      onClick={() => alert("Parent clicked")}
      style={{
        padding: 24,
        border: "1px dashed #888",
        cursor: "pointer",
        display: "inline-block",
      }}
    >
      <span style={{ marginRight: 12 }}>Parent container</span>
      <Action {...args} />
    </div>
  ),
};
