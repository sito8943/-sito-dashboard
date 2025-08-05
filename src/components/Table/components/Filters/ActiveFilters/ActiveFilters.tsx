import { useMemo } from "react";

// components
import { Chip } from "components";
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
    Object.keys(filters).map((key) => console.log(filters[key]));
    return Object.keys(filters);
  }, [filters]);

  return (
    <ul className="active-filters-main">
      {fitlersAsList?.map((key) => (
        <li key={key}>
          {filters[key].end || filters[key].start ? (
            <RangeChip
              label={filterLabels[key]}
              start={filters[key].start}
              end={filters[key].end}
              onClearFilter={clearFilters}
            />
          ) : (
            <Chip
              label={`${filterLabels[key]}: ${filters[key]}`}
              onDelete={() => clearFilters(key)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};
