import {
  createContext,
  useCallback,
  useContext,
  useMemo,
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

const pageSizes = [20, 50, 100];

const TableOptionsContext = createContext({} as TableOptionsContextType);

const TableOptionsProvider = (props: TableOptionsProviderPropsType) => {
  const { children } = props;

  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  const [sortingBy, setSortingBy] = useState("id");
  const [sortingOrder, setSortingOrder] = useState(SortOrder.DESC);

  const [filters, setFilters] = useState<TableFilters>({});

  const onSort = useCallback(
    (
      attribute: string,
      onSortCallback?: (prop: string, sortOrder: SortOrder) => void
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
        if (
          filter &&
          typeof filter.value !== "undefined" &&
          filter.value !== null
        ) {
          acc[key] = filter.value;
        }
        return acc;
      },
      {} as TableFilters
    );

    setFilters(parsedFilters);
  }, []);

  const clearFilters = useCallback(
    (key?: string) => {
      console.log(key, filters);
      if (key) {
        delete filters[key.toLowerCase()];
        setFilters({ ...filters });
      } else setFilters({});
    },
    [filters]
  );

  const countOfFilters = useMemo(() => {
    return Object.keys(filters).length;
  }, [filters]);

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
    filters,
    onFilterApply,
    clearFilters,
    countOfFilters,
  };

  return (
    <TableOptionsContext.Provider value={value}>
      {children}
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
