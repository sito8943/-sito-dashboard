// styles
import "./styles.css";

import { classNames } from "lib";
import { ForwardedRef, forwardRef } from "react";

// utils
import { inputStateClassName, labelStateClassName, State } from "../utils";
// types
import { CheckInputPropsType } from "./types";

/**
 * CheckInput
 * @param {object} props
 * @returns CheckInput component
 */
export const CheckInput = forwardRef(function (
  props: CheckInputPropsType,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    checked,
    onChange,
    name = "",
    id = "",
    label = "",
    state = State.default,
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    ...rest
  } = props;

  return (
    <label className={classNames("input-check-container", containerClassName)}>
      <input
        id={id}
        ref={ref}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={classNames(
          "input-check",
          inputStateClassName(state),
          inputClassName,
        )}
        {...rest}
      />
      <span
        className={classNames(
          "input-check-label",
          labelStateClassName(state),
          labelClassName,
        )}
      >
        {label}
      </span>
    </label>
  );
});
