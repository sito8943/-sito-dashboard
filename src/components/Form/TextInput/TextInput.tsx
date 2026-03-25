// styles
import "./styles.css";

import {
  ChangeEvent,
  FocusEvent,
  ForwardedRef,
  forwardRef,
  useState,
} from "react";

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
  const [hasBeenFocused, setHasBeenFocused] = useState(false);

  const hasValue = isControlled ? hasInputValue(value) : uncontrolledHasValue;
  const shouldKeepLabelUpByType = rest.type === "date";
  const keepLabelUp =
    Boolean(rest.placeholder) || hasBeenFocused || shouldKeepLabelUpByType;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledHasValue(event.currentTarget.value.length > 0);
    }

    onChange?.(event);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!hasBeenFocused) {
      setHasBeenFocused(true);
    }

    onFocus?.(event);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!hasBeenFocused) {
      setHasBeenFocused(true);
    }

    onBlur?.(event);
  };

  return (
    <div className={`text-input-container ${containerClassName}`}>
      <input
        ref={ref}
        defaultValue={defaultValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...(isControlled ? { value } : {})}
        className={`text-input ${inputStateClassName(state)} ${inputClassName} ${hasValue ? "has-value" : ""} ${rest.placeholder ? "has-placeholder" : ""} ${keepLabelUp ? "keep-label-up" : ""}`}
        {...rest}
      />
      {!!label && (
        <label
          htmlFor={rest.id}
          className={`text-input-label ${labelStateClassName(state)} ${labelClassName}`}
        >
          {label}
          {rest.required ? " *" : ""}
        </label>
      )}
      {children}
      {!!helperText && (
        <p
          className={`text-input-helper-text ${helperTextStateClassName(state)} ${helperTextClassName}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});
