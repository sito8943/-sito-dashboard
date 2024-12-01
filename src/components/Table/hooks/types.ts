import { SortOrder } from "lib/models/query";

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
  children: React.ReactNode;
};
