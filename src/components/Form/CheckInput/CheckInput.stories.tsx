import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

export const CustomLabel: Story = {
  render: (args) => {
    const Example = () => {
      const [checked, setChecked] = useState(false);
      return (
        <CheckInput
          {...args}
          label={
            <span className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faShieldHalved}
                className="text-green-500"
              />
              <span>
                Acepto la{" "}
                <a href="#" className="underline text-blue-500">
                  política de privacidad
                </a>
              </span>
            </span>
          }
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
