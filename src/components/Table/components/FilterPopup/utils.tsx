import { ReactNode } from "react";

// types
import { FilterTypes, WidgetFilterProps } from "lib";

// widgets
import { SelectWidget, SelectWidgetPropsType } from "../Widgets";

export const renderFilterComponent = (filter: WidgetFilterProps): ReactNode => {
  switch (filter.type) {
    case FilterTypes.text:
      break;
    case FilterTypes.number:
      break;
    case FilterTypes.select:
      return <SelectWidget {...(filter as SelectWidgetPropsType)} />;
    case FilterTypes.autocomplete:
      break;
  }
  return <></>;
};
