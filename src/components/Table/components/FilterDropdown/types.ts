import { ReactNode } from "react";

// lib
import { FilterType } from "lib";

export type FilterDropdownPropsType = {
  filters?: FilterType[];
  options?: FilterOptions;
  show: boolean;
  handleShow: (value: boolean) => void;
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
