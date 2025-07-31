import { useMemo } from "react";

// lib
import { BaseDto, FilterType } from "lib";

// types
import { TableHeaderPropsType } from "./types";

// components
import { FilterPopup } from "../FilterPopup";

export const TableHeader = <TRow extends BaseDto>(
  props: TableHeaderPropsType<TRow>
) => {
  const { columns, title, isLoading, toolbar, filterOptions } = props;

  const parsedFilters = useMemo(() => {
    if (columns)
      return columns
        .sort((colA, colB) => {
          return (colB.pos ?? 0) - (colA.pos ?? 0);
        })
        .filter((column) => !!column.filterOptions)
        .map((column) => ({
          ...column.filterOptions,
          label: column.filterOptions?.label ?? column.label,
          propertyName: column.key,
        }));
    return [];
  }, [columns]);

  return (
    <div
      className={`table-header ${title && (toolbar || !filterOptions?.button?.hide) ? "two" : "one"}`}
    >
      {title && <h1 className="table-header-title">{title}</h1>}
      {!isLoading ? (
        <div className="table-header-right">
          {toolbar}
          {!!parsedFilters && !!parsedFilters.length && (
            <FilterPopup
              filters={parsedFilters as FilterType[]}
              options={filterOptions}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};
