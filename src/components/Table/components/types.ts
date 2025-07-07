import { ReactNode } from "react";

// types
import { Action } from "../types";

// lib
import { BaseDto, FilterTypes, SortOrder } from "lib";

// form
import { Option } from "../../Form/";

export type ColumnType<TRow extends BaseDto> = {
  key: keyof TRow;
  label?: string;
  /** if the column can be sorted */
  sortable?: boolean;
  /** only works if sortable has value true */
  sortOptions?: {
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

export type ColumnPropsType<TRow extends BaseDto> = {
  entity: string;
  columns: ColumnType<TRow>[];
  hasAction: boolean;
  onSortCallback: (prop: string, sortOrder: SortOrder) => void;
};

export type ColumnFilterOptions = {
  type: FilterTypes;
  defaultValue: any;
  label?: string;
  options?: Option[];
};

export type RowsPropsType<TRow extends BaseDto> = {
  data: TRow[];
  columns: ColumnType<TRow>[];
  softDeleteProperty: keyof TRow;
  actions: ((row: TRow) => Action<TRow>[]) | undefined;
};
