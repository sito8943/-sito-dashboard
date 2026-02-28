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
});
