// providers
import { useTableOptions } from "providers";
import { createContext, useContext, useEffect, useReducer } from "react";

// types
import {
  FiltersActions,
  FiltersContextType,
  FiltersProviderPropsType,
} from "./types";
// utils
import { filtersReducer, initializer } from "./utils";

const FiltersContext = createContext({} as FiltersContextType);

/**
 * Renders the FiltersProvider component.
 * @param props - props parameter.
 * @returns Function result.
 */
const FiltersProvider = (props: FiltersProviderPropsType) => {
  const { children } = props;
  const { filters } = useTableOptions();

  const [currentFilters, setCurrentFilters] = useReducer(
    filtersReducer,
    initializer(filters),
  );

  // keep local currentFilters in sync with table-level filters
  useEffect(() => {
    // reset local filters
    setCurrentFilters({ type: FiltersActions.reset });
    const initial = initializer(filters);
    if (Object.keys(initial).length) {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: initial,
      });
    }
  }, [filters]);

  const value = {
    currentFilters,
    setCurrentFilters,
  };
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};

/**
 * Provides the useFilters hook.
 * @returns Function result.
 */
const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined)
    throw new Error("tableOptionsContext must be used within a Provider");
  return context;
};

export { FiltersProvider, useFilters };
