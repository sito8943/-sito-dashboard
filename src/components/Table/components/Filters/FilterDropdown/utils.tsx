// types
import { FilterTypes, WidgetFilterProps } from "lib";
import { ReactNode } from "react";

// widgets
import {
  AutocompleteWidget,
  CheckWidget,
  RangeWidgetPropsType,
  SelectWidget,
  TextWidget,
} from "../../Widgets";
import { RangeWidget } from "../../Widgets/RangeWidget";

/**
 * Handles renderFilterComponent.
 * @param filter - filter parameter.
 * @returns Function result.
 */
export const renderFilterComponent = <TFilterKey extends string = string>(
  filter: WidgetFilterProps<TFilterKey>,
): ReactNode => {
  switch (filter.type) {
    case FilterTypes.text:
      return <TextWidget {...filter} />;
    case FilterTypes.number:
      return (
        <RangeWidget
          {...(filter as unknown as RangeWidgetPropsType<number, TFilterKey>)}
          inputType="number"
        />
      );
    case FilterTypes.date:
      return (
        <RangeWidget
          {...(filter as unknown as RangeWidgetPropsType<Date, TFilterKey>)}
          inputType="date"
        />
      );
    case FilterTypes.select:
      return <SelectWidget {...filter} />;
    case FilterTypes.autocomplete:
      return <AutocompleteWidget {...filter} />;
    case FilterTypes.check:
      return <CheckWidget {...filter} />;
  }
  return <></>;
};
