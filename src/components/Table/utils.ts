// lib
import { BaseDto } from "lib";

// types
import { ColumnType } from "./components/types";

/**
 * Returns columns sorted by position (descending) with hidden columns filtered out.
 * @param columns - Array of column definitions to sort and filter.
 * @returns Sorted and filtered array of visible columns.
 */
export function getSortedVisibleColumns<TRow extends BaseDto>(
  columns: ColumnType<TRow>[],
): ColumnType<TRow>[] {
  return columns
    .sort((colA, colB) => (colB.pos ?? 0) - (colA.pos ?? 0))
    .filter((column) => column.display !== "none");
}
