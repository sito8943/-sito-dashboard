import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckInput } from "components";

const meta: Meta<typeof CheckInput> = {
  title: "Components/Form/CheckInput",
  component: CheckInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckInput>;

export const Default: Story = {
  render: (args) => {
    const Example = () => {
      const [checked, setChecked] = useState(false);
      return (
        <CheckInput
          {...args}
          label="Acepto términos y condiciones"
          checked={checked}
          onChange={(e) => setChecked(e.currentTarget.checked)}
        />
      );
    };
    return <Example />;
  },
};
