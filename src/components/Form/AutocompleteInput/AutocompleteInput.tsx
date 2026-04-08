// styles
import "./styles.css";

// components
import { Chip, Close, IconButton, Option, TextInput } from "components";
// lib
import { classNames } from "lib";
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  KeyboardEvent as ReactKeyboardEvent,
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
  const [highlightedSuggestionIndex, setHighlightedSuggestionIndex] =
    useState(-1);

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

  useEffect(() => {
    if (!showSuggestions || !suggestions.length) {
      setHighlightedSuggestionIndex(-1);
      return;
    }
    setHighlightedSuggestionIndex(0);
  }, [showSuggestions, suggestions]);

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

    const handleEscape = (e: globalThis.KeyboardEvent) => {
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

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (!suggestions.length) {
        if (event.key === "Escape") {
          setShowSuggestions(false);
        }
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!showSuggestions) {
          setShowSuggestions(true);
          setHighlightedSuggestionIndex(0);
          return;
        }
        setHighlightedSuggestionIndex((currentIndex) => {
          const baseIndex = currentIndex >= 0 ? currentIndex : 0;
          if (event.key === "ArrowDown") {
            return (baseIndex + 1 + suggestions.length) % suggestions.length;
          }
          return (baseIndex - 1 + suggestions.length) % suggestions.length;
        });
        return;
      }

      if (event.key === "Enter" && showSuggestions) {
        event.preventDefault();
        const index =
          highlightedSuggestionIndex >= 0 ? highlightedSuggestionIndex : 0;
        handleSuggestionClick(suggestions[index]);
        return;
      }

      if (event.key === "Escape" && showSuggestions) {
        event.preventDefault();
        setShowSuggestions(false);
      }
    },
    [
      handleSuggestionClick,
      highlightedSuggestionIndex,
      showSuggestions,
      suggestions,
    ],
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
      className={classNames("autocomplete-input-container", containerClassName)}
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
          onKeyDown={handleKeyDown}
          label={label}
          containerClassName={classNames(
            "autocomplete-text-input",
            inputContainerClassName,
          )}
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
              className={classNames(
                "autocomplete-suggestion-item",
                suggestion.id === suggestions[highlightedSuggestionIndex]?.id
                  ? "highlighted"
                  : "",
              )}
              onMouseEnter={() =>
                setHighlightedSuggestionIndex(
                  suggestions.findIndex((item) => item.id === suggestion.id),
                )
              }
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
