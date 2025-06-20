// lib
import { FiltersValue } from "lib";

// types
import { FiltersActions, FiltersActionType } from "./types";

export function filtersReducer(state: FiltersValue, action: FiltersActionType) {
  const { type } = action;
  switch (type) {
    case FiltersActions.reset: {
      const { filters } = action;

      const parsed: FiltersValue = {};
      filters?.forEach(({ propertyName, defaultValue }) => {
        parsed[propertyName] = { value: defaultValue };
      });
      return { ...state, ...parsed };
    }
    case FiltersActions.update: {
      const { toUpdate } = action;
      return { ...state, ...toUpdate };
    }
    default:
      return state;
  }
}
