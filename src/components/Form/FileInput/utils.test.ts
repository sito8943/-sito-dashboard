import { describe, expect, it } from "vitest";

import { truncateFileName } from "./utils";

describe("truncateFileName", () => {
  it("returns original name when length is within the limit", () => {
    const fileName = "report.pdf";

    expect(truncateFileName(fileName, 25)).toBe(fileName);
  });

  it("truncates long names without extension", () => {
    expect(truncateFileName("abcdefghijklmnop", 10)).toBe("abcdefg...");
  });

  it("truncates long names with extension preserving the extension", () => {
    const result = truncateFileName("very-long-file-name.png", 12);

    expect(result).toBe("very-....png");
    expect(result.endsWith(".png")).toBe(true);
    expect(result).toHaveLength(12);
  });
});
