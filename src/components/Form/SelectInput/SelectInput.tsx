import { ForwardedRef, forwardRef, useEffect } from "react";

// utils
import {
  inputStateClassName,
  labelStateClassName,
  helperTextStateClassName,
  State,
} from "../utils";

// types
import { SelectInputPropsType } from "./types";

// styles
import "./styles.css";

/**
 *
 * @param {object} props
 * @returns
 */
export const SelectInput = forwardRef(function (
  props: SelectInputPropsType,
  ref: ForwardedRef<HTMLSelectElement> | ForwardedRef<HTMLSelectElement>
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
    placeholder = "",
    label = "",
    name = "",
    id = "",
    state = State.default,
    ...rest
  } = props;

  // setting default value
  useEffect(() => {
    if ((!value || value === "") && options?.length)
      onChange({ target: { value: options[0]?.id } });
  }, [onChange, options, value]);

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
            {option.value}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`select-input-label ${labelStateClassName(state)} ${labelClassName}`}
      >
        {label}
      </label>
      <p
        className={`select-input-helper-text ${helperTextStateClassName(state)} ${helperTextClassName}`}
      >
        {state !== "error" && state !== "good" ? placeholder : helperText}
      </p>
    </div>
  );
});
