import { ChangeEvent, useCallback, useMemo } from "react";
// components
import { FiltersActions, SelectInput, useFilters } from "components";

// types
import { SelectWidgetPropsType } from "./types";

export function SelectWidget(props: SelectWidgetPropsType) {
  const { propertyName, defaultValue, options } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName];
  }, [currentFilters]);

  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: e.target.value },
    });
  }, []);

  return (
    <SelectInput
      value={value}
      options={options}
      helperTextClassName="hidden"
      onChange={onChange}
    />
  );
}
