// components
import { SelectInput } from "components";
// providers
import { FiltersActions, useFilters } from "providers";
import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { SelectWidgetPropsType } from "./types";

/**
 *
 * @param props
 */
export function SelectWidget(props: SelectWidgetPropsType) {
  const { propertyName, options, label, placeholder } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName]?.value ?? options[0];
  }, [currentFilters]);

  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: { value: e.target.value } },
    });
  }, []);

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
