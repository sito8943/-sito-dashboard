import { useCallback, useMemo } from "react";

// providers
import { FiltersActions, useTableOptions } from "providers";

// components
import { AutocompleteInput, Option } from "components";

// types
import { AutocompleteWidgetPropsType } from "./types";

export function AutocompleteWidget(props: AutocompleteWidgetPropsType) {
  const { propertyName, label, options, multiple = true } = props;

  const { currentFilters, setCurrentFilters } = useTableOptions();

  const value = useMemo(() => {
    return currentFilters[propertyName] ?? options[0];
  }, [currentFilters]);

  const onChange = useCallback(
    (value: Option | Option[]) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: {
          [propertyName]: {
            value,
          },
        },
      });
    },
    [multiple]
  );

  return (
    <AutocompleteInput
      value={value?.value}
      label={label}
      options={options}
      multiple={multiple}
      helperTextClassName="hidden"
      containerClassName="options-widget-container"
      onChange={onChange}
    />
  );
}
