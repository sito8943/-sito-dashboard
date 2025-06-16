import { FilterTypes, SortOrder } from "lib";
import { Action } from "../types";

export type ColumnType = {
  key: string;
  label: string;
  sortable?: boolean;
  sortOptions: {
    icons: {
      className: string;
      asc: string;
      desc: string;
    };
  };
  className?: string;
  display?: "visible" | "none";
  pos?: number;
  renderBody?: (value: any, row: any) => React.ReactNode;
  renderHead?: () => void;
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
