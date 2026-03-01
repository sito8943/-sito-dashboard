/* @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { TranslationProvider } from "providers";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ActionsDropdown } from "./ActionsDropdown";
import type { ActionPropsType } from "./types";

type TestRecord = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
};

const t = (key: string) =>
  key === "_accessibility:buttons.openActions" ? "Open actions" : key;

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <TranslationProvider t={t} language="en">
    {children}
  </TranslationProvider>
);

const makeAction = (
  overrides: Partial<ActionPropsType<TestRecord>> = {},
): ActionPropsType<TestRecord> => ({
  id: "action",
  icon: <span>icon</span>,
  tooltip: "Action",
  onClick: vi.fn(),
  ...overrides,
});

describe("ActionsDropdown", () => {
  afterEach(cleanup);

  it("renders the trigger button", () => {
    render(
      <Wrapper>
        <ActionsDropdown actions={[makeAction()]} />
      </Wrapper>,
    );
    expect(screen.getByRole("button")).toBeTruthy();
  });

  it("dropdown is closed initially", () => {
    render(
      <Wrapper>
        <ActionsDropdown actions={[makeAction()]} />
      </Wrapper>,
    );
    expect(
      screen.getByRole("menu", { hidden: true }).getAttribute("aria-hidden"),
    ).toBe("true");
  });

  it("opens the dropdown when the trigger is clicked", () => {
    render(
      <Wrapper>
        <ActionsDropdown actions={[makeAction()]} />
      </Wrapper>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("menu").getAttribute("aria-hidden")).toBe("false");
  });

  it("shows all action buttons when the dropdown is open", () => {
    const actions = [
      makeAction({ id: "view", tooltip: "View" }),
      makeAction({ id: "edit", tooltip: "Edit" }),
    ];
    render(
      <Wrapper>
        <ActionsDropdown actions={actions} />
      </Wrapper>,
    );
    fireEvent.click(screen.getByRole("button"));
    // trigger button + 2 action buttons
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("shows action tooltip as visible text inside the open dropdown", () => {
    render(
      <Wrapper>
        <ActionsDropdown actions={[makeAction({ tooltip: "Export data" })]} />
      </Wrapper>,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Export data")).toBeTruthy();
  });

  it("calls action onClick when an action inside the dropdown is clicked", () => {
    const onClick = vi.fn();
    render(
      <Wrapper>
        <ActionsDropdown
          actions={[makeAction({ id: "del", tooltip: "Delete", onClick })]}
        />
      </Wrapper>,
    );
    fireEvent.click(screen.getByRole("button")); // open
    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("closes the dropdown when clicking outside", () => {
    render(
      <Wrapper>
        <ActionsDropdown actions={[makeAction()]} />
      </Wrapper>,
    );
    fireEvent.click(screen.getByRole("button")); // open
    fireEvent.mouseDown(document.body);
    expect(
      screen.getByRole("menu", { hidden: true }).getAttribute("aria-hidden"),
    ).toBe("true");
  });

  it("toggles the dropdown closed when the trigger is clicked again", () => {
    render(
      <Wrapper>
        <ActionsDropdown actions={[makeAction()]} />
      </Wrapper>,
    );
    const trigger = screen.getByRole("button");
    fireEvent.click(trigger); // open
    fireEvent.click(trigger); // close
    expect(
      screen.getByRole("menu", { hidden: true }).getAttribute("aria-hidden"),
    ).toBe("true");
  });
});
