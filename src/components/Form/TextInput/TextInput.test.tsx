/* @vitest-environment jsdom */

import { fireEvent, render } from "@testing-library/react";
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
});
