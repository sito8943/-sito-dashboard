import { Badge, Filters, IconButton } from "components";
import { BarsStaggered } from "components/SvgIcons";
// lib
import { BaseDto, FilterType } from "lib";
// providers
import { useTableOptions, useTranslation } from "providers";
import { useCallback, useMemo, useState } from "react";

// components
import { ColumnVisibilityMenu } from "../ColumnVisibilityMenu";
import { ActiveFilters, FilterDropdown } from "../Filters";
// types
import { TableHeaderPropsType } from "./types";

/**
 * Renders the TableHeader component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const TableHeader = <TRow extends BaseDto>(
  props: TableHeaderPropsType<TRow>,
) => {
  const {
    columns,
    title,
    isLoading,
    toolbar,
    filterOptions,
    canHideColumns = false,
    canReset = false,
  } = props;
  const { countOfFilters, resetTableOptions } = useTableOptions();

  const { t } = useTranslation();

  const parsedFilters = useMemo(() => {
    if (columns)
      return [...columns]
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
      if (filterOptions?.dropdown?.setOpened)
        filterOptions.dropdown.setOpened(value ?? false);
      else setDropdownOpen(value ?? false);
    },
    [filterOptions],
  );

  const showDropdown = useMemo(
    () => filterOptions?.dropdown?.opened ?? dropdownOpen,
    [filterOptions, dropdownOpen],
  );
  const hasFilters = parsedFilters.length > 0;
  const canShowFilterButton =
    hasFilters && filterOptions?.button?.hide !== true;
  const isFilterDropdownOpen = hasFilters && showDropdown;

  return (
    <div
      className={`table-header ${isFilterDropdownOpen ? "showing-filters" : ""}`}
    >
      <div>
        {title && <h1 className="table-header-title">{title}</h1>}
        {!isLoading ? (
          <div className="table-header-content">
            {toolbar}
            {canHideColumns && columns && (
              <ColumnVisibilityMenu columns={columns} />
            )}
            {canReset && (
              <IconButton
                icon={<BarsStaggered className="reset-table-icon" />}
                className="normal"
                onClick={resetTableOptions}
              >
                <span className="table-header-sr">
                  {t("_accessibility:buttons.reset")}
                </span>
              </IconButton>
            )}
            {canShowFilterButton && (
              <IconButton
                icon={
                  filterOptions?.button?.icon ?? (
                    <Filters className="filter-dropdown-trigger-icon" />
                  )
                }
                className="filter-dropdown-button normal filter-dropdown-trigger"
                aria-haspopup="true"
                onClick={() => handleDropdown(!showDropdown)}
                aria-expanded={showDropdown}
              >
                <Badge
                  count={countOfFilters}
                  className={`${countOfFilters > 0 ? "show" : "hide"} `}
                />
                <span className="table-header-sr">
                  {t("_accessibility:buttons.filters")}
                </span>
                <wbr />
              </IconButton>
            )}
          </div>
        ) : null}
      </div>
      {hasFilters && (
        <FilterDropdown
          filters={parsedFilters as FilterType[]}
          show={isFilterDropdownOpen}
          handleShow={handleDropdown}
          options={filterOptions}
        />
      )}
      <ActiveFilters filtersDefinition={parsedFilters as FilterType[]} />
    </div>
  );
};
