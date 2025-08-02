import { createContext, useContext, useMemo, useReducer } from "react";

// types
import { FiltersContextType, FiltersProviderPropsType } from "./types";

// providers
import { useTableOptions } from "providers";

// utils
import { filtersReducer, initializer } from "./utils";

const FiltersContext = createContext({} as FiltersContextType);

const FiltersProvider = (props: FiltersProviderPropsType) => {
  const { children } = props;
  const { filters } = useTableOptions();

  const [currentFilters, setCurrentFilters] = useReducer(
    filtersReducer,
    initializer(filters)
  );

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
 * @returns options
 */
const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined)
    throw new Error("tableOptionsContext must be used within a Provider");
  return context;
};

export { FiltersProvider, useFilters };
