import { describe, expect, it } from "vitest";

import { ColumnType } from "./components/types";
import { getSortedVisibleColumns } from "./utils";

type Row = { id: number; deletedAt: null };

const col = (
  key: string,
  overrides: Partial<ColumnType<Row>> = {},
): ColumnType<Row> => ({ key, ...overrides });

describe("getSortedVisibleColumns", () => {
  it("returns an empty array for empty input", () => {
    expect(getSortedVisibleColumns<Row>([])).toEqual([]);
  });

  it("sorts columns by pos descending", () => {
    const columns = [
      col("a", { pos: 1 }),
      col("b", { pos: 3 }),
      col("c", { pos: 2 }),
    ];

    const result = getSortedVisibleColumns(columns);

    expect(result.map((c) => c.key)).toEqual(["b", "c", "a"]);
  });

  it("treats missing pos as 0", () => {
    const columns = [col("a", { pos: 2 }), col("b"), col("c", { pos: 1 })];

    const result = getSortedVisibleColumns(columns);

    expect(result.map((c) => c.key)).toEqual(["a", "c", "b"]);
  });

  it("filters out columns with display none", () => {
    const columns = [col("a"), col("b", { display: "none" }), col("c")];

    const result = getSortedVisibleColumns(columns);

    expect(result.map((c) => c.key)).toEqual(["a", "c"]);
    expect(result).toHaveLength(2);
  });

  it("keeps columns with display visible", () => {
    const columns = [
      col("a", { display: "visible" }),
      col("b", { display: "visible" }),
    ];

    expect(getSortedVisibleColumns(columns)).toHaveLength(2);
  });

  it("combines sorting and filtering", () => {
    const columns = [
      col("a", { pos: 1 }),
      col("b", { pos: 3, display: "none" }),
      col("c", { pos: 2 }),
      col("d", { display: "none" }),
    ];

    const result = getSortedVisibleColumns(columns);

    expect(result.map((c) => c.key)).toEqual(["c", "a"]);
  });

  it("preserves all other column properties", () => {
    const columns = [
      col("a", { label: "Column A", sortable: false, className: "foo" }),
    ];

    const [result] = getSortedVisibleColumns(columns);

    expect(result.label).toBe("Column A");
    expect(result.sortable).toBe(false);
    expect(result.className).toBe("foo");
  });

  it("filters out columns in hiddenColumns array", () => {
    const columns = [col("a"), col("b"), col("c")];

    const result = getSortedVisibleColumns(columns, ["b"]);

    expect(result.map((c) => c.key)).toEqual(["a", "c"]);
  });

  it("combines display none and hiddenColumns filtering", () => {
    const columns = [
      col("a"),
      col("b", { display: "none" }),
      col("c"),
      col("d"),
    ];

    const result = getSortedVisibleColumns(columns, ["c"]);

    expect(result.map((c) => c.key)).toEqual(["a", "d"]);
  });

  it("returns all visible columns when hiddenColumns is empty", () => {
    const columns = [col("a"), col("b"), col("c")];

    const result = getSortedVisibleColumns(columns, []);

    expect(result.map((c) => c.key)).toEqual(["a", "b", "c"]);
  });
});
