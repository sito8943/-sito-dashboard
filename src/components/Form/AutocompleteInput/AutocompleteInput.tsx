import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// @emotion/css
import { css } from "@emotion/css";

// components
import { Close, TextInput, Chip, Option } from "components";

// types
import { AutocompleteInputPropsType } from "./types";

// styles
import "./styles.css";

/**
 *
 * @param {object} props
 * @returns
 */
export const AutocompleteInput = forwardRef(function (
  props: AutocompleteInputPropsType,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    state,
    value,
    onChange,
    options = [],
    name = "",
    id = "",
    label = "",
    containerClassName = "",
    inputContainerClassName = "",
    helperText = "",
    placeholder = "",
    multiple = false,
    ...rest
  } = props;

  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = options.filter((option) => {
    const isIncluded = String(option.value)
      .toLowerCase()
      .includes(inputValue?.toLowerCase());
    if (value && value.length) {
      const toShow = value?.some
        ? !value?.some((v: Option) => v.id === option.id)
        : value?.id !== option.id;
      return toShow;
    }
    return isIncluded;
  });

  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const localInputRef = useRef<HTMLInputElement | null>(null);

  const [threeDots, setThreeDots] = useState(false);
  const multipleValueRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowSuggestions(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = useCallback(
    (suggestion?: Option) => {
      setInputValue("");
      if (!suggestion) onChange(null);
      else {
        if (multiple)
          Array.isArray(value) && !!value.length
            ? onChange([...value, suggestion])
            : onChange([suggestion]);
        else onChange(suggestion);
      }
      setShowSuggestions(false);
    },
    [multiple, onChange, value]
  );

  const handleDeleteChip = useCallback(
    (index?: number) => {
      if (index != null) {
        const newValue = value.filter((_: Option, i: number) => i !== index);
        if (newValue.length) onChange(newValue);
        else onChange(null);
      } else onChange(null);
    },
    [onChange, value]
  );

  useEffect(() => {
    const valueWidth = multipleValueRef.current?.offsetWidth ?? 0;
    const parentWidth =
      ((ref ?? localInputRef) as MutableRefObject<HTMLInputElement | null>)
        ?.current?.offsetWidth ?? 0;

    if (valueWidth > parentWidth * 0.4) setThreeDots(true);
    else setThreeDots(false);
  }, [value]);

  return (
    <div
      className={`autocomplete-input-container ${containerClassName}`}
      ref={autocompleteRef}
    >
      <div className="autocomplete-value-input-container">
        <TextInput
          state={state}
          name={name}
          id={id}
          value={!multiple && value ? (value.value ?? value.name) : inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          helperText={helperText}
          onFocus={() => setShowSuggestions(true)}
          label={label}
          containerClassName={`autocomplete-text-input ${inputContainerClassName}`}
          ref={ref ?? localInputRef}
          {...rest}
        >
          {(value?.value || value?.name) && !multiple && (
            <button
              type="button"
              className="autocomplete-delete-button"
              onClick={(e) => {
                handleSuggestionClick();
                e.stopPropagation();
              }}
            >
              <Close />
            </button>
          )}
        </TextInput>
        {multiple && Array.isArray(value) && value.length ? (
          <ul ref={multipleValueRef} className={`autocomplete-value-container`}>
            {!threeDots ? (
              value.map((selected: Option, i: number) => (
                <li key={selected.id ?? selected.value ?? selected.name}>
                  <Chip
                    label={String(selected.value ?? selected.name)}
                    onDelete={(e) => {
                      handleDeleteChip(i);
                      e.stopPropagation();
                    }}
                  />
                </li>
              ))
            ) : (
              <>
                <li>
                  <Chip
                    label={value[0]?.value ?? value[0]?.name}
                    onDelete={(e) => {
                      handleDeleteChip(0);
                      e.stopPropagation();
                    }}
                  />
                </li>
                {value.length > 1 && (
                  <li>
                    <Chip
                      label={`+${value.length - 1}`}
                      onDelete={(e) => {
                        handleDeleteChip();
                        e.stopPropagation();
                      }}
                    />
                  </li>
                )}
              </>
            )}
          </ul>
        ) : null}
      </div>
      {showSuggestions && (
        <ul
          className={`autocomplete-suggestions-container ${css({ width: autocompleteRef.current?.offsetWidth })}`}
        >
          {suggestions.map((suggestion) => (
            <li
              className="autocomplete-suggestion-item"
              onClick={(e) => {
                handleSuggestionClick(suggestion);
                e.stopPropagation();
              }}
              key={suggestion.id ?? suggestion.value ?? suggestion.name}
            >
              {suggestion.value ?? suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
