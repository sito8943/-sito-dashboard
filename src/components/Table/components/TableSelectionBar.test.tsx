/* @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BaseDto } from "lib";
import { TranslationProvider } from "providers";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ActionType } from "../types";
import { TableSelectionBar } from "./TableSelectionBar";

type Row = BaseDto & { name: string };

const t = (key: string, options?: Record<string, unknown>) => {
  if (key === "_accessibility:components.table.selectedCount") {
    const count = typeof options?.count === "number" ? options.count : 0;
    return `${count} selected`;
  }
  return key;
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider t={t} language="en">
    {children}
  </TranslationProvider>
);

const makeAction = (
  overrides: Partial<ActionType<Row>> = {},
): ActionType<Row> => ({
  id: "action-1",
  tooltip: "Delete",
  icon: <span>icon</span>,
  onClick: vi.fn(),
  multiple: true,
  ...overrides,
});

describe("TableSelectionBar", () => {
  afterEach(cleanup);

  it("renders the selected count", () => {
    render(
      <Wrapper>
        <TableSelectionBar
          count={3}
          multiActions={[]}
          onActionClick={vi.fn()}
        />
      </Wrapper>,
    );

    expect(screen.getByText("3 selected")).toBeTruthy();
  });

  it("updates count text when count changes", () => {
    render(
      <Wrapper>
        <TableSelectionBar
          count={1}
          multiActions={[]}
          onActionClick={vi.fn()}
        />
      </Wrapper>,
    );

    expect(screen.getByText("1 selected")).toBeTruthy();
  });

  it("does not render action buttons when multiActions is empty", () => {
    render(
      <Wrapper>
        <TableSelectionBar
          count={2}
          multiActions={[]}
          onActionClick={vi.fn()}
        />
      </Wrapper>,
    );

    expect(screen.queryByRole("button")).toBeNull();
  });

  it("renders a button for each action", () => {
    const actions = [
      makeAction({ id: "delete", tooltip: "Delete" }),
      makeAction({ id: "export", tooltip: "Export" }),
    ];

    render(
      <Wrapper>
        <TableSelectionBar
          count={2}
          multiActions={actions}
          onActionClick={vi.fn()}
        />
      </Wrapper>,
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("calls onActionClick with the correct action when a button is clicked", () => {
    const onActionClick = vi.fn();
    const action = makeAction({ id: "delete" });

    render(
      <Wrapper>
        <TableSelectionBar
          count={1}
          multiActions={[action]}
          onActionClick={onActionClick}
        />
      </Wrapper>,
    );

    fireEvent.click(screen.getByRole("button"));

    expect(onActionClick).toHaveBeenCalledTimes(1);
    expect(onActionClick).toHaveBeenCalledWith(action);
  });

  it("calls onActionClick with the right action when multiple actions exist", () => {
    const onActionClick = vi.fn();
    const deleteAction = makeAction({ id: "delete", icon: <span>del</span> });
    const exportAction = makeAction({ id: "export", icon: <span>exp</span> });

    render(
      <Wrapper>
        <TableSelectionBar
          count={2}
          multiActions={[deleteAction, exportAction]}
          onActionClick={onActionClick}
        />
      </Wrapper>,
    );

    const [firstButton, secondButton] = screen.getAllByRole("button");

    fireEvent.click(secondButton);
    expect(onActionClick).toHaveBeenCalledWith(exportAction);

    fireEvent.click(firstButton);
    expect(onActionClick).toHaveBeenCalledWith(deleteAction);
  });

  it("renders a disabled button when action.disabled is true", () => {
    const action = makeAction({ disabled: true });

    render(
      <Wrapper>
        <TableSelectionBar
          count={1}
          multiActions={[action]}
          onActionClick={vi.fn()}
        />
      </Wrapper>,
    );

    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(true);
  });

  it("renders an enabled button when action.disabled is false", () => {
    const action = makeAction({ disabled: false });

    render(
      <Wrapper>
        <TableSelectionBar
          count={1}
          multiActions={[action]}
          onActionClick={vi.fn()}
        />
      </Wrapper>,
    );

    expect(screen.getByRole("button").hasAttribute("disabled")).toBe(false);
  });
});
