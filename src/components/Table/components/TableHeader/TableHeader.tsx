import { useCallback, useMemo, useState } from "react";

// providers
import { useTranslation } from "providers";

// lib
import { BaseDto, FilterType } from "lib";

// types
import { TableHeaderPropsType } from "./types";

// components
import { FilterDropdown } from "../FilterDropdown";
import { Filters } from "components";

export const TableHeader = <TRow extends BaseDto>(
  props: TableHeaderPropsType<TRow>
) => {
  const { columns, title, isLoading, toolbar, filterOptions } = props;

  const { t } = useTranslation();

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

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdown = useCallback(
    (value?: boolean) => {
      filterOptions?.dropdown?.setOpened?.(value ?? false) ??
        setDropdownOpen(value ?? false);
    },
    [filterOptions, dropdownOpen]
  );

  const showDropdown = useMemo(
    () => filterOptions?.dropdown?.opened ?? dropdownOpen,
    [filterOptions, dropdownOpen]
  );

  return (
    <div
      className={`table-header ${title && (toolbar || !filterOptions?.button?.hide) ? "two" : "one"}`}
    >
      <div>
        {title && <h1 className="table-header-title">{title}</h1>}
        {!isLoading ? (
          <div className="table-header-right">
            {toolbar}
            {filterOptions?.button?.hide !== true && (
              <button
                className="filter-dropdown-button normal filter-dropdown-trigger"
                aria-haspopup="true"
                onClick={() =>
                  handleDropdown(
                    filterOptions?.dropdown?.opened ?? !dropdownOpen
                  )
                }
                aria-expanded={showDropdown}
              >
                <span className="sr-only">
                  {t("_accessibility:buttons.filters")}
                </span>
                <wbr />
                {filterOptions?.button?.icon ?? (
                  <Filters className="filter-dropdown-trigger-icon" />
                )}
              </button>
            )}
          </div>
        ) : null}
      </div>
      {!!parsedFilters && !!parsedFilters.length && (
        <FilterDropdown
          filters={parsedFilters as FilterType[]}
          show={showDropdown}
          handleShow={handleDropdown}
          options={filterOptions}
        />
      )}
    </div>
  );
};
