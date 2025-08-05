import { useMemo } from "react";

// components
import { Chip } from "components";
import { RangeChip } from "./RangeChip";

// providers
import { useTableOptions } from "providers";

// styles
import "./styles.css";

export const ActiveFilters = () => {
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
              label={key}
              start={filters[key].start}
              end={filters[key].end}
              onClearFilter={clearFilters}
            />
          ) : (
            <Chip label={key} />
          )}
        </li>
      ))}
    </ul>
  );
};
