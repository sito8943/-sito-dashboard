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
};

export type ColumnPropTypes = {
  entity: string;
  columns: ColumnType[];
  columnsOptions?: ColumnsOptionsType;
  hasAction: boolean;
};

export type TablePropsType = {
  entity: string;
  title?: string;
  subtitle?: string;
  rows: object[];
  parseRows?: any;
  isLoading?: boolean;
  actions?: Action[];
  columns?: ColumnType[];
  columnsOptions?: ColumnsOptionsType;
  contentClassName?: string;
  className?: string;
  softDeleteProperty?: string;
};
