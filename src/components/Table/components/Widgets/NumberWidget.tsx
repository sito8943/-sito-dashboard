import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { NumberWidgetPropsType } from "./types";

// providers
import { FiltersActions, useFilters, useTranslation } from "providers";

// components
import { TextInput } from "components";

export const NumberWidget = (props: NumberWidgetPropsType) => {
  const { propertyName, label, min, max } = props;

  const { t } = useTranslation();

  const { currentFilters, setCurrentFilters } = useFilters();

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
      value={value?.value?.min ?? ""}
      min={min}
      max={max}
      type="number"
      label={label}
      onChange={onChange}
      helperTextClassName=""
    />
  );
};
