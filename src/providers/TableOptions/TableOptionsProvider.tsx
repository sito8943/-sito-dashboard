// lib
import { FiltersValue, SortOrder } from "lib";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// types
import {
  TableFilters,
  TableOptionsContextType,
  TableOptionsProviderPropsType,
} from "./types";

const pageSizes = [20, 50, 100];

const TableOptionsContext = createContext<TableOptionsContextType | undefined>(
  undefined,
);

const hasMeaningfulFilterValue = (value: unknown): boolean => {
  if (value === null || typeof value === "undefined") return false;

  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === "object") {
    const parsedValue = value as { start?: unknown; end?: unknown };
    if ("start" in parsedValue || "end" in parsedValue) {
      return (
        hasMeaningfulFilterValue(parsedValue.start) ||
        hasMeaningfulFilterValue(parsedValue.end)
      );
    }

    return true;
  }

  return true;
};

/**
 * Renders the TableOptionsProvider component.
 * @param props - props parameter.
 * @returns Function result.
 */
const TableOptionsProvider = (props: TableOptionsProviderPropsType) => {
  const { children } = props;

  const [total, setTotalState] = useState(0);
  const [pageSize, setPageSizeState] = useState(20);
  const [currentPage, setCurrentPageState] = useState(0);

  const [sortingBy, setSortingBy] = useState("id");
  const [sortingOrder, setSortingOrder] = useState(SortOrder.DESC);

  const [filters, setFilters] = useState<TableFilters>({});

  const getMaxPage = useCallback(
    (localTotal: number, localPageSize: number) => {
      if (localPageSize <= 0) return 0;
      return Math.max(0, Math.ceil(localTotal / localPageSize) - 1);
    },
    [],
  );

  const setTotal = useCallback(
    (nextTotal: number) => {
      const parsedTotal = Number.isFinite(nextTotal)
        ? Math.max(0, nextTotal)
        : 0;
      setTotalState(parsedTotal);
      setCurrentPageState((previousPage) =>
        Math.min(previousPage, getMaxPage(parsedTotal, pageSize)),
      );
    },
    [getMaxPage, pageSize],
  );

  const setPageSize = useCallback((nextPageSize: number) => {
    if (!Number.isFinite(nextPageSize) || nextPageSize <= 0) return;
    setPageSizeState(nextPageSize);
    setCurrentPageState(0);
  }, []);

  const setCurrentPage = useCallback(
    (nextCurrentPage: number) => {
      if (!Number.isFinite(nextCurrentPage)) return;
      const nextPage = Math.max(0, Math.floor(nextCurrentPage));
      setCurrentPageState(Math.min(nextPage, getMaxPage(total, pageSize)));
    },
    [getMaxPage, pageSize, total],
  );

  const onSort = useCallback(
    (
      attribute: string,
      onSortCallback?: (prop: string, sortOrder: SortOrder) => void,
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
    [sortingBy, sortingOrder],
  );

  const onFilterApply = useCallback((filters: FiltersValue) => {
    const parsedFilters: TableFilters = Object.entries(filters).reduce(
      (acc, [key, filter]) => {
        if (filter && hasMeaningfulFilterValue(filter.value)) {
          acc[key] = filter.value;
        }
        return acc;
      },
      {} as TableFilters,
    );

    setFilters(parsedFilters);
    setCurrentPageState(0);
  }, []);

  const clearFilters = useCallback(
    (key?: string) => {
      if (key) {
        setFilters((previousFilters) => {
          const nextFilters = { ...previousFilters };
          delete nextFilters[key];
          return nextFilters;
        });
      } else {
        setFilters({});
      }
      setCurrentPageState(0);
    },
    [setFilters],
  );

  const countOfFilters = useMemo(() => {
    return Object.keys(filters).length;
  }, [filters]);

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ],
  );

  return (
    <TableOptionsContext.Provider value={value}>
      {children}
    </TableOptionsContext.Provider>
  );
};

/**
 * Provides the useTableOptions hook.
 * @returns Function result.
 */
const useTableOptions = () => {
  const context = useContext(TableOptionsContext);
  if (!context)
    throw new Error("tableOptionsContext must be used within a Provider");
  return context;
};

export { TableOptionsProvider, useTableOptions };
