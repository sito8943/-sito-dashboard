import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Actions } from "./Actions";
import type { ActionPropsType } from "./types";

type TestRecord = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

const makeAction = (
  overrides: Partial<ActionPropsType<TestRecord>> = {},
): ActionPropsType<TestRecord> => ({
  id: "action",
  icon: <span>icon</span>,
  tooltip: "Action",
  onClick: vi.fn(),
  ...overrides,
});

describe("Actions", () => {
  it("renders an empty list when no actions are provided", () => {
    render(<Actions actions={[]} />);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders the correct number of visible actions", () => {
    const actions = [
      makeAction({ id: "one", tooltip: "One" }),
      makeAction({ id: "two", tooltip: "Two" }),
      makeAction({ id: "three", tooltip: "Three" }),
    ];
    render(<Actions actions={actions} />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("does not render hidden actions", () => {
    const actions = [
      makeAction({ id: "visible", tooltip: "Visible" }),
      makeAction({ id: "gone", tooltip: "Gone", hidden: true }),
    ];
    render(<Actions actions={actions} />);
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("shows tooltip text as button label when showActionTexts is true", () => {
    const actions = [makeAction({ tooltip: "Export data" })];
    render(<Actions actions={actions} showActionTexts />);
    expect(screen.getByText("Export data")).toBeInTheDocument();
  });

  it("disables the button when action is disabled", () => {
    const actions = [makeAction({ disabled: true })];
    render(<Actions actions={actions} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("uses type button to avoid accidental form submits", () => {
    const actions = [makeAction()];
    render(<Actions actions={actions} />);
    expect(screen.getByRole("button").getAttribute("type")).toBe("button");
  });

  it("uses tooltip text as accessible name for icon-only actions", () => {
    render(<Actions actions={[makeAction({ tooltip: "Delete record" })]} />);
    expect(
      screen.getByRole("button", { name: "Delete record" }),
    ).toBeInTheDocument();
  });

  it("shows a tooltip for icon-only actions by default", () => {
    render(<Actions actions={[makeAction({ tooltip: "Delete record" })]} />);
    fireEvent.mouseEnter(screen.getByRole("button", { name: "Delete record" }));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Delete record");
  });

  it("does not render tooltips when showTooltips is false", () => {
    render(
      <Actions
        actions={[makeAction({ tooltip: "Delete record" })]}
        showTooltips={false}
      />,
    );
    fireEvent.mouseEnter(screen.getByRole("button", { name: "Delete record" }));
    expect(screen.queryByRole("tooltip")).toBeNull();
  });

  it("supports per-action button, icon, and label classes", () => {
    render(
      <Actions
        showActionTexts
        actionClassName="global-action"
        actions={[
          makeAction({
            tooltip: "Styled action",
            className: "per-action",
            iconClassName: "per-icon",
            labelClassName: "per-label",
          }),
        ]}
      />,
    );

    const button = screen.getByRole("button", { name: "Styled action" });
    expect(button.classList.contains("global-action")).toBe(true);
    expect(button.classList.contains("per-action")).toBe(true);
    expect(
      button.querySelector(".action-icon")?.classList.contains("per-icon"),
    ).toBe(true);
    expect(
      button.querySelector(".action-label")?.classList.contains("per-label"),
    ).toBe(true);
  });
});
