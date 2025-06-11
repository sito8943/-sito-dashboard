import { ReactNode } from "react";

// lib
import { FilterType } from "lib";

export type FilterPopupPropsType = {
  align?: "right" | "left";
  icon?: ReactNode | string;
  filters?: FilterType[];
};
