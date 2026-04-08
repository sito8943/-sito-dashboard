import { describe, expect, it } from "vitest";

import { classNames } from "./classNames";

describe("classNames", () => {
  it("joins class names with a single whitespace separator", () => {
    expect(classNames("button", "primary")).toBe("button primary");
  });

  it("trims class names and removes empty values", () => {
    expect(classNames(" button ", "", "  ", "primary  ")).toBe(
      "button primary",
    );
  });

  it("ignores falsy and boolean values", () => {
    expect(classNames("button", false, true, null, undefined)).toBe("button");
  });

  it("supports nested arrays", () => {
    expect(
      classNames("button", ["primary", ["active", "  focused  "]], false),
    ).toBe("button primary active focused");
  });

  it("returns an empty string when no classes are provided", () => {
    expect(classNames()).toBe("");
  });
});
