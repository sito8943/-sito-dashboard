import { ForwardedRef, forwardRef } from "react";

// utils
import {
  inputStateClassName,
  labelStateClassName,
  helperTextStateClassName,
  State,
} from "../utils";

// types
import { TextInputPropsType } from "./types";

// styles
import "./styles.css";

/**
 * TextInput
 * @param {object} props
 * @returns TextInput Component
 */
const TextInput = forwardRef(function (
  props: TextInputPropsType,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    children,
    value,
    onChange,
    state = State.default,
    name = "",
    id = "",
    type = "text",
    label = "",
    required = false,
    placeholder = "",
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    helperText = "",
    helperTextClassName = "",
    ...rest
  } = props;

  return (
    <div className={`text-input-container ${containerClassName}`}>
      <input
        ref={ref}
        type={type}
        name={name}
        id={id}
        className={`text-input ${inputStateClassName(state)} peer ${inputClassName}`}
        placeholder=""
        required={required}
        value={value}
        onChange={onChange}
        {...rest}
      />
      <label
        htmlFor={name}
        className={`text-input-label ${labelStateClassName(state)} ${labelClassName}`}
      >
        {label}
        {required ? " *" : ""}
      </label>
      {children}
      <p
        className={`text-input-helper-text ${helperTextStateClassName(state)} ${helperTextClassName}`}
      >
        {state !== "error" && state !== "good" ? placeholder : helperText}
      </p>
    </div>
  );
});

export default TextInput;
