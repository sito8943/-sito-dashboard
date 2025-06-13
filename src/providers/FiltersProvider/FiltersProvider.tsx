import { createContext, useContext, useReducer } from "react";

// lib
import { FiltersValue } from "lib";

// types
import { FiltersContextType, FiltersProviderPropsType } from "./types";

// utils
import { filtersReducer } from "./utils";

const FiltersContext = createContext({} as FiltersContextType);

const FiltersProvider = (props: FiltersProviderPropsType) => {
  const { children } = props;

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
 * @returns options
 */
const useFilters = () => {
  const context = useContext(FiltersContext);
  if (context === undefined)
    throw new Error("tableOptionsContext must be used within a Provider");
  return context;
};

export { FiltersProvider, useFilters };
