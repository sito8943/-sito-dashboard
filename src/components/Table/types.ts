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
    asc: string;
    desc: string;
  };
};

export type ColumnPropTypes = {
  entity: string;
  columns: string[];
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
  columns?: string[];
  columnsOptions?: ColumnsOptionsType;
  contentClassName?: string;
  className?: string;
};
