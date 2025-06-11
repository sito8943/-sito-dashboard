import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { TextWidgetPropsType } from "./types";

// providers
import { FiltersActions, useFilters } from "providers";
import TextInput from "components/Form/TextInput/TextInput";

export const TextWidget = (props: TextWidgetPropsType) => {
  const { propertyName, label } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName];
  }, [currentFilters]);

  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: { value: e.target.value } },
    });
  }, []);

  return (
    <TextInput
      value={value?.value}
      label={label}
      onChange={onChange}
      helperTextClassName=""
    />
  );
};
