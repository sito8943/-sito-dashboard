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

export const AboveRelativeLayers: Story = {
  render: () => {
    const Example = () => {
      const [open, setOpen] = useState(false);
      const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

      return (
        <div className="p-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="text-sm text-text-muted">
              Demo: el dropdown se monta en <code>document.body</code> y debe
              verse por encima de capas relativas.
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-base p-6 min-h-44">
              <div className="absolute inset-0 pointer-events-none bg-linear-to-r from-primary/8 to-secondary/8" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-text">Relative Container</p>
                  <p className="text-sm text-text-muted">
                    Esta caja tiene <code>position: relative</code> y{" "}
                    <code>overflow-hidden</code>.
                  </p>
                </div>

                <Button
                  variant="outlined"
                  onClick={(e) => {
                    setAnchorEl(e.currentTarget as HTMLElement);
                    setOpen((prev) => !prev);
                  }}
                >
                  Open Over Layers
                </Button>
              </div>
            </div>

            <div className="relative z-20 rounded-xl border border-border bg-base-dark/60 p-5">
              <p className="font-medium text-text">Sibling Layer (z-20)</p>
              <p className="text-sm text-text-muted">
                Esta capa está encima del flujo normal para comparar stacking.
              </p>
            </div>
          </div>

          <Dropdown
            open={open}
            onClose={() => setOpen(false)}
            anchorEl={anchorEl}
          >
            <div className="flex min-w-56 flex-col gap-1 p-2 items-start">
              <Button variant="text" onClick={() => setOpen(false)}>
                Open details
              </Button>
              <Button variant="text" onClick={() => setOpen(false)}>
                Duplicate
              </Button>
              <Button
                variant="text"
                color="error"
                onClick={() => setOpen(false)}
              >
                Archive
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
