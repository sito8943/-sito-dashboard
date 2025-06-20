import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { TextWidgetPropsType } from "./types";

// providers
import { FiltersActions, useFilters } from "providers";

// components
import { TextInput } from "components";

export const TextWidget = (props: TextWidgetPropsType) => {
  const { propertyName, label } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName]?.value ?? "";
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
      onChange={onChange}
      containerClassName="input-widget-container"
      helperTextClassName=""
    />
  );
};
