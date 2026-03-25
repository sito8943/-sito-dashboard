/* @vitest-environment jsdom */

import { fireEvent, render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { State } from "../utils";
import { TextInput } from "./TextInput";

describe("TextInput", () => {
  it("adds has-value in uncontrolled mode after typing and keeps it after blur", () => {
    const { container } = render(
      <TextInput label="Usuario" state={State.error} value={undefined} />,
    );
    const input = container.querySelector("input");

    expect(input).toBeTruthy();
    if (!input) {
      return;
    }

    expect(input.className).not.toContain("has-value");

    fireEvent.change(input, { target: { value: "maria" } });
    expect(input.className).toContain("has-value");

    fireEvent.blur(input);
    expect(input.className).toContain("has-value");
  });

  it("keeps has-value for controlled values like 0", () => {
    const { container } = render(
      <TextInput type="number" value={0} onChange={vi.fn()} />,
    );
    const input = container.querySelector("input");

    expect(input).toBeTruthy();
    expect(input?.className).toContain("has-value");
  });

  it("still forwards onChange callbacks", () => {
    const onChange = vi.fn();
    const { container } = render(
      <TextInput onChange={onChange} value={undefined} />,
    );
    const input = container.querySelector("input");

    expect(input).toBeTruthy();
    if (!input) {
      return;
    }

    fireEvent.change(input, { target: { value: "ana" } });
    expect(onChange).toHaveBeenCalledOnce();
  });

  it("keeps label up after first focus when no placeholder is provided", async () => {
    const { container } = render(
      <TextInput label="Nombre" value={undefined} />,
    );
    const getInput = () => container.querySelector("input");
    const input = getInput();

    expect(input).toBeTruthy();
    if (!input) {
      return;
    }

    expect(input.className).not.toContain("keep-label-up");

    fireEvent.focus(input);
    await waitFor(() =>
      expect(getInput()?.className).toContain("keep-label-up"),
    );

    fireEvent.blur(getInput() as HTMLInputElement);
    await waitFor(() =>
      expect(getInput()?.className).toContain("keep-label-up"),
    );
  });

  it("keeps label up when placeholder is present", () => {
    const { container } = render(
      <TextInput
        label="Nombre"
        placeholder="Buscar nombre"
        value={undefined}
      />,
    );
    const input = container.querySelector("input");

    expect(input).toBeTruthy();
    expect(input?.className).toContain("keep-label-up");
    expect(input?.className).toContain("has-placeholder");
  });

  it("keeps label up for date inputs to avoid native placeholder overlap", () => {
    const { container } = render(
      <TextInput label="Fecha" type="date" value={undefined} />,
    );
    const input = container.querySelector("input");

    expect(input).toBeTruthy();
    expect(input?.className).toContain("keep-label-up");
  });
});
