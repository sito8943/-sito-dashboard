// lib
import { FiltersValue } from "lib";
// providers
import { TableFilters } from "providers";

// types
import { FiltersActions, FiltersActionType } from "./types";

/**
 * Handles initializer.
 * @param filters - filters parameter.
 * @returns Function result.
 */
export const initializer = (filters: TableFilters) => {
  if (!!filters) {
    const parsed: FiltersValue = {};
    const keys = Object.keys(filters);
    keys?.forEach((key) => {
      parsed[key] = { value: filters[key] };
    });
    return parsed;
  }
  return {};
};

/**
 * Handles filtersReducer.
 * @param state - state parameter.
 * @param action - action parameter.
 * @returns Function result.
 */
export function filtersReducer(state: FiltersValue, action: FiltersActionType) {
  const { type } = action;
  switch (type) {
    case FiltersActions.reset: {
      return {};
    }
    case FiltersActions.update: {
      const { toUpdate } = action;
      return { ...state, ...toUpdate };
    }
    default:
      return state;
  }
}
