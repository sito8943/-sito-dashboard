// types
import { FilterTypes, WidgetFilterProps } from "lib";
import { ReactNode } from "react";

// widgets
import {
  AutocompleteWidget,
  AutocompleteWidgetPropsType,
  CheckWidget,
  CheckWidgetPropsType,
  RangeWidgetPropsType,
  SelectWidget,
  SelectWidgetPropsType,
  TextWidget,
  TextWidgetPropsType,
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
      return <TextWidget {...(filter as TextWidgetPropsType<TFilterKey>)} />;
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
      return (
        <SelectWidget {...(filter as SelectWidgetPropsType<TFilterKey>)} />
      );
    case FilterTypes.autocomplete:
      return (
        <AutocompleteWidget
          {...(filter as AutocompleteWidgetPropsType<TFilterKey>)}
        />
      );
    case FilterTypes.check:
      return <CheckWidget {...(filter as CheckWidgetPropsType<TFilterKey>)} />;
  }
  return <></>;
};
