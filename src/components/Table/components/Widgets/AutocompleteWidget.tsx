import { ChangeEvent, useCallback, useMemo } from "react";

// providers
import { FiltersActions, useFilters } from "providers";

// components
import { AutocompleteInput } from "components";

// types
import { AutocompleteWidgetPropsType } from "./types";

export function AutocompleteWidget(props: AutocompleteWidgetPropsType) {
  const { propertyName, label, options, multiple = true } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName] ?? options[0];
  }, [currentFilters]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: {
          [propertyName]: {
            value: multiple ? [e.target.value] : e.target.value,
          },
        },
      });
    },
    [multiple]
  );

  return (
    <AutocompleteInput
      value={value}
      label={label}
      options={options}
      multiple={multiple}
      helperTextClassName="hidden"
      onChange={onChange}
    />
  );
}
