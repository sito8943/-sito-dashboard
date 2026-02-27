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
import { SelectInputPropsType } from "./types";

/**
 *
 * @param {object} props
 * @returns
 */
export const SelectInput = forwardRef(function (
  props: SelectInputPropsType,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const {
    value,
    onChange,
    options,
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    helperText = "",
    helperTextClassName = "",
    label = "",
    name = "",
    id = "",
    state = State.default,
    children,
    ...rest
  } = props;

  return (
    <div className={`select-input-container ${containerClassName}`}>
      <select
        {...rest}
        id={id}
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        className={`select-input ${inputStateClassName(state)} peer ${inputClassName}`}
      >
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value ?? option.name ?? option.id}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`select-input-label ${labelStateClassName(state)} ${labelClassName}`}
      >
        {label}
      </label>
      {children}
      {helperText && (
        <p
          className={`select-input-helper-text ${helperTextStateClassName(state)} ${helperTextClassName}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});
