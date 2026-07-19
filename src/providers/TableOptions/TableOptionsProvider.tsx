// lib
import { FiltersValue, SortOrder } from "lib";
import { useCallback, useContext, useMemo, useState } from "react";

// types
import {
  TableFilters,
  TableOptionsContextType,
  TableOptionsProviderPropsType,
} from "./types";
// utils
import {
  getNextSortingOrder,
  hasMeaningfulFilterValue,
  parseFilters,
  parseNonNegativeInteger,
  parsePageSizes,
  parsePositiveInteger,
  parseSortingBy,
  parseSortingOrder,
  TableOptionsContext,
} from "./utils";

/**
 * Renders the TableOptionsProvider component.
 * @param props - props parameter.
 * @returns Function result.
 */
const TableOptionsProvider = <
  TFilterKey extends string = string,
  TColumnKey extends string = string,
>(
  props: TableOptionsProviderPropsType<TFilterKey, TColumnKey>,
) => {
  const { children, defaultHiddenColumns = [], initialState } = props;
  const {
    currentPage: initialCurrentPageValue,
    pageSize: initialPageSizeValue,
    pageSizes: initialPageSizesValue,
    sortingBy: initialSortingByValue,
    sortingOrder: initialSortingOrderValue,
    filters: initialFiltersValue,
  } = initialState ?? {};

  const pageSizes = useMemo(() => {
    const parsedPageSizes = parsePageSizes(initialPageSizesValue);
    const parsedPageSize = parsePositiveInteger(
      initialPageSizeValue,
      parsedPageSizes[0],
    );

    return parsedPageSizes.includes(parsedPageSize)
      ? parsedPageSizes
      : [parsedPageSize, ...parsedPageSizes];
  }, [initialPageSizeValue, initialPageSizesValue]);

  const initialPageSize = useMemo(() => {
    return parsePositiveInteger(initialPageSizeValue, pageSizes[0]);
  }, [initialPageSizeValue, pageSizes]);

  const initialCurrentPage = useMemo(() => {
    return parseNonNegativeInteger(initialCurrentPageValue, 0);
  }, [initialCurrentPageValue]);

  const initialSortingBy = useMemo(() => {
    return parseSortingBy<TColumnKey>(initialSortingByValue);
  }, [initialSortingByValue]);

  const initialSortingOrder = useMemo(() => {
    return parseSortingOrder(initialSortingOrderValue);
  }, [initialSortingOrderValue]);

  const initialFilters = useMemo(() => {
    return parseFilters<TFilterKey>(initialFiltersValue);
  }, [initialFiltersValue]);

  const [total, setTotalState] = useState(0);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [currentPage, setCurrentPageState] = useState(initialCurrentPage);

  const [sortingBy, setSortingBy] = useState(initialSortingBy);
  const [sortingOrder, setSortingOrder] = useState(initialSortingOrder);

  const [filters, setFilters] =
    useState<TableFilters<TFilterKey>>(initialFilters);

  const [hiddenColumns, setHiddenColumns] = useState<TColumnKey[]>([
    ...defaultHiddenColumns,
  ]);

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

      // When total is not known yet, allow the requested page and clamp later on setTotal.
      if (total <= 0) {
        setCurrentPageState(nextPage);
        return;
      }

      setCurrentPageState(Math.min(nextPage, getMaxPage(total, pageSize)));
    },
    [getMaxPage, pageSize, total],
  );

  const onSort = useCallback(
    (
      attribute: TColumnKey,
      onSortCallback?: (prop: TColumnKey, sortOrder: SortOrder) => void,
    ) => {
      const localSortingOrder = getNextSortingOrder(
        sortingBy,
        sortingOrder,
        attribute,
      );
      setSortingBy(attribute);
      setSortingOrder(localSortingOrder);

      if (onSortCallback) onSortCallback(attribute, localSortingOrder);
    },
    [sortingBy, sortingOrder],
  );

  const onFilterApply = useCallback((nextFilters: FiltersValue<TFilterKey>) => {
    const parsedFilters = (Object.keys(nextFilters) as TFilterKey[]).reduce<
      TableFilters<TFilterKey>
    >((acc, key) => {
      const filter = nextFilters[key];
      if (filter && hasMeaningfulFilterValue(filter.value)) {
        acc[key] = filter.value;
      }
      return acc;
    }, {});

    setFilters(parsedFilters);
    setCurrentPageState(0);
  }, []);

  const clearFilters = useCallback(
    (key?: TFilterKey) => {
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

  const toggleColumn = useCallback((key: TColumnKey) => {
    setHiddenColumns((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  }, []);

  const resetTableOptions = useCallback(() => {
    setHiddenColumns([...defaultHiddenColumns]);
    setSortingBy(initialSortingBy);
    setSortingOrder(initialSortingOrder);
    setFilters({ ...initialFilters });
    setCurrentPageState(initialCurrentPage);
  }, [
    defaultHiddenColumns,
    initialCurrentPage,
    initialFilters,
    initialSortingBy,
    initialSortingOrder,
  ]);

  const value = useMemo<TableOptionsContextType<TFilterKey, TColumnKey>>(
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
      hiddenColumns,
      toggleColumn,
      setHiddenColumns,
      resetTableOptions,
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
      hiddenColumns,
      toggleColumn,
      setHiddenColumns,
      resetTableOptions,
    ],
  );

  return (
    <TableOptionsContext.Provider
      value={value as unknown as TableOptionsContextType}
    >
      {children}
    </TableOptionsContext.Provider>
  );
};

/**
 * Provides the useTableOptions hook.
 * @returns Table options context value with state and actions.
 */
const useTableOptions = <
  TFilterKey extends string = string,
  TColumnKey extends string = string,
>(): TableOptionsContextType<TFilterKey, TColumnKey> => {
  const context = useContext(TableOptionsContext);
  if (!context)
    throw new Error("tableOptionsContext must be used within a Provider");
  return context as unknown as TableOptionsContextType<TFilterKey, TColumnKey>;
};

export { TableOptionsProvider, useTableOptions };
