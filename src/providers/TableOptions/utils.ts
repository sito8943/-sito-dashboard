import { SortOrder } from "lib";
import { createContext } from "react";

// types
import { TableFilters, TableOptionsContextType } from "./types";

const defaultPageSizes = [20, 50, 100];
const defaultSortingBy = "id";

/**
 * Normalizes a value into a positive integer.
 *
 * Falls back when the value is not finite or is less than or equal to `0`.
 * @param value - Candidate value to parse.
 * @param fallback - Fallback value used for invalid input.
 * @returns A floored positive integer.
 */
export const parsePositiveInteger = (
  value: number | undefined,
  fallback: number,
) => {
  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue) || parsedValue <= 0) return fallback;
  return Math.floor(parsedValue);
};

/**
 * Normalizes a value into a non-negative integer.
 *
 * Falls back when the value is not finite or is below `0`.
 * @param value - Candidate value to parse.
 * @param fallback - Fallback value used for invalid input.
 * @returns A floored non-negative integer.
 */
export const parseNonNegativeInteger = (
  value: number | undefined,
  fallback: number,
) => {
  const parsedValue = Number(value);
  if (!Number.isFinite(parsedValue) || parsedValue < 0) return fallback;
  return Math.floor(parsedValue);
};

/**
 * Parses page-size options ensuring they are unique, finite and positive.
 *
 * Invalid values are removed. If the resulting array is empty, defaults are returned.
 * @param sizes - Optional page-size candidates.
 * @returns A sanitized page-size list.
 */
export const parsePageSizes = (sizes: number[] | undefined) => {
  if (!Array.isArray(sizes)) return [...defaultPageSizes];

  const parsedSizes = Array.from(
    new Set(
      sizes
        .map((size) => Number(size))
        .filter((size) => Number.isFinite(size) && size > 0)
        .map((size) => Math.floor(size)),
    ),
  );

  if (!parsedSizes.length) return [...defaultPageSizes];
  return parsedSizes;
};

/**
 * Returns a valid sorting key.
 *
 * Blank or non-string values fallback to the default sorting property.
 * @param sortingBy - Optional sorting key.
 * @returns A non-empty sorting key.
 */
export const parseSortingBy = (sortingBy: string | undefined) => {
  if (typeof sortingBy !== "string" || !sortingBy.trim()) {
    return defaultSortingBy;
  }
  return sortingBy;
};

/**
 * Validates the sorting order enum value.
 * @param sortingOrder - Optional sorting order value.
 * @returns The provided order when valid, otherwise `SortOrder.DESC`.
 */
export const parseSortingOrder = (sortingOrder: SortOrder | undefined) => {
  if (sortingOrder === SortOrder.ASC || sortingOrder === SortOrder.DESC) {
    return sortingOrder;
  }
  return SortOrder.DESC;
};

/**
 * Clones the filters object when it is valid.
 * @param filters - Optional table filters state.
 * @returns A shallow copy of filters, or an empty object for invalid input.
 */
export const parseFilters = (filters: TableFilters | undefined) => {
  if (!filters || typeof filters !== "object") return {};
  return { ...filters };
};

export const TableOptionsContext = createContext<
  TableOptionsContextType | undefined
>(undefined);

/**
 * Checks whether a filter value should be considered active.
 *
 * Strings are trimmed, arrays must contain at least one element, and
 * range-like objects (`{ start, end }`) are recursively validated.
 * @param value - Filter value candidate.
 * @returns `true` when the value contains meaningful filter data.
 */
export const hasMeaningfulFilterValue = (value: unknown): boolean => {
  if (value === null || typeof value === "undefined") return false;

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "object") {
    const parsedValue = value as { start?: unknown; end?: unknown };
    if ("start" in parsedValue || "end" in parsedValue) {
      return (
        hasMeaningfulFilterValue(parsedValue.start) ||
        hasMeaningfulFilterValue(parsedValue.end)
      );
    }

    return true;
  }

  return true;
};
