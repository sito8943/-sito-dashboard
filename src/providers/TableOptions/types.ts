// lib
import { FiltersValue, SortOrder } from "lib";
import { ReactNode } from "react";

export type TableOptionsContextType<TFilterKey extends string = string> = {
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
  filters: TableFilters<TFilterKey>;
  clearFilters: (key?: TFilterKey) => void;
  countOfFilters: number;
  hiddenColumns: string[];
  toggleColumn: (key: string) => void;
  setHiddenColumns: (keys: string[]) => void;
  resetTableOptions: () => void;
};

export type TableOptionsProviderPropsType<TFilterKey extends string = string> =
  {
    children: ReactNode;
    defaultHiddenColumns?: string[];
    initialState?: TableOptionsProviderInitialStateType<TFilterKey>;
  };

export type TableFilters<TFilterKey extends string = string> = Partial<
  Record<TFilterKey, any>
>;

export type TableOptionsProviderInitialStateType<
  TFilterKey extends string = string,
> = {
  currentPage?: number;
  pageSize?: number;
  pageSizes?: number[];
  sortingBy?: string;
  sortingOrder?: SortOrder;
  filters?: TableFilters<TFilterKey>;
};
