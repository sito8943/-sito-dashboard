// providers
import { useTableOptions } from "providers";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

// types
import {
  FiltersActions,
  FiltersContextType,
  FiltersProviderPropsType,
} from "./types";
// utils
import { filtersReducer, initializer } from "./utils";

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

/**
 * Renders the FiltersProvider component.
 * @param props - props parameter.
 * @returns Function result.
 */
const FiltersProvider = <TFilterKey extends string = string>(
  props: FiltersProviderPropsType,
) => {
  const { children } = props;
  const { filters } = useTableOptions<TFilterKey>();

  const [currentFilters, setCurrentFilters] = useReducer(
    filtersReducer<TFilterKey>,
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

  const value = useMemo<FiltersContextType<TFilterKey>>(
    () => ({
      currentFilters,
      setCurrentFilters,
    }),
    [currentFilters],
  );

  return (
    <FiltersContext.Provider value={value as FiltersContextType}>
      {children}
    </FiltersContext.Provider>
  );
};

/**
 * Provides the useFilters hook.
 * @returns Filters context value with `currentFilters` and `setCurrentFilters`.
 */
const useFilters = <
  TFilterKey extends string = string,
>(): FiltersContextType<TFilterKey> => {
  const context = useContext(FiltersContext);
  if (!context)
    throw new Error("filtersContext must be used within a Provider");
  return context as FiltersContextType<TFilterKey>;
};

export { FiltersProvider, useFilters };
