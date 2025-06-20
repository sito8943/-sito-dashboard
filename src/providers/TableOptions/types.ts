import { Dispatch, ReactNode } from "react";

// lib
import { FiltersValue, FilterType, SortOrder } from "lib";

export enum FiltersActions {
  update,
  reset,
}

export type FiltersActionType = {
  type: FiltersActions;
  filters?: FilterType[];
  toUpdate?: FiltersValue;
};

export type FiltersContextType = {
  currentFilters: FiltersValue;
  setCurrentFilters: Dispatch<FiltersActionType>;
};

export type FiltersProviderPropsType = {
  children: ReactNode;
};

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
  currentFilters: FiltersValue;
  setCurrentFilters: Dispatch<FiltersActionType>;
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
