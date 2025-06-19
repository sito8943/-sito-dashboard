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
    return currentFilters[propertyName] ?? "";
  }, [currentFilters]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: { value: e.target.value } },
    });
  }, []);

  return (
    <TextInput
      value={value?.value ?? ""}
      label={label}
      type="date"
      onChange={onChange}
      containerClassName="mb-0"
      helperTextClassName=""
    />
  );
};
