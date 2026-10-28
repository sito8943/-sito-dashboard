/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Tooltip } from "@/main";

const renderInsideListener = () => {
  const onParentKeyDown = vi.fn();
  render(
    <div onKeyDown={onParentKeyDown}>
      <Tooltip content="Add">
        <button type="button">trigger</button>
      </Tooltip>
    </div>,
  );
  return { onParentKeyDown, trigger: screen.getByText("trigger") };
};

describe("Tooltip", () => {
  it("lets Escape propagate when the tooltip is hidden", () => {
    const { onParentKeyDown, trigger } = renderInsideListener();

    fireEvent.keyDown(trigger, { key: "Escape" });

    expect(onParentKeyDown).toHaveBeenCalledTimes(1);
  });

  it("consumes Escape to hide a visible tooltip", () => {
    const { onParentKeyDown, trigger } = renderInsideListener();

    fireEvent.mouseEnter(trigger.parentElement as HTMLElement);
    expect(screen.getByRole("tooltip")).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: "Escape" });

    expect(onParentKeyDown).not.toHaveBeenCalled();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
