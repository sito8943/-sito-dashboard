import { ReactNode } from "react";

// types
import { FilterTypes, WidgetFilterProps } from "lib";

// widgets
import {
  SelectWidget,
  TextWidget,
  NumberWidget,
  CheckWidget,
  SelectWidgetPropsType,
  TextWidgetPropsType,
  NumberWidgetPropsType,
  CheckWidgetPropsType,
} from "../Widgets";

export const renderFilterComponent = (filter: WidgetFilterProps): ReactNode => {
  switch (filter.type) {
    case FilterTypes.text:
      return <TextWidget {...(filter as TextWidgetPropsType)} />;
    case FilterTypes.number:
      return <NumberWidget {...(filter as NumberWidgetPropsType)} />;
    case FilterTypes.select:
      return <SelectWidget {...(filter as SelectWidgetPropsType)} />;
    case FilterTypes.autocomplete:
      break;
    case FilterTypes.date:
      break;
    case FilterTypes.check:
      return <CheckWidget {...(filter as CheckWidgetPropsType)} />;
  }
  return <></>;
};
