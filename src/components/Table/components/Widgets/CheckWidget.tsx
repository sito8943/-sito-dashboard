// components
import { CheckInput } from "components";
// providers
import { FiltersActions, useFilters } from "providers";
import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { CheckWidgetPropsType } from "./types";

const buildFilterUpdate = <TFilterKey extends string>(
  key: TFilterKey,
  value: boolean,
) =>
  ({
    [key]: { value },
  }) as Record<TFilterKey, { value: boolean }>;

/**
 * Renders the CheckWidget component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const CheckWidget = <TFilterKey extends string = string>(
  props: CheckWidgetPropsType<TFilterKey>,
) => {
  const { propertyName, label } = props;

  const { currentFilters, setCurrentFilters } = useFilters<TFilterKey>();

  const value = useMemo(() => {
    return currentFilters[propertyName]?.value === true;
  }, [currentFilters, propertyName]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentFilters({
        type: FiltersActions.update,
        toUpdate: buildFilterUpdate(propertyName, e.target.checked),
      });
    },
    [propertyName, setCurrentFilters],
  );

  return <CheckInput label={label} checked={value} onChange={onChange} />;
};
