import { SortOrder } from "lib";
import { ColumnType } from "./components";

export type Action = {
  id: string;
  onClick: (entity: object) => void;
  icon: any;
  tooltip: string;
  hidden: (entity: object) => boolean;
};

export type TablePropsType = {
  entity: string;
  title?: string;
  subtitle?: string;
  data: object[];
  isLoading?: boolean;
  actions?: (row: object) => Action[];
  columns?: ColumnType[];
  contentClassName?: string;
  className?: string;
  softDeleteProperty?: string;
  onSort: (prop: string, sortOrder: SortOrder) => void;
};
