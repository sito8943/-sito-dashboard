import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

// lib
import { FiltersValue } from "lib";

// types
import {
  FiltersActions,
  FiltersActionType,
  FiltersContextType,
  FiltersProviderPropsType,
} from "./types";

const FiltersContext = createContext({} as FiltersContextType);

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

const FiltersProvider = (props: FiltersProviderPropsType) => {
  const { children, filters = [] } = props;

  const [currentFilters, setCurrentFilters] = useReducer(filtersReducer, {});

  const value = {
    currentFilters,
    setCurrentFilters,
  };
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

/**
 *
 * @returns {Filters} - options
 */
const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined)
    throw new Error("tableOptionsContext must be used within a Provider");
  return context;
};

export { FiltersProvider, useFilters };
