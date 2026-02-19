import { describe, expect, it } from "vitest";

import { FiltersActions } from "./types";
import { filtersReducer, initializer } from "./utils";

describe("filters utils", () => {
  it("initializer returns empty object when filters are not provided", () => {
    expect(initializer(undefined as any)).toEqual({});
  });

  it("initializer maps table filters into filters state format", () => {
    const parsed = initializer({
      status: "active",
      age: { min: 18, max: 40 },
    });

    expect(parsed).toEqual({
      status: { value: "active" },
      age: { value: { min: 18, max: 40 } },
    });
  });

  it("filtersReducer resets state", () => {
    const state = {
      status: { value: "active" },
      age: { value: { min: 18, max: 40 } },
    };

    const next = filtersReducer(state, { type: FiltersActions.reset });

    expect(next).toEqual({});
  });

  it("filtersReducer updates and merges state", () => {
    const state = {
      status: { value: "active" },
    };

    const next = filtersReducer(state, {
      type: FiltersActions.update,
      toUpdate: {
        status: { value: "inactive" },
        role: { value: "admin" },
      },
    });

    expect(next).toEqual({
      status: { value: "inactive" },
      role: { value: "admin" },
    });
  });

  it("filtersReducer returns original state on unknown action", () => {
    const state = { status: { value: "active" } };

    const next = filtersReducer(state, { type: 999 as FiltersActions });

    expect(next).toBe(state);
  });
});
