import { useMemo, useCallback, ChangeEvent } from "react";

// components
import { CheckInput } from "components";

// providers
import { FiltersActions, useFilters } from "providers";

// types
import { CheckWidgetPropsType } from "./types";

export const CheckWidget = (props: CheckWidgetPropsType) => {
  const { propertyName, label } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName]?.value ?? "";
  }, [currentFilters]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: { value: e.target.checked } },
    });
  }, []);

  return (
    <CheckInput label={label} checked={value ?? false} onChange={onChange} />
  );
};
