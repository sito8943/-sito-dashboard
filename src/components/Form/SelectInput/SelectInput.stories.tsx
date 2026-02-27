import type { Meta, StoryObj } from "@storybook/react";
import { SelectInput } from "components";
import { State } from "components";
import { useState } from "react";

const meta: Meta<typeof SelectInput> = {
  title: "Components/Form/SelectInput",
  component: SelectInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

const sampleOptions = [
  { id: "", value: "Select..." },
  { id: 1, value: "Option 1" },
  { id: 2, value: "Option 2" },
  { id: 3, value: "Option 3" },
];

export const Default: Story = {
  render: (args) => {
    const Example = () => {
      const [value, setValue] = useState<string | number>("");
      return (
        <div className="max-w-sm">
          <SelectInput
            {...args}
            label="Select an option"
            options={sampleOptions}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            helperText="Choose an option"
          />
          <p className="mt-2 text-sm text-gray-500">Value: {String(value)}</p>
        </div>
      );
    };
    return <Example />;
  },
  args: { state: State.default },
};

export const ErrorState: Story = {
  render: Default.render,
  args: { state: State.error, helperText: "Required field" },
};
