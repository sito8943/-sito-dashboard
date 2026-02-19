// styles
import "./styles.css";

import { ForwardedRef, forwardRef } from "react";

// utils
import {
  helperTextStateClassName,
  inputStateClassName,
  labelStateClassName,
  State,
} from "../utils";
// types
import { TextInputPropsType } from "./types";

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
    value = "",
    ...rest
  } = props;

  return (
    <div className={`text-input-container ${containerClassName}`}>
      <input
        ref={ref}
        value={value}
        className={`text-input ${inputStateClassName(state)} peer ${inputClassName} ${!!value ? "has-value" : ""} ${rest.placeholder ? "has-placeholder" : ""}`}
        {...rest}
      />
      {!!label && (
        <label
          htmlFor={rest.name}
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
