// styles
import "./styles.css";

// lib
import { WidgetFilterProps } from "lib";
// providers
import {
  FiltersActions,
  useFilters,
  useTableOptions,
  useTranslation,
} from "providers";
import { useEffect, useRef } from "react";

// types
import { FilterDropdownPropsType } from "./types";
// utils
import { renderFilterComponent } from "./utils";

/**
 * Renders the FilterDropdown component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const FilterDropdown = (props: FilterDropdownPropsType) => {
  const { filters = [], show, handleShow } = props;

  const { onFilterApply } = useTableOptions();
  const { currentFilters, setCurrentFilters } = useFilters();

  const { t } = useTranslation();

  const dropdown = useRef<HTMLDivElement | null>(null);

  // close on click outside or Escape key
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if ((target as HTMLElement | null)?.closest(".filter-dropdown-trigger"))
        return;
      if (!show || dropdown.current.contains(target as Node)) return;
      handleShow(false);
    };
    const keyHandler = ({ code }: KeyboardEvent) => {
      if (!show || code !== "Escape") return;
      handleShow(false);
    };
    document.addEventListener("click", clickHandler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [handleShow, show]);

  return (
    <div className={`filter-dropdown-backdrop ${show ? "opened" : "closed"}`}>
      <div className="filter-popup" ref={dropdown}>
        <div className="filter-title">
          {t("_accessibility:buttons.filters")}
        </div>
        <ul className="filter-container">
          {filters.map((filter) => (
            <li key={filter.propertyName} className="filter-container-item">
              {renderFilterComponent(filter as WidgetFilterProps)}
            </li>
          ))}
        </ul>
        <div className="filter-footer">
          <ul className="filter-buttons-row">
            <li>
              <button
                onClick={() =>
                  setCurrentFilters({
                    type: FiltersActions.reset,
                    filters,
                  })
                }
                className="filter-dropdown-button small filter-dropdown-cancel"
              >
                {t("_accessibility:buttons.clear")}
              </button>
            </li>
            <li>
              <button
                className="filter-dropdown-button small filter-dropdown-submit"
                onClick={() => {
                  handleShow(false);
                  onFilterApply(currentFilters);
                }}
              >
                {t("_accessibility:buttons.applyFilters")}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
