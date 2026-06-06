// components
import { TextInput } from "components";
// providers
import { FiltersActions, useFilters } from "providers";
import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { TextWidgetPropsType } from "./types";

const buildFilterUpdate = <TFilterKey extends string>(
  key: TFilterKey,
  value: string,
) =>
  ({
    [key]: { value },
  }) as Record<TFilterKey, { value: string }>;

/**
 * Renders the TextWidget component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const TextWidget = <TFilterKey extends string = string>(
  props: TextWidgetPropsType<TFilterKey>,
) => {
  const { propertyName, label, placeholder } = props;

  const { currentFilters, setCurrentFilters } = useFilters<TFilterKey>();

  const value = useMemo(() => {
    const currentValue = currentFilters[propertyName]?.value;
    return typeof currentValue === "string" ? currentValue : "";
  }, [currentFilters, propertyName]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: buildFilterUpdate(propertyName, e.target.value),
      });
    },
    [propertyName, setCurrentFilters],
  );

  return (
    <TextInput
      value={value ?? ""}
      label={label}
      onChange={onChange}
      containerClassName="input-widget-container"
      helperTextClassName=""
      placeholder={placeholder}
    />
  );
};
