import { ChangeEvent, useCallback, useMemo, useRef } from "react";

// providers
import { FiltersActions, useFilters } from "providers";

// types
import { RangeWidgetPropsType } from "./types";

// components
import { TextInput } from "components";

export const RangeWidget = (props: RangeWidgetPropsType) => {
  const { propertyName, label, inputType } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const startValue = useMemo(() => {
    const start = currentFilters[propertyName]?.value?.start;
    return start
      ? inputType === "date"
        ? new Date(String(start)).toISOString().slice(0, 10)
        : currentFilters[propertyName]?.value
      : "";
  }, [currentFilters]);

  const endValue = useMemo(() => {
    const end = currentFilters[propertyName]?.value?.end;
    return end
      ? inputType === "date"
        ? new Date(String(end)).toISOString().slice(0, 10)
        : currentFilters[propertyName]?.value
      : "";
  }, [currentFilters]);

  const onStartChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: {
        [propertyName]: {
          value: { end: endRef?.current?.value ?? null, start: e.target.value },
        },
      },
    });
  }, []);

  const onEndChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: {
        [propertyName]: {
          value: {
            start: startRef?.current?.value ?? null,
            end: e.target.value,
          },
        },
      },
    });
  }, []);

  return (
    <div className="flex gap-2 items-center">
      <TextInput
        value={startValue ?? ""}
        label={label}
        type={inputType}
        ref={startRef}
        onChange={onStartChange}
        containerClassName="input-widget-container"
        helperTextClassName=""
      />
      <TextInput
        value={endValue ?? ""}
        label={label}
        type={inputType}
        ref={endRef}
        onChange={onEndChange}
        containerClassName="input-widget-container"
        helperTextClassName=""
      />
    </div>
  );
};
