import { ReactNode } from "react";

// types
import { Action } from "../types";

// lib
import { FilterTypes, SortOrder } from "lib";

export type ColumnType = {
  key: string;
  label: string;
  /** if the column can be sorted */
  sortable?: boolean;
  /** only works if sortable has value true */
  sortOptions: {
    icons: {
      className: string;
      asc: string;
      desc: string;
    };
  };
  className?: string;
  display?: "visible" | "none";
  /** column position from 0 */
  pos?: number;
  /** custom body of the cell */
  renderBody?: (value: any, row: any) => ReactNode;
  /** custom head of the cell */
  renderHead?: () => void;
  /** filter options */
  filterOptions?: ColumnFilterOptions;
};

export type ColumnPropsType = {
  entity: string;
  columns: ColumnType[];
  hasAction: boolean;
  onSortCallback: (prop: string, sortOrder: SortOrder) => void;
};

export type ColumnFilterOptions = {
  type: FilterTypes;
  defaultValue: any;
  label?: string;
};

export type RowsPropsType = {
  data: any[];
  columns: ColumnType[];
  softDeleteProperty: string;
  actions: ((row: any) => Action[]) | undefined;
};
