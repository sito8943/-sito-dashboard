import { ChangeEvent, useCallback, useMemo } from "react";

// providers
import { FiltersActions, useFilters } from "providers";

// components
import { SelectInput } from "components";

// types
import { SelectWidgetPropsType } from "./types";

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
