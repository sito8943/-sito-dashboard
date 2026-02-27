// styles
import "./styles.css";

// components
import { Chip, Close, IconButton, Option, TextInput } from "components";
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

// types
import { AutocompleteInputPropsType } from "./types";

/**
 * Text input with autocomplete suggestions, supporting single and multiple selection.
 * @param props - Component props
 * @param ref - Forwarded ref to the underlying input element
 */
export const AutocompleteInput = forwardRef(function (
  props: AutocompleteInputPropsType,
  ref: ForwardedRef<HTMLInputElement>,
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

  useEffect(() => {
    if (!multiple && value && !Array.isArray(value)) {
      setInputValue(String(value.value ?? value.name ?? ""));
      return;
    }
    setInputValue("");
  }, [multiple, value]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = useMemo(
    () =>
      options.filter((option) => {
        const isIncluded = String(option.value ?? option.name)
          .toLowerCase()
          .includes(inputValue?.toLowerCase());

        if (Array.isArray(value) && value.length) {
          return (
            isIncluded && !value.some((selected) => selected.id === option.id)
          );
        }

        if (value && !Array.isArray(value)) {
          return isIncluded && value.id !== option.id;
        }

        return isIncluded;
      }),
    [options, value, inputValue],
  );

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

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion?: Option) => {
      if (!suggestion) onChange(null);
      else {
        if (multiple) {
          setInputValue("");
          if (Array.isArray(value) && !!value.length)
            onChange([...value, suggestion]);
          else onChange([suggestion]);
        } else {
          setInputValue(String(suggestion.name ?? suggestion.value ?? ""));
          onChange(suggestion);
        }
      }
      setShowSuggestions(false);
    },
    [multiple, onChange, value],
  );

  const handleDeleteChip = useCallback(
    (index: number) => {
      if (!Array.isArray(value)) {
        onChange(null);
        return;
      }
      const newValue = value.filter((_, i) => i !== index);
      if (newValue.length) onChange(newValue);
      else onChange(null);
    },
    [onChange, value],
  );

  const handleTrimToFirst = useCallback(() => {
    if (!Array.isArray(value)) return;
    onChange([value[0]]);
  }, [onChange, value]);

  useLayoutEffect(() => {
    const valueWidth = multipleValueRef.current?.offsetWidth ?? 0;
    const parentWidth = autocompleteRef.current?.offsetWidth ?? 0;
    setThreeDots(valueWidth > parentWidth * 0.4);
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
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          helperText={helperText}
          onFocus={() => setShowSuggestions(true)}
          label={label}
          containerClassName={`autocomplete-text-input ${inputContainerClassName}`}
          ref={ref ?? localInputRef}
          {...rest}
        >
          {!multiple &&
            value &&
            !Array.isArray(value) &&
            (value.value || value.name) && (
              <IconButton
                icon={<Close />}
                className="autocomplete-delete-button"
                onClick={(e) => {
                  handleSuggestionClick();
                  e.stopPropagation();
                }}
              />
            )}
        </TextInput>
        {multiple && Array.isArray(value) && value.length ? (
          <ul ref={multipleValueRef} className="autocomplete-value-container">
            {!threeDots ? (
              value.map((selected: Option, i: number) => (
                <li key={selected.id ?? selected.value ?? selected.name}>
                  <Chip
                    text={String(selected.value ?? selected.name)}
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
                    text={value[0]?.value ?? value[0]?.name}
                    onDelete={(e) => {
                      handleDeleteChip(0);
                      e.stopPropagation();
                    }}
                  />
                </li>
                {value.length > 1 && (
                  <li>
                    <Chip
                      text={`+${value.length - 1}`}
                      onDelete={(e) => {
                        handleTrimToFirst();
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
          className="autocomplete-suggestions-container"
          style={{ width: autocompleteRef.current?.offsetWidth }}
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
