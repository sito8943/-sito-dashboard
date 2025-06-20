import { useMemo, useCallback, ChangeEvent } from "react";

// components
import { CheckInput } from "components";

// providers
import { FiltersActions, useTableOptions } from "providers";

// types
import { CheckWidgetPropsType } from "./types";

export const CheckWidget = (props: CheckWidgetPropsType) => {
  const { propertyName, label } = props;

  const { currentFilters, setCurrentFilters } = useTableOptions();

  const value = useMemo(() => {
    return currentFilters[propertyName] ?? "";
  }, [currentFilters]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: { value: e.target.checked } },
    });
  }, []);

  return (
    <CheckInput
      label={label}
      checked={value?.value ?? false}
      onChange={onChange}
    />
  );
};
