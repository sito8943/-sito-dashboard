// lib
import { BaseDto } from "@/lib";
import { ReactNode } from "react";

// components
import { FilterOptions } from "@/components/organisms/Table/components/Filters/FilterDropdown";
// types
import { ColumnType } from "@/components/organisms/Table/components/types";

export type TableHeaderPropsType<TRow extends BaseDto> = {
  title?: string;
  isLoading?: boolean;
  toolbar?: ReactNode;
  columns?: ColumnType<TRow>[];
  filterOptions?: FilterOptions;
  canHideColumns?: boolean;
  canReset?: boolean;
};
