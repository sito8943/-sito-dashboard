import { ForwardedRef, forwardRef } from "react";

// types
import { CheckInputPropsType } from "./types";

// utils
import { State } from "../utils";

// styles
import "./styles.css";

/**
 * CheckInput
 * @param {object} props
 * @returns CheckInput component
 */
export const CheckInput = forwardRef(function (
  props: CheckInputPropsType,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    checked,
    onChange,
    state = State.default,
    name = "",
    id = "",
    type = "text",
    label = "",
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    helperText = "",
    helperTextClassName = "",
    ...rest
  } = props;

  return (
    <label className={`input-check-container ${containerClassName}`}>
      <input
        id={id}
        ref={ref}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`input-check ${inputClassName}`}
        {...rest}
      />
      <span className={`input-check-label ${labelClassName}`}>{label}</span>
    </label>
  );
});
