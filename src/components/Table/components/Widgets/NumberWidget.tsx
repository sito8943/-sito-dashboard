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
    return currentFilters[propertyName] ?? { min: "", max: "" };
  }, [currentFilters]);

  const onMinChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: {
          [propertyName]: { value: { ...value, min: e.target.value } },
        },
      });
    },
    [value]
  );

  const onMaxChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: {
          [propertyName]: { value: { ...value, max: e.target.value } },
        },
      });
    },
    [value]
  );

  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <div className="flex gap-2 items-center">
        <TextInput
          value={value?.value?.min ?? ""}
          min={min}
          max={max}
          type="number"
          label={t("_accessibility:labels.min")}
          onChange={onMinChange}
          helperTextClassName=""
        />
        <TextInput
          value={value?.value?.max ?? ""}
          min={min}
          max={max}
          type="number"
          label={t("_accessibility:labels.max")}
          onChange={onMaxChange}
          helperTextClassName=""
        />
      </div>
    </div>
  );
};
