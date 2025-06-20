import { ChangeEvent, useCallback, useMemo } from "react";

// providers
import { FiltersActions, useTableOptions } from "providers";

// components
import { SelectInput } from "components";

// types
import { SelectWidgetPropsType } from "./types";

export function SelectWidget(props: SelectWidgetPropsType) {
  const { propertyName, options, label } = props;

  const { currentFilters, setCurrentFilters } = useTableOptions();

  const value = useMemo(() => {
    return currentFilters[propertyName] ?? options[0];
  }, [currentFilters]);

  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: { value: e.target.value } },
    });
  }, []);

  return (
    <SelectInput
      value={value?.value}
      label={label}
      options={options}
      helperTextClassName="hidden"
      containerClassName="options-widget-container"
      onChange={onChange}
    />
  );
}
