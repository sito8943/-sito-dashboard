// styles
import "./styles.css";

import { classNames } from "@/lib";
import { ChangeEvent, ForwardedRef, forwardRef, useId, useState } from "react";

// utils
import {
  helperTextStateClassName,
  inputStateClassName,
  labelStateClassName,
  State,
} from "@/lib/form/utils";
// types
import { TextInputPropsType } from "./types";

const hasInputValue = (inputValue: TextInputPropsType["value"]) => {
  if (inputValue === undefined || inputValue === null) {
    return false;
  }

  if (Array.isArray(inputValue)) {
    return inputValue.length > 0;
  }

  return String(inputValue).length > 0;
};

const ALWAYS_FLOATING_LABEL_INPUT_TYPES = new Set([
  "date",
  "datetime-local",
  "time",
  "month",
  "week",
  "range",
  "color",
  "file",
]);

/**
 * TextInput
 * @param {object} props
 * @returns TextInput Component
 */
export const TextInput = forwardRef(function (
  props: TextInputPropsType,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    children,
    state = State.default,
    label = "",
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    helperText = "",
    helperTextClassName = "",
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
    ...rest
  } = props;

  // Without an id the label is not linked to the input, so tapping the
  // label (which sits over the field) would not focus it.
  const generatedId = useId();
  const inputId = rest.id || generatedId;

  const isControlled = value !== undefined;
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(() =>
    hasInputValue(defaultValue),
  );

  const hasValue = isControlled ? hasInputValue(value) : uncontrolledHasValue;
  const shouldKeepLabelUpByType = ALWAYS_FLOATING_LABEL_INPUT_TYPES.has(
    rest.type ?? "",
  );
  const keepLabelUp = Boolean(rest.placeholder) || shouldKeepLabelUpByType;
  const isAriaRequired =
    rest["aria-required"] === true ||
    String(rest["aria-required"]).toLowerCase() === "true";
  const isLabelRequired = rest.required === true || isAriaRequired;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledHasValue(event.currentTarget.value.length > 0);
    }

    onChange?.(event);
  };

  return (
    <div className={classNames("text-input-container", containerClassName)}>
      <div className="text-input-field">
        <input
          ref={ref}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          {...(isControlled ? { value } : {})}
          className={classNames(
            "text-input",
            inputStateClassName(state),
            inputClassName,
            hasValue ? "has-value" : "",
            rest.placeholder ? "has-placeholder" : "",
            keepLabelUp ? "keep-label-up" : "",
          )}
          {...rest}
          id={inputId}
        />
        {!!label && (
          <label
            htmlFor={inputId}
            className={classNames(
              "text-input-label",
              labelStateClassName(state),
              labelClassName,
            )}
          >
            {label}
            {isLabelRequired ? " *" : ""}
          </label>
        )}
        {children}
      </div>
      {!!helperText && (
        <p
          className={classNames(
            "text-input-helper-text",
            helperTextStateClassName(state),
            helperTextClassName,
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});
