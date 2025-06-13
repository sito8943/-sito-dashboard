import { FilterTypes, SortOrder } from "lib";

export type Action = {
  id: string;
  onClick: (entity: object) => void;
  icon: any;
  tooltip: string;
  hidden: (entity: object) => boolean;
};

export type ColumnsOptionsType = {
  noSortableColumns: {
    [key: string]: boolean;
  };
  columnClassNames: {
    [key: string]: string;
  };
  icons: {
    className: string;
    asc: string;
    desc: string;
  };
};

export type ColumnType = {
  key: string;
  label: string;
  filterOptions?: ColumnFilterOptions;
};

export type ColumnFilterOptions = {
  type: FilterTypes;
  defaultValue: any;
  label?: string;
};

export type ColumnPropTypes = {
  entity: string;
  columns: ColumnType[];
  columnsOptions?: ColumnsOptionsType;
  hasAction: boolean;
  onSortCallback: (prop: string, sortOrder: SortOrder) => void;
};

export type TablePropsType = {
  entity: string;
  title?: string;
  subtitle?: string;
  rows: object[];
  parseRows?: any;
  isLoading?: boolean;
  actions?: (row: object) => Action[];
  columns?: ColumnType[];
  columnsOptions?: ColumnsOptionsType;
  contentClassName?: string;
  className?: string;
  softDeleteProperty?: string;
  onSort: (prop: string, sortOrder: SortOrder) => void;
};
