import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Chip } from "components";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: { text: "Etiqueta" },
};

export const Deletable: Story = {
  render: (args) => {
    const Example = () => {
      const [count, setCount] = useState(0);
      return (
        <Chip
          {...args}
          text={`Borrar (${count})`}
          onDelete={() => setCount((c) => c + 1)}
        />
      );
    };
    return <Example />;
  },
};

