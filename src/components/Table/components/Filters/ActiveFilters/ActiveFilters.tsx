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

/**
 *
 * @param props
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
      if (filters[key]?.end || filters[key]?.start)
        return (
          <RangeChip
            id={key}
            text={filterLabels[key]}
            start={filters[key].start}
            end={filters[key].end}
            onClearFilter={clearFilters}
          />
        );
      else if (Array.isArray(filters[key]))
        return (
          <ArrayChip
            id={key}
            text={filterLabels[key]}
            items={filters[key]}
            onClearFilter={clearFilters}
          />
        );
      else
        return (
          <Chip
            text={`${filterLabels[key]}: ${filters[key]?.value ?? filters[key]?.name ?? filters[key]}`}
            onDelete={() => clearFilters(key)}
          />
        );
    },
    [filters, filterLabels],
  );

  return (
    <ul className="active-filters-main">
      {filtersAsList?.map((key) => <li key={key}>{parseFilters(key)}</li>)}
    </ul>
  );
};
