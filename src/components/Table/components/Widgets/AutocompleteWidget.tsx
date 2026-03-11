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
    const currentValue = currentFilters[propertyName]?.value;
    if (typeof currentValue === "undefined") return null;
    return currentValue as Option | Option[] | null;
  }, [currentFilters, propertyName]);

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
    [propertyName, setCurrentFilters],
  );

  return (
    <AutocompleteInput
      value={value}
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
