// lib
import { FiltersValue, SortOrder } from "lib";
import { ReactNode } from "react";

export type TableOptionsContextType<
  TFilterKey extends string = string,
  TColumnKey extends string = string,
> = {
  onSort: (
    column: TColumnKey,
    onSortCallback?: (prop: TColumnKey, sortOrder: SortOrder) => void,
  ) => void;
  total: number;
  setTotal: (total: number) => void;
  sortingBy: TColumnKey;
  setSortingBy: (property: TColumnKey) => void;
  sortingOrder: SortOrder;
  setSortingOrder: (sortOrder: SortOrder) => void;
  pageSize: number;
  pageSizes: number[];
  setPageSize: (pageSize: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  onFilterApply: (filters: FiltersValue<TFilterKey>) => void;
  filters: TableFilters<TFilterKey>;
  clearFilters: (key?: TFilterKey) => void;
  countOfFilters: number;
  hiddenColumns: TColumnKey[];
  toggleColumn: (key: TColumnKey) => void;
  setHiddenColumns: (keys: TColumnKey[]) => void;
  resetTableOptions: () => void;
};

export type TableOptionsProviderPropsType<
  TFilterKey extends string = string,
  TColumnKey extends string = string,
> = {
  children: ReactNode;
  defaultHiddenColumns?: TColumnKey[];
  initialState?: TableOptionsProviderInitialStateType<TFilterKey, TColumnKey>;
};

export type TableFilters<TFilterKey extends string = string> = Partial<
  Record<TFilterKey, unknown>
>;

export type TableOptionsProviderInitialStateType<
  TFilterKey extends string = string,
  TColumnKey extends string = string,
> = {
  currentPage?: number;
  pageSize?: number;
  pageSizes?: number[];
  sortingBy?: TColumnKey;
  sortingOrder?: SortOrder;
  filters?: TableFilters<TFilterKey>;
};
