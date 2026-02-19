// components
import { AutocompleteInput, Option } from "components";
// providers
import { FiltersActions, useFilters } from "providers";
import { useCallback, useMemo } from "react";

// types
import { AutocompleteWidgetPropsType } from "./types";

/**
 * Renders the AutocompleteWidget component.
 * @param props - props parameter.
 * @returns Function result.
 */
export function AutocompleteWidget(props: AutocompleteWidgetPropsType) {
  const { propertyName, label, placeholder, options, multiple = true } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName] ?? options[0];
  }, [currentFilters]);

  const onChange = useCallback(
    (value: Option | Option[] | null) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: {
          [propertyName]: {
            value,
          },
        },
      });
    },
    [multiple],
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
      placeholder={placeholder}
    />
  );
}
