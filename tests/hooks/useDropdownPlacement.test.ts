import { describe, expect, it } from "vitest";

import { resolveDropdownPlacement } from "@/hooks/useDropdownPlacement/utils";

const bounds = { top: 0, bottom: 500 };

describe("resolveDropdownPlacement", () => {
  it("opens below when the list fits", () => {
    expect(
      resolveDropdownPlacement({ top: 100, bottom: 140 }, bounds, 176),
    ).toEqual({ side: "bottom", style: {} });
  });

  it("opens above when it only fits above", () => {
    expect(
      resolveDropdownPlacement({ top: 400, bottom: 440 }, bounds, 176),
    ).toEqual({ side: "top", style: { top: "auto", bottom: "100%" } });
  });

  it("caps the height on the roomier side when it fits nowhere", () => {
    expect(
      resolveDropdownPlacement(
        { top: 150, bottom: 190 },
        { top: 0, bottom: 300 },
        176,
      ),
    ).toEqual({
      side: "top",
      style: { top: "auto", bottom: "100%", maxHeight: 142 },
    });
  });

  it("stays below, shorter, when below has room enough", () => {
    expect(
      resolveDropdownPlacement(
        { top: 120, bottom: 160 },
        { top: 0, bottom: 300 },
        176,
      ),
    ).toEqual({ side: "bottom", style: { maxHeight: 132 } });
  });
});
