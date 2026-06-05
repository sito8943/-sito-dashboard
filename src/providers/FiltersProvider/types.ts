// lib
import { FiltersValue, FilterType } from "lib";
import { Dispatch, ReactNode } from "react";

export enum FiltersActions {
  update,
  reset,
}

export type FiltersActionType<TFilterKey extends string = string> = {
  type: FiltersActions;
  filters?: FilterType<TFilterKey>[];
  toUpdate?: FiltersValue<TFilterKey>;
};

export type FiltersContextType<TFilterKey extends string = string> = {
  currentFilters: FiltersValue<TFilterKey>;
  setCurrentFilters: Dispatch<FiltersActionType<TFilterKey>>;
};

export type FiltersProviderPropsType = {
  children: ReactNode;
};
