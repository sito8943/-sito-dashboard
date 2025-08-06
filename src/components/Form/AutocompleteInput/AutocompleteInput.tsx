import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
    (index: number) => {
      const newValue = value.filter((_: Option, i: number) => i !== index);
      if (newValue.length) onChange(newValue);
      else onChange(null);
    },
    [onChange, value]
  );

  return (
    <div
      className={`autocomplete-input-container ${containerClassName}`}
      ref={autocompleteRef}
    >
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
        ref={ref}
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
      {showSuggestions && (
        <ul className="autocomplete-suggestions-container">
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
      {multiple && Array.isArray(value) && value.length ? (
        <ul className="autocomplete-value-container">
          {value.map((selected: Option, i: number) => (
            <li key={selected.id ?? selected.value ?? selected.name}>
              <Chip
                label={String(selected.value ?? selected.name)}
                onDelete={(e) => {
                  handleDeleteChip(i);
                  e.stopPropagation();
                }}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
