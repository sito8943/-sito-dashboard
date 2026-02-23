/* @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Dropdown } from "./Dropdown";

const renderDropdown = (open: boolean, onClose = vi.fn()) => {
  render(
    <Dropdown open={open} onClose={onClose}>
      <button type="button">Inside</button>
    </Dropdown>,
  );
  return { onClose };
};

describe("Dropdown", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children", () => {
    renderDropdown(true);
    expect(screen.getByRole("button", { name: "Inside" })).toBeTruthy();
  });

  it("has class 'opened' when open is true", () => {
    renderDropdown(true);
    expect(screen.getByRole("menu").className).toContain("opened");
  });

  it("has class 'closed' when open is false", () => {
    renderDropdown(false);
    expect(screen.getByRole("menu", { hidden: true }).className).toContain(
      "closed",
    );
  });

  it("calls onClose when clicking outside", () => {
    const { onClose } = renderDropdown(true);
    fireEvent.mouseDown(document.body);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when pressing Escape", () => {
    const { onClose } = renderDropdown(true);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose when clicking inside", () => {
    const { onClose } = renderDropdown(true);
    fireEvent.mouseDown(screen.getByRole("button", { name: "Inside" }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose on outside click when closed", () => {
    const { onClose } = renderDropdown(false);
    fireEvent.mouseDown(document.body);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("does not call onClose on Escape when closed", () => {
    const { onClose } = renderDropdown(false);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
