/* @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Dropdown } from "./Dropdown";

const renderDropdown = (
  open: boolean,
  onClose = vi.fn(),
  closeOnClick?: boolean,
) => {
  render(
    <Dropdown open={open} onClose={onClose} closeOnClick={closeOnClick}>
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

  it("does not render menu content when open is false", () => {
    renderDropdown(false);
    expect(screen.queryByRole("menu")).toBeNull();
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

  it("calls onClose when clicking inside by default (closeOnClick=true)", () => {
    const { onClose } = renderDropdown(true);
    fireEvent.click(screen.getByRole("button", { name: "Inside" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose on click inside when closeOnClick is explicitly true", () => {
    const { onClose } = renderDropdown(true, vi.fn(), true);
    fireEvent.click(screen.getByRole("button", { name: "Inside" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose on click inside when closeOnClick is false", () => {
    const { onClose } = renderDropdown(true, vi.fn(), false);
    fireEvent.click(screen.getByRole("button", { name: "Inside" }));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onClose on click on dropdown container itself when closeOnClick=true", () => {
    const { onClose } = renderDropdown(true);
    fireEvent.click(screen.getByRole("menu"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose on click on dropdown container when closeOnClick=false", () => {
    const { onClose } = renderDropdown(true, vi.fn(), false);
    fireEvent.click(screen.getByRole("menu"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
