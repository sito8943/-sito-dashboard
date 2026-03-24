// styles
import "./styles.css";

import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { TextInput } from "../TextInput";
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
    placeholder = "",
    name = "",
    id = "",
    state = State.default,
    native = true,
    disabled,
    required,
    autoFocus,
    children,
    ...rest
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const selectedIndex = useMemo(
    () =>
      options.findIndex(
        (option) => String(option.id) === String(value ?? options[0]?.id ?? ""),
      ),
    [options, value],
  );

  const selectedOption = useMemo(
    () => (selectedIndex >= 0 ? options[selectedIndex] : undefined),
    [options, selectedIndex],
  );

  useEffect(() => {
    if (native || !showOptions) return;
    if (!options.length) {
      setHighlightedIndex(-1);
      return;
    }
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [native, options.length, selectedIndex, showOptions]);

  useEffect(() => {
    if (native) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [native]);

  const syncForwardedRef = useCallback(
    (element: HTMLSelectElement | null) => {
      if (!ref) return;
      if (typeof ref === "function") ref(element);
      else ref.current = element;
    },
    [ref],
  );

  const emitChange = useCallback(
    (nextValue: string | number) => {
      if (!onChange) return;
      const event = {
        target: { value: String(nextValue) },
        currentTarget: { value: String(nextValue) },
      } as ChangeEvent<HTMLSelectElement>;
      onChange(event);
    },
    [onChange],
  );

  const selectOption = useCallback(
    (index: number) => {
      const option = options[index];
      if (!option) return;
      emitChange(option.id);
      setShowOptions(false);
    },
    [emitChange, options],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (!options.length) return;

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!showOptions) {
          setShowOptions(true);
          const fallback = selectedIndex >= 0 ? selectedIndex : 0;
          setHighlightedIndex(fallback);
          return;
        }
        setHighlightedIndex((currentIndex) => {
          const baseIndex = currentIndex >= 0 ? currentIndex : selectedIndex;
          if (event.key === "ArrowDown") {
            return (baseIndex + 1 + options.length) % options.length;
          }
          return (baseIndex - 1 + options.length) % options.length;
        });
        return;
      }

      if (event.key === "Enter") {
        if (!showOptions) {
          event.preventDefault();
          setShowOptions(true);
          setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
          return;
        }
        event.preventDefault();
        selectOption(highlightedIndex >= 0 ? highlightedIndex : 0);
        return;
      }

      if (event.key === "Escape" && showOptions) {
        event.preventDefault();
        setShowOptions(false);
      }
    },
    [highlightedIndex, options, selectOption, selectedIndex, showOptions],
  );

  if (!native) {
    return (
      <div
        ref={containerRef}
        className={`select-input-container ${containerClassName}`}
      >
        <select
          {...rest}
          ref={syncForwardedRef}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          className="select-input-native-hidden"
          tabIndex={-1}
          aria-hidden
        >
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.value ?? option.name ?? option.id}
            </option>
          ))}
        </select>
        <TextInput
          id={id}
          name={name}
          state={state}
          value={String(selectedOption?.value ?? selectedOption?.name ?? "")}
          readOnly
          label={label}
          helperText={helperText}
          containerClassName="select-input-text-container"
          inputClassName={`select-input-text ${inputClassName}`}
          labelClassName={labelClassName}
          helperTextClassName={helperTextClassName}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoFocus={autoFocus}
          onClick={() => setShowOptions((open) => !open)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowOptions(true)}
          role="combobox"
          aria-expanded={showOptions}
          aria-haspopup="listbox"
        >
          {children}
        </TextInput>
        {showOptions && (
          <ul className="select-input-options-container" role="listbox">
            {options.map((option, index) => {
              const isSelected = String(option.id) === String(value);
              const isHighlighted = index === highlightedIndex;
              return (
                <li
                  key={option.id}
                  role="option"
                  aria-selected={isSelected}
                  className={`select-input-option-item ${isHighlighted ? "highlighted" : ""}`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={(event) => {
                    selectOption(index);
                    event.stopPropagation();
                  }}
                >
                  {option.value ?? option.name ?? option.id}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className={`select-input-container ${containerClassName}`}>
      <select
        {...rest}
        id={id}
        ref={syncForwardedRef}
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
