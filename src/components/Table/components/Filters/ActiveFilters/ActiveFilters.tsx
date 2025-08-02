import { useMemo } from "react";

// components
import { Chip } from "components";

// providers
import { useTableOptions, useTranslation } from "providers";

export const ActiveFilters = () => {
  const { t } = useTranslation();

  const { filters } = useTableOptions();

  const fitlersAsList = useMemo(() => {
    Object.keys(filters).map((key) => console.log(filters[key]));
    return Object.keys(filters);
  }, [filters]);

  return (
    <ul>
      {fitlersAsList?.map((key) => (
        <li key={key}>
          <Chip label={key} />
        </li>
      ))}
    </ul>
  );
};
