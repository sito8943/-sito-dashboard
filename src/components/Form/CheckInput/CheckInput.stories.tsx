import type { Meta, StoryObj } from "@storybook/react";
import { CheckInput } from "components";
import { State } from "components";
import { useState } from "react";

const meta: Meta<typeof CheckInput> = {
  title: "Components/Form/CheckInput",
  component: CheckInput,
  tags: ["autodocs"],
  argTypes: {
    state: {
      control: "inline-radio",
      options: [State.default, State.error, State.good],
    },
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
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
  args: {
    state: State.default,
  },
};

export const ErrorState: Story = {
  render: Default.render,
  args: {
    state: State.error,
  },
};

export const SuccessState: Story = {
  render: Default.render,
  args: {
    state: State.good,
  },
};
