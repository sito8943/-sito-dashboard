// lib
import { FiltersValue, FilterType } from "lib";
import { Dispatch, ReactNode } from "react";

export enum FiltersActions {
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
};
