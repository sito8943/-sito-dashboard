import { useState, useRef, useEffect } from "react";

// types
import { FilterPopupPropsType } from "./types";

// lib
import { WidgetFilterProps } from "lib";

// providers
import { useTranslation, useFilters, FiltersActions } from "providers";

// utils
import { renderFilterComponent } from "./utils";

// styles
import "./styles.css";

export const FilterPopup = (props: FilterPopupPropsType) => {
  const { align = "right", filters = [], icon } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { setCurrentFilters } = useFilters();

  useEffect(() => {
    setCurrentFilters({ type: FiltersActions.reset, filters });
  }, [filters]);

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

  console.log(filters);

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
        {icon ?? (
          <svg className="filter-dropdown-trigger-icon" viewBox="0 0 16 16">
            <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
          </svg>
        )}
      </button>
      <div
        className={`filter-dropdown-transition ${dropdownOpen ? "opened" : "closed"} ${
          align === "right" ? "right" : "left"
        }`}
      >
        <div ref={dropdown}>
          <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-3">
            {t("_accessibility:buttons.filters")}
          </div>
          <ul className="mb-4">
            {filters.map((filter) => (
              <li key={filter.propertyName}>
                {renderFilterComponent(filter as WidgetFilterProps)}
              </li>
            ))}
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">
                  Direct VS Indirect
                </span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">
                  Real Time Value
                </span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Top Channels</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">
                  Sales VS Refunds
                </span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Last Order</span>
              </label>
            </li>
            <li className="py-1 px-3">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="text-sm font-medium ml-2">Total Spent</span>
              </label>
            </li>
          </ul>
          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button className="filter-dropdown-button small filter-dropdown-cancel">
                  {t("_accessibility:buttons.clear")}
                </button>
              </li>
              <li>
                <button
                  className="filter-dropdown-button small filter-dropdown-submit bg-primary hover:bg-light-primary"
                  onClick={() => setDropdownOpen(false)}
                  onBlur={() => setDropdownOpen(false)}
                >
                  Apply
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
