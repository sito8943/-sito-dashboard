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
export const initializer = <TFilterKey extends string = string>(
  filters: TableFilters<TFilterKey>,
): FiltersValue<TFilterKey> => {
  if (filters) {
    const parsed: FiltersValue<TFilterKey> = {};
    const keys = Object.keys(filters) as TFilterKey[];
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
export function filtersReducer<TFilterKey extends string = string>(
  state: FiltersValue<TFilterKey>,
  action: FiltersActionType<TFilterKey>,
): FiltersValue<TFilterKey> {
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
