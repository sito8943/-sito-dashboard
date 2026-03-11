// styles
import "./styles.css";

// components
import { Chip } from "components";
// providers
import { useTableOptions } from "providers";
import { useCallback, useMemo } from "react";

import { ArrayChip } from "./ArrayChip";
import { RangeChip } from "./RangeChip";
// types
import { ActiveFiltersPropsType } from "./types";

const isRangeValue = (
  value: unknown,
): value is { start?: unknown; end?: unknown } =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  ("start" in value || "end" in value);

/**
 * Renders the ActiveFilters component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const ActiveFilters = (props: ActiveFiltersPropsType) => {
  const { filtersDefinition } = props;

  const filterLabels = useMemo(() => {
    const dict: { [key: string]: string } = {};
    filtersDefinition.forEach((value) => {
      dict[value.propertyName] = value.label ?? value.propertyName;
    });
    return dict;
  }, [filtersDefinition]);

  const { filters, clearFilters } = useTableOptions();

  const filtersAsList = useMemo(() => {
    return Object.keys(filters);
  }, [filters]);

  const parseFilters = useCallback(
    (key: string) => {
      const filterValue = filters[key];

      if (isRangeValue(filterValue))
        return (
          <RangeChip
            id={key}
            text={filterLabels[key]}
            start={filterValue.start}
            end={filterValue.end}
            onClearFilter={clearFilters}
          />
        );
      else if (Array.isArray(filterValue))
        return (
          <ArrayChip
            id={key}
            text={filterLabels[key]}
            items={filterValue}
            onClearFilter={clearFilters}
          />
        );
      else
        return (
          <Chip
            text={`${filterLabels[key]}: ${filterValue?.value ?? filterValue?.name ?? filterValue}`}
            onDelete={() => clearFilters(key)}
          />
        );
    },
    [filters, filterLabels, clearFilters],
  );

  return (
    <ul className="active-filters-main">
      {filtersAsList?.map((key) => (
        <li key={key}>{parseFilters(key)}</li>
      ))}
    </ul>
  );
};
