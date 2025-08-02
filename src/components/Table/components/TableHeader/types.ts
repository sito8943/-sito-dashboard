import { ReactNode } from "react";

// types
import { ColumnType } from "../types";

// lib
import { BaseDto } from "lib";

// components
import { FilterOptions } from "../Filters";

export type TableHeaderPropsType<TRow extends BaseDto> = {
  title?: string;
  isLoading?: boolean;
  toolbar?: ReactNode;
  columns?: ColumnType<TRow>[];
  filterOptions?: FilterOptions;
};
