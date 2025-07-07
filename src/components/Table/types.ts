import { ReactNode } from "react";

// lib
import { BaseDto, SortOrder } from "lib";

// component
import { ColumnType } from "./components";

export type Action<TRow extends BaseDto> = {
  id: string;
  onClick: (entity: TRow) => void;
  icon: any;
  tooltip: string;
  hidden: (entity: TRow) => boolean;
};

export type TablePropsType<TRow extends BaseDto> = {
  entity: string;
  title?: string;
  data: TRow[];
  isLoading?: boolean;
  actions?: (row: TRow) => Action<TRow>[];
  columns?: ColumnType<TRow>[];
  contentClassName?: string;
  className?: string;
  softDeleteProperty?: keyof TRow;
  toolbar?: ReactNode;
  onSort: (prop: string, sortOrder: SortOrder) => void;
};
