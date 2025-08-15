import { useCallback, useMemo } from "react";

// components
import { Chip } from "components";
import { ArrayChip } from "./ArrayChip";
import { RangeChip } from "./RangeChip";

// providers
import { useTableOptions } from "providers";

// styles
import "./styles.css";

// types
import { ActiveFiltersPropsType } from "./types";

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

  const fitlersAsList = useMemo(() => {
    return Object.keys(filters);
  }, [filters]);

  const parseFilters = useCallback(
    (key: string) => {
      if (filters[key].end || filters[key].start)
        return (
          <RangeChip
            label={filterLabels[key]}
            start={filters[key].start}
            end={filters[key].end}
            onClearFilter={clearFilters}
          />
        );
      else if (Array.isArray(filters[key]))
        return (
          <ArrayChip
            label={filterLabels[key]}
            items={filters[key]}
            onClearFilter={clearFilters}
          />
        );
      else
        return (
          <Chip
            label={`${filterLabels[key]}: ${filters[key]?.value ?? filters[key]?.name ?? filters[key]}`}
            onDelete={() => clearFilters(key)}
          />
        );
    },
    [filters, filterLabels]
  );

  return (
    <ul className="active-filters-main">
      {fitlersAsList?.map((key) => <li key={key}>{parseFilters(key)}</li>)}
    </ul>
  );
};
