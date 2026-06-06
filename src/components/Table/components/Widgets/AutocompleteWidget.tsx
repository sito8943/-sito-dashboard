// components
import { AutocompleteInput, Option } from "components";
// providers
import { FiltersActions, useFilters } from "providers";
import { useCallback, useMemo } from "react";

// types
import { AutocompleteWidgetPropsType } from "./types";

const buildFilterUpdate = <TFilterKey extends string>(
  key: TFilterKey,
  value: Option | Option[] | null,
) =>
  ({
    [key]: {
      value,
    },
  }) as Record<TFilterKey, { value: Option | Option[] | null }>;

/**
 * Renders the AutocompleteWidget component.
 * @param props - props parameter.
 * @returns Function result.
 */
export function AutocompleteWidget<TFilterKey extends string = string>(
  props: AutocompleteWidgetPropsType<TFilterKey>,
) {
  const { propertyName, label, placeholder, options, multiple = true } = props;

  const { currentFilters, setCurrentFilters } = useFilters<TFilterKey>();

  const value = useMemo(() => {
    const currentValue = currentFilters[propertyName]?.value;
    if (typeof currentValue === "undefined") return null;
    if (
      currentValue === null ||
      Array.isArray(currentValue) ||
      typeof currentValue === "object"
    ) {
      return currentValue as Option | Option[] | null;
    }
    return null;
  }, [currentFilters, propertyName]);

  const onChange = useCallback(
    (value: Option | Option[] | null) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: buildFilterUpdate(propertyName, value),
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
