import { ReactNode } from "react";

// lib
import { SortOrder } from "lib";

export type TableOptionsContextType = {
  onSort: (
    column: string,
    onSortCallback: (prop: string, sortOrder: SortOrder) => void
  ) => void;
  total: number;
  setTotal: (total: number) => void;
  sortingBy: string;
  setSortingBy: (property: string) => void;
  sortingOrder: SortOrder;
  setSortingOrder: (sortOrder: SortOrder) => void;
  pageSize: number;
  pageSizes: number[];
  setPageSize: (pageSize: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

export type TableOptionsProviderPropsType = {
  children: ReactNode;
};
