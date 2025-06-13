import { Dispatch, ReactNode } from "react";

// lib
import { FiltersValue, SortOrder } from "lib";

// providers
import { FiltersActionType } from "providers";

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
  onFilterApply: (filters: FiltersValue) => void;
  filters: TableFilters;
};

export type TableOptionsProviderPropsType = {
  children: ReactNode;
};

export type TableFilters = {
  [key: string]: any;
};
