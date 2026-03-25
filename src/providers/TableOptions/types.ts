// lib
import { FiltersValue, SortOrder } from "lib";
import { ReactNode } from "react";

export type TableOptionsContextType = {
  onSort: (
    column: string,
    onSortCallback?: (prop: string, sortOrder: SortOrder) => void,
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
  clearFilters: (key?: string) => void;
  countOfFilters: number;
  hiddenColumns: string[];
  toggleColumn: (key: string) => void;
  setHiddenColumns: (keys: string[]) => void;
  resetTableOptions: () => void;
};

export type TableOptionsProviderPropsType = {
  children: ReactNode;
  defaultHiddenColumns?: string[];
  initialState?: TableOptionsProviderInitialStateType;
};

export type TableFilters = {
  [key: string]: any;
};

export type TableOptionsProviderInitialStateType = {
  currentPage?: number;
  pageSize?: number;
  pageSizes?: number[];
  sortingBy?: string;
  sortingOrder?: SortOrder;
  filters?: TableFilters;
};
