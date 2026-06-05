// components
import { TextInput } from "components";
// providers
import { FiltersActions, useFilters, useTranslation } from "providers";
import { ChangeEvent, useCallback, useRef } from "react";

// types
import { RangeWidgetPropsType } from "./types";

const isRangeValue = (
  value: unknown,
): value is { start?: unknown; end?: unknown } =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  ("start" in value || "end" in value);

const toInputValue = (value: unknown) => {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return "";
};

const buildFilterUpdate = <TFilterKey extends string>(
  key: TFilterKey,
  value: { start: string | null; end: string | null },
) =>
  ({
    [key]: { value },
  }) as Record<
    TFilterKey,
    { value: { start: string | null; end: string | null } }
  >;

/**
 * Renders the RangeWidget component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const RangeWidget = <T, TFilterKey extends string = string>(
  props: RangeWidgetPropsType<T, TFilterKey>,
) => {
  const { propertyName, label, inputType } = props;

  const { t } = useTranslation();

  const { currentFilters, setCurrentFilters } = useFilters<TFilterKey>();
  const currentRangeValue = currentFilters[propertyName]?.value;
  const rangeValue = isRangeValue(currentRangeValue) ? currentRangeValue : {};

  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const onStartChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: buildFilterUpdate(propertyName, {
          end: endRef?.current?.value ?? null,
          start: e.target.value,
        }),
      });
    },
    [propertyName, setCurrentFilters],
  );

  const onEndChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: buildFilterUpdate(propertyName, {
          start: startRef?.current?.value ?? null,
          end: e.target.value,
        }),
      });
    },
    [propertyName, setCurrentFilters],
  );

  return (
    <div className="range-widget-container">
      <p className="text-input-label input-widget-label input-label-normal">
        {label}
      </p>
      <div className="range-widget-row">
        <TextInput
          value={toInputValue(rangeValue.start)}
          placeholder={t("_accessibility:components.table.filters.range.start")}
          type={inputType}
          ref={startRef}
          onChange={onStartChange}
          containerClassName="input-widget-container"
          helperTextClassName=""
        />
        <TextInput
          value={toInputValue(rangeValue.end)}
          placeholder={t("_accessibility:components.table.filters.range.end")}
          type={inputType}
          ref={endRef}
          onChange={onEndChange}
          containerClassName="input-widget-container"
          helperTextClassName=""
        />
      </div>
    </div>
  );
};
