import { Dispatch, ReactNode } from "react";

// lib
import { FilterType, FiltersValue } from "lib";

export enum FiltersActions {
  initialize,
  update,
  reset,
}

export type FiltersActionType = {
  type: FiltersActions;
  filters?: FilterType[];
  toUpdate?: FiltersValue;
};

export type FiltersContextType = {
  currentFilters: FiltersValue;
  setCurrentFilters: Dispatch<FiltersActionType>;
};

export type FiltersProviderPropsType = {
  children: ReactNode;
  filters: FilterType[];
};
