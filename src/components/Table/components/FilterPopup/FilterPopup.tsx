import { useState, useRef, useEffect } from "react";

// types
import { FilterPopupPropsType } from "./types";

// lib
import { WidgetFilterProps } from "lib";

// providers
import {
  useTranslation,
  FiltersActions,
  useFilters,
  useTableOptions,
} from "providers";

// utils
import { renderFilterComponent } from "./utils";

// components
import { Filters } from "components";

// styles
import "./styles.css";

export const FilterPopup = (props: FilterPopupPropsType) => {
  const { align = "right", filters = [], icon } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { onFilterApply, filters: tableFilters } = useTableOptions();
  const { currentFilters, setCurrentFilters } = useFilters();

  const { t } = useTranslation();

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        (dropdown.current as any)?.contains(target) ||
        (trigger?.current as any)?.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!dropdownOpen || e.code !== "Escape") return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="filter-dropdown-main">
      <button
        ref={trigger}
        className="filter-dropdown-button normal filter-dropdown-trigger"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">{t("_accessibility:buttons.filters")}</span>
        <wbr />
        {icon ?? <Filters className="filter-dropdown-trigger-icon" />}
      </button>
      <div
        className={`filter-dropdown-transition ${dropdownOpen ? "opened" : "closed"} ${
          align === "right" ? "right" : "left"
        }`}
      >
        <div ref={dropdown}>
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
                    setCurrentFilters({ type: FiltersActions.reset })
                  }
                  className="filter-dropdown-button small filter-dropdown-cancel"
                >
                  {t("_accessibility:buttons.clear")}
                </button>
              </li>
              <li>
                <button
                  className="filter-dropdown-button small filter-dropdown-submit bg-primary hover:bg-light-primary"
                  onClick={() => {
                    setDropdownOpen(false);
                    onFilterApply(currentFilters);
                  }}
                  onBlur={() => setDropdownOpen(false)}
                >
                  {t("_accessibility:buttons.applyFilters")}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
