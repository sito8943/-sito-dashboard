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

/**
 *
 * @param {object} props
 * @returns
 */
const SelectInput = forwardRef(function (
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
    <div className={`relative z-0 w-full mb-5 group ${containerClassName}`}>
      <select
        {...rest}
        id={id}
        ref={ref}
        name={name}
        value={value}
        onChange={onChange}
        className={`block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 disabled:text-[#6b7280] ${inputStateClassName(state)} peer ${inputClassName}`}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
      <label
        htmlFor={name}
        className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${labelStateClassName(state)} ${labelClassName}`}
      >
        {label}
      </label>
      <p
        className={`mt-2 text-sm ${helperTextStateClassName(state)} ${helperTextClassName}`}
      >
        {state !== "error" && state !== "good" ? placeholder : helperText}
      </p>
    </div>
  );
});

export default SelectInput;
