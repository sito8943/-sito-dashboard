import { ReactNode } from "react";

// types
import { FilterTypes, WidgetFilterProps } from "lib";

// widgets
import {
  SelectWidget,
  TextWidget,
  AutocompleteWidget,
  CheckWidget,
  SelectWidgetPropsType,
  TextWidgetPropsType,
  CheckWidgetPropsType,
  AutocompleteWidgetPropsType,
  RangeWidgetPropsType,
} from "../Widgets";
import { RangeWidget } from "../Widgets/RangeWidget";

export const renderFilterComponent = (filter: WidgetFilterProps): ReactNode => {
  switch (filter.type) {
    case FilterTypes.text:
      return <TextWidget {...(filter as TextWidgetPropsType)} />;
    case FilterTypes.number:
      return (
        <RangeWidget {...(filter as unknown as RangeWidgetPropsType<number>)} />
      );
    case FilterTypes.date:
      return (
        <RangeWidget {...(filter as unknown as RangeWidgetPropsType<Date>)} />
      );
    case FilterTypes.select:
      return <SelectWidget {...(filter as SelectWidgetPropsType)} />;
    case FilterTypes.autocomplete:
      return (
        <AutocompleteWidget {...(filter as AutocompleteWidgetPropsType)} />
      );
    case FilterTypes.check:
      return <CheckWidget {...(filter as CheckWidgetPropsType)} />;
  }
  return <></>;
};
