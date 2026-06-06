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

const isFilterValueContainer = (
  value: unknown,
): value is { value?: unknown; name?: unknown } =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const formatPrimitiveValue = (value: unknown) => {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return String(value);
  if (value instanceof Date) return value.toISOString();
  return "";
};

const formatFilterValue = (value: unknown) => {
  if (isFilterValueContainer(value)) {
    if ("value" in value && typeof value.value !== "undefined") {
      return formatPrimitiveValue(value.value);
    }

    if ("name" in value && typeof value.name !== "undefined") {
      return formatPrimitiveValue(value.name);
    }
  }

  return formatPrimitiveValue(value);
};
/**
 *
 * @param props - props parameter.
 * @returns Function result.
 */
export const ActiveFilters = <TFilterKey extends string = string>(
  props: ActiveFiltersPropsType<TFilterKey>,
) => {
  const { filtersDefinition } = props;

  const filterLabels = useMemo(() => {
    const dict: Partial<Record<TFilterKey, string>> = {};
    filtersDefinition.forEach((value) => {
      dict[value.propertyName] = value.label ?? value.propertyName;
    });
    return dict;
  }, [filtersDefinition]);

  const { filters, clearFilters } = useTableOptions<TFilterKey>();

  const filtersAsList = useMemo(() => {
    return Object.keys(filters) as TFilterKey[];
  }, [filters]);

  const parseFilters = useCallback(
    (key: TFilterKey) => {
      const filterValue = filters[key];

      if (isRangeValue(filterValue))
        return (
          <RangeChip<unknown, TFilterKey>
            id={key}
            text={filterLabels[key] ?? key}
            start={filterValue.start}
            end={filterValue.end}
            onClearFilter={(filterKey) => clearFilters(filterKey)}
          />
        );
      else if (Array.isArray(filterValue))
        return (
          <ArrayChip<unknown, TFilterKey>
            id={key}
            text={filterLabels[key] ?? key}
            items={filterValue}
            onClearFilter={(filterKey) => clearFilters(filterKey)}
          />
        );
      else
        return (
          <Chip
            text={`${filterLabels[key] ?? key}: ${formatFilterValue(filterValue)}`}
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
