/* @vitest-environment jsdom */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Chip } from "./Chip";
import { CHIP_VARIANTS } from "./constants";

// jsdom changes import.meta.url to http://, so resolve from the repo root.
const storybookTheme = readFileSync(
  resolve(process.cwd(), ".storybook/theme.css"),
  "utf8",
);

describe("Chip", () => {
  afterEach(cleanup);

  it("applies the default variant class when none is given", () => {
    render(<Chip text="Tag" />);
    expect(screen.getByText("Tag").parentElement?.className).toContain(
      "chip-main default chip-default",
    );
  });

  it("adds the namespaced chip-<variant> class next to the bare one", () => {
    render(<Chip text="Active" variant="success" />);
    const className = screen.getByText("Active").parentElement?.className ?? "";
    expect(className.split(" ")).toEqual(
      expect.arrayContaining(["chip-main", "success", "chip-success"]),
    );
  });

  // Regression for #68: variants had no colors anywhere. The package stays
  // headless; the Storybook theme layer must style every variant.
  it.each(CHIP_VARIANTS.filter((variant) => variant !== "none"))(
    "the Storybook theme styles the %s variant",
    (variant) => {
      expect(storybookTheme).toContain(`.chip-main.chip-${variant}`);
    },
  );
});
