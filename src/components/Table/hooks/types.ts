import { Dispatch, ReactNode } from "react";

// lib
import { SortOrder, FilterType, FiltersValue } from "lib";

export type TableOptionsContextType = {
  onSort: (column: string) => void;
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

export enum FiltersActions {
  initialize,
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
  filters: FilterType[];
};
