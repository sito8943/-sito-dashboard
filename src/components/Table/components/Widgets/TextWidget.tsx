import { ChangeEvent, useCallback, useMemo } from "react";

// types
import { TextWidgetPropsType } from "./types";

// providers
import { FiltersActions, useFilters } from "providers";
import TextInput from "components/Form/TextInput/TextInput";

export const TextWidget = (props: TextWidgetPropsType) => {
  const { propertyName } = props;

  const { currentFilters, setCurrentFilters } = useFilters();

  const value = useMemo(() => {
    return currentFilters[propertyName];
  }, [currentFilters]);

  console.log(value, currentFilters);

  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setCurrentFilters({
      type: FiltersActions.update,
      toUpdate: { [propertyName]: e.target.value },
    });
  }, []);

  return <TextInput value={value} onChange={onChange} helperTextClassName="" />;
};
