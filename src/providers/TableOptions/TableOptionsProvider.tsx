import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";

// lib
import { FiltersValue, SortOrder } from "lib";

// types
import {
  TableFilters,
  TableOptionsContextType,
  TableOptionsProviderPropsType,
} from "./types";

// providers
import { FiltersProvider, filtersReducer } from "providers";

const pageSizes = [20, 50, 100];

const TableOptionsContext = createContext({} as TableOptionsContextType);

const TableOptionsProvider = (props: TableOptionsProviderPropsType) => {
  const { children } = props;

  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  const [sortingBy, setSortingBy] = useState("id");
  const [sortingOrder, setSortingOrder] = useState(SortOrder.DESC);
  const [currentFilters, setCurrentFilters] = useReducer(filtersReducer, {});
  const [filters, setFilters] = useState<TableFilters>({});

  const onSort = useCallback(
    (
      attribute: string,
      onSortCallback: (prop: string, sortOrder: SortOrder) => void
    ) => {
      let localSortingOrder = sortingOrder;
      if (sortingBy === attribute)
        switch (sortingOrder) {
          case SortOrder.ASC:
            localSortingOrder = SortOrder.DESC;
            break;
          default:
            localSortingOrder = SortOrder.ASC;
            break;
        }
      setSortingBy(attribute);
      setSortingOrder(localSortingOrder);

      if (onSortCallback) onSortCallback(attribute, localSortingOrder);
    },
    [sortingBy, sortingOrder]
  );

  const onFilterApply = useCallback((filters: FiltersValue) => {
    const parsedFilters: TableFilters = Object.entries(filters).reduce(
      (acc, [key, filter]) => {
        if (filter && typeof filter.value !== "undefined") {
          acc[key] = filter.value;
        }
        return acc;
      },
      {} as TableFilters
    );

    setFilters(parsedFilters);
  }, []);

  const value = {
    onSort,
    total,
    setTotal,
    sortingBy,
    setSortingBy,
    sortingOrder,
    setSortingOrder,
    pageSize,
    pageSizes,
    setPageSize,
    currentPage,
    setCurrentPage,
    currentFilters,
    setCurrentFilters,
    filters,
    onFilterApply,
  };

  return (
    <TableOptionsContext.Provider value={value}>
      <FiltersProvider>{children}</FiltersProvider>
    </TableOptionsContext.Provider>
  );
};

/**
 *
 * @returns - options
 */
const useTableOptions = () => {
  const context = useContext(TableOptionsContext);
  if (context === undefined)
    throw new Error("tableOptionsContext must be used within a Provider");
  return context;
};

export { TableOptionsProvider, useTableOptions };
