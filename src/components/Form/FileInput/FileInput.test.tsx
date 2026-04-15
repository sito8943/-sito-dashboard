/* @vitest-environment jsdom */

import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FileInput } from "./FileInput";

describe("FileInput", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("forwards accept attribute to native file input", () => {
    render(<FileInput label="Archivo" accept=".pdf,image/png" />);
    const input = screen.getByLabelText("Archivo");

    expect(input.getAttribute("accept")).toBe(".pdf,image/png");
  });

  it("forwards onChange callbacks", () => {
    const onChange = vi.fn();
    render(<FileInput label="Archivo" onChange={onChange} />);
    const input = screen.getByLabelText("Archivo");
    const file = new File(["hola"], "hola.txt", { type: "text/plain" });

    fireEvent.change(input, { target: { files: [file] } });

    expect(onChange).toHaveBeenCalledOnce();
    expect(
      screen.getByText("hola.txt", { selector: ".file-preview-name" }),
    ).toBeTruthy();
  });

  it("does not accumulate files when multiple is false", () => {
    render(<FileInput label="Archivo" onChange={vi.fn()} />);
    const input = screen.getByLabelText("Archivo");
    const first = new File(["one"], "one.txt", { type: "text/plain" });
    const second = new File(["two"], "two.txt", { type: "text/plain" });

    fireEvent.change(input, { target: { files: [first, second] } });

    expect(
      screen.getByText("one.txt", { selector: ".file-preview-name" }),
    ).toBeTruthy();
    expect(screen.queryByText("two.txt")).toBeNull();
  });

  it("renders only native input when unstyled is true", () => {
    const { container } = render(
      <FileInput unstyled aria-label="Archivo oculto" onChange={vi.fn()} />,
    );

    expect(container.querySelector(".file-input-container")).toBeNull();
    expect(container.querySelector(".file-preview")).toBeNull();
    expect(screen.getByLabelText("Archivo oculto")).toBeTruthy();
  });

  it("supports hiddenContainer as alias of unstyled", () => {
    const { container } = render(
      <FileInput
        hiddenContainer
        aria-label="Archivo oculto"
        onChange={vi.fn()}
      />,
    );

    expect(container.querySelector(".file-input-container")).toBeNull();
    expect(screen.getByLabelText("Archivo oculto")).toBeTruthy();
  });
});
