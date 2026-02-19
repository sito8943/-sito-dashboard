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

  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (!show || (dropdown.current as any)?.contains(target)) return;
      handleShow(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!show || e.code !== "Escape") return;
      handleShow(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

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
                onBlur={() => handleShow(false)}
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
