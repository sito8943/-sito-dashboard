import { createContext, useCallback, useContext, useState } from "react";

// utils
import { SortOrder } from "lib";

// main
import { FiltersProvider } from "../index";

// types
import {
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

  const onSort = useCallback(
    (attribute: string) => {
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
    },
    [sortingBy, sortingOrder]
  );

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
  };
  return (
    <FiltersProvider>
      <TableOptionsContext.Provider value={value}>
        {children}
      </TableOptionsContext.Provider>
    </FiltersProvider>
  );
};

/**
 *
 * @returns {TableOptions} - options
 */
const useTableOptions = () => {
  const context = useContext(TableOptionsContext);
  if (context === undefined)
    throw new Error("tableOptionsContext must be used within a Provider");
  return context;
};

export { TableOptionsProvider, useTableOptions };
