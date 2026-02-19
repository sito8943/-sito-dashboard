import { describe, expect, it } from "vitest";

import {
  helperTextStateClassName,
  inputStateClassName,
  labelStateClassName,
  State,
} from "./utils";

describe("form state class name helpers", () => {
  it("returns input class names by state", () => {
    expect(inputStateClassName(State.default)).toBe("input-normal");
    expect(inputStateClassName(State.error)).toBe("input-error");
    expect(inputStateClassName(State.good)).toBe("input-good");
  });

  it("returns label class names by state", () => {
    expect(labelStateClassName(State.default)).toBe("input-label-normal");
    expect(labelStateClassName(State.error)).toBe("input-label-error");
    expect(labelStateClassName(State.good)).toBe("input-label-good");
  });

  it("returns helper text class names by state", () => {
    expect(helperTextStateClassName(State.default)).toBe(
      "input-helper-text-normal",
    );
    expect(helperTextStateClassName(State.error)).toBe(
      "input-helper-text-error",
    );
    expect(helperTextStateClassName(State.good)).toBe("input-helper-text-good");
  });
});
