// styles
import "./styles.css";

import { classNames } from "lib";
import { ChangeEvent, ForwardedRef, forwardRef, useState } from "react";

// utils
import {
  helperTextStateClassName,
  inputStateClassName,
  labelStateClassName,
  State,
} from "../utils";
// types
import { TextInputPropsType } from "./types";

const hasInputValue = (inputValue: TextInputPropsType["value"]) => {
  if (inputValue === undefined || inputValue === null) {
    return false;
  }

  if (Array.isArray(inputValue)) {
    return inputValue.length > 0;
  }

  return `${inputValue}`.length > 0;
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

  const isControlled = value !== undefined;
  const [uncontrolledHasValue, setUncontrolledHasValue] = useState(() =>
    hasInputValue(defaultValue as TextInputPropsType["value"]),
  );

  const hasValue = isControlled ? hasInputValue(value) : uncontrolledHasValue;
  const shouldKeepLabelUpByType = ALWAYS_FLOATING_LABEL_INPUT_TYPES.has(
    rest.type ?? "",
  );
  const keepLabelUp = Boolean(rest.placeholder) || shouldKeepLabelUpByType;
  const isAriaRequired =
    rest["aria-required"] === true ||
    String(rest["aria-required"]).toLowerCase() === "true";
  const isLabelRequired = Boolean(rest.required || isAriaRequired);

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
        />
        {!!label && (
          <label
            htmlFor={rest.id}
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
