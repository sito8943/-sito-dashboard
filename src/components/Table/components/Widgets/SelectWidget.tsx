import { ChangeEvent, useCallback, useMemo } from "react";

// providers
import { useFilters, FiltersActions } from "providers";

// components
import { SelectInput } from "components";

// types
import { SelectWidgetPropsType } from "./types";

export function SelectWidget(props: SelectWidgetPropsType) {
  const { propertyName, options } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName];
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
      options={options}
      helperTextClassName="hidden"
      onChange={onChange}
    />
  );
}
