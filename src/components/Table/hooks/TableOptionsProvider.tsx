import { createContext, useCallback, useContext, useState } from "react";

// utils
import { SortOrder } from "../../../lib/models/query";

const pageSizes = [20, 50, 100];

type TableOptionsContextType = {
  onSort: (column: string) => void;
  total: number;
  setTotal: (total: number) => void;
  sortingBy: string;
  sortingOrder: SortOrder;
  pageSize: number;
  pageSizes: number[];
  setPageSize: (pageSize: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

type TableOptionsProviderPropsType = {
  children: React.ReactNode;
};

const TableOptionsContext = createContext({} as TableOptionsContextType);

const TableOptionsProvider = (props: TableOptionsProviderPropsType) => {
  const { children } = props;

  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  const [sortingBy, setSortingBy] = useState("id");
  const [sortingOrder, setSortingOrder] = useState(SortOrder.ASC);

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
    sortingOrder,
    pageSize,
    pageSizes,
    setPageSize,
    currentPage,
    setCurrentPage,
  };
  return (
    <TableOptionsContext.Provider value={value}>
      {children}
    </TableOptionsContext.Provider>
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
