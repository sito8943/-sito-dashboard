// lib
import { BaseDto } from "lib";
import { ReactNode } from "react";

// components
import { FilterOptions } from "../Filters/FilterDropdown";
// types
import { ColumnType } from "../types";

export type TableHeaderPropsType<TRow extends BaseDto> = {
  title?: string;
  isLoading?: boolean;
  toolbar?: ReactNode;
  columns?: ColumnType<TRow>[];
  filterOptions?: FilterOptions;
};
