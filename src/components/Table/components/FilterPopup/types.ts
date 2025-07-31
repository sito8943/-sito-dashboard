import { ReactNode } from "react";

// lib
import { FilterType } from "lib";

export type FilterPopupPropsType = {
  filters?: FilterType[];
  options?: FilterOptions;
};

export type FilterOptions = {
  button: {
    icon?: ReactNode | string;
    hide?: boolean;
  };
  dropdown?: {
    opened: boolean;
    setOpened: (value: boolean) => void;
  };
};
