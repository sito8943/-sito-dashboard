// lib
import { FilterType } from "lib";
import { ReactNode } from "react";

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
