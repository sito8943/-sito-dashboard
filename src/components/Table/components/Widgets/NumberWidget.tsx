import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { NumberWidgetPropsType } from "./types";

// providers
import { FiltersActions, useTableOptions } from "providers";

// components
import { TextInput } from "components";

export const NumberWidget = (props: NumberWidgetPropsType) => {
  const { propertyName, label, min, max } = props;

  const { currentFilters, setCurrentFilters } = useTableOptions();

  const value = useMemo(() => {
    return currentFilters[propertyName] ?? "";
  }, [currentFilters]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: {
          [propertyName]: { value: e.target.value },
        },
      });
    },
    [value]
  );

  return (
    <TextInput
      value={value?.value ?? ""}
      min={min}
      max={max}
      type="number"
      label={label}
      containerClassName="input-widget-container"
      onChange={onChange}
      helperTextClassName=""
    />
  );
};
