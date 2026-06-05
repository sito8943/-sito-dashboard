// components
import { Option, SelectInput } from "components";
// providers
import { FiltersActions, useFilters } from "providers";
import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { SelectWidgetPropsType } from "./types";

const buildFilterUpdate = <TFilterKey extends string>(
  key: TFilterKey,
  value: string | number,
) =>
  ({
    [key]: { value },
  }) as Record<TFilterKey, { value: string | number }>;

/**
 * Renders the SelectWidget component.
 * @param props - props parameter.
 * @returns Function result.
 */
export function SelectWidget<TFilterKey extends string = string>(
  props: SelectWidgetPropsType<TFilterKey>,
) {
  const { propertyName, options, label, placeholder } = props;

  const { currentFilters, setCurrentFilters } = useFilters<TFilterKey>();

  const value = useMemo(() => {
    const currentValue = currentFilters[propertyName]?.value;
    if (currentValue === null || typeof currentValue === "undefined") {
      return options[0]?.id ?? "";
    }

    if (typeof currentValue === "object" && !Array.isArray(currentValue)) {
      const optionValue = currentValue as Option;
      return optionValue.id ?? optionValue.value ?? "";
    }

    return typeof currentValue === "string" || typeof currentValue === "number"
      ? currentValue
      : (options[0]?.id ?? "");
  }, [currentFilters, options, propertyName]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const matchedOption = options.find(
        (option) => String(option.id) === e.target.value,
      );

      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: buildFilterUpdate(
          propertyName,
          matchedOption?.id ?? e.target.value,
        ),
      });
    },
    [options, propertyName, setCurrentFilters],
  );

  return (
    <SelectInput
      value={value}
      label={label}
      options={options}
      helperTextClassName="hidden"
      containerClassName="options-widget-container"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
