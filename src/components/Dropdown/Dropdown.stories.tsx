import type { Meta, StoryObj } from "@storybook/react";
import { Button, Dropdown, IconButton } from "components";
import { ChevronDown } from "components";
import { useState } from "react";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Basic: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      return (
        <div className="p-10 relative">
          <Button variant="outlined" onClick={() => setOpen((prev) => !prev)}>
            Toggle Dropdown
          </Button>
          <Dropdown open={open} onClose={() => setOpen(false)}>
            <div className="p-4">This is dropdown content.</div>
          </Dropdown>
        </div>
      );
    };
    return <Example />;
  },
  args: {
    open: false,
    children: null,
    onClose: () => {},
  },
};

export const ActionDropdown: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      return (
        <div className="p-10 relative">
          <IconButton
            icon={<ChevronDown className="w-3 h-3" />}
            onClick={() => setOpen((prev) => !prev)}
          />
          <Dropdown open={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col gap-1 p-2 justify-start items-start">
              <Button variant="text" onClick={() => setOpen(false)}>
                Edit
              </Button>
              <Button variant="text" onClick={() => setOpen(false)}>
                View Details
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={() => setOpen(false)}
              >
                Delete
              </Button>
            </div>
          </Dropdown>
        </div>
      );
    };
    return <Example />;
  },
  args: {
    open: false,
    children: null,
    onClose: () => {},
  },
};
