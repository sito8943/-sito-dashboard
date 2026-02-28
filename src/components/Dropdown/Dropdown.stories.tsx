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
      const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
      return (
        <div className="p-10">
          <Button
            variant="outlined"
            onClick={(e) => {
              setAnchorEl(e.currentTarget as HTMLElement);
              setOpen((prev) => !prev);
            }}
          >
            Toggle Dropdown
          </Button>
          <Dropdown
            open={open}
            onClose={() => setOpen(false)}
            anchorEl={anchorEl}
          >
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
    anchorEl: null,
  },
};

export const ActionDropdown: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
      return (
        <div className="p-10">
          <IconButton
            icon={<ChevronDown className="w-3 h-3" />}
            onClick={(e) => {
              setAnchorEl(e.currentTarget as HTMLElement);
              setOpen((prev) => !prev);
            }}
          />
          <Dropdown
            open={open}
            onClose={() => setOpen(false)}
            anchorEl={anchorEl}
          >
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
    anchorEl: null,
  },
};

export const EdgeDetection: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
      return (
        <div className="p-10 flex justify-end">
          <Button
            variant="outlined"
            onClick={(e) => {
              setAnchorEl(e.currentTarget as HTMLElement);
              setOpen((prev) => !prev);
            }}
          >
            Trigger (near right edge)
          </Button>
          <Dropdown
            open={open}
            onClose={() => setOpen(false)}
            anchorEl={anchorEl}
          >
            <div className="flex flex-col gap-1 p-2 justify-start items-start min-w-48">
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
    anchorEl: null,
  },
};
