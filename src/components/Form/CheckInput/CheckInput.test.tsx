/* @vitest-environment jsdom */

import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { State } from "../utils";
import { CheckInput } from "./CheckInput";

describe("CheckInput", () => {
  it("applies input and label classes based on state", () => {
    const { container, rerender } = render(
      <CheckInput label="Aceptar" checked={false} onChange={vi.fn()} />,
    );

    const input = container.querySelector("input");
    const label = container.querySelector(".input-check-label");

    expect(input?.className).toContain("input-normal");
    expect(label?.className).toContain("input-label-normal");

    rerender(
      <CheckInput
        label="Aceptar"
        checked={false}
        onChange={vi.fn()}
        state={State.error}
      />,
    );
    expect(input?.className).toContain("input-error");
    expect(label?.className).toContain("input-label-error");

    rerender(
      <CheckInput
        label="Aceptar"
        checked={false}
        onChange={vi.fn()}
        state={State.good}
      />,
    );
    expect(input?.className).toContain("input-good");
    expect(label?.className).toContain("input-label-good");
  });

  it("forwards onChange with checkbox checked value", () => {
    const onChange = vi.fn();
    const { container } = render(
      <CheckInput label="Aceptar" checked={false} onChange={onChange} />,
    );
    const input = container.querySelector("input");

    expect(input).toBeTruthy();
    if (!input) return;

    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledOnce();
  });
});
