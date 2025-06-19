import { ChangeEvent, useCallback, useMemo } from "react";

// providers
import { FiltersActions, useFilters } from "providers";

// types
import { DateWidgetPropsType } from "./types";

// components
import { TextInput } from "components";

export const DateWidget = (props: DateWidgetPropsType) => {
  const { propertyName, label } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName]?.value
      ? new Date(String(currentFilters[propertyName]?.value))
          .toISOString()
          .slice(0, 10)
      : "";
  }, [currentFilters]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: { value: e.target.value } },
    });
  }, []);

  return (
    <TextInput
      value={value ?? ""}
      label={label}
      type="date"
      onChange={onChange}
      containerClassName="input-widget-container"
      helperTextClassName=""
    />
  );
};
