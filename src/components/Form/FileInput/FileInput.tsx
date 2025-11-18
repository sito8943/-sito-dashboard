import { ChangeEvent, ForwardedRef, forwardRef, useState } from "react";

// types
import { FileInputPropsType } from "./types";

// components
import { Chip, Close, File, State, Tooltip } from "components";

// styles
import "./styles.css";

// utils
import { truncateFileName } from "./utils";

export const FileInput = forwardRef(function (
  props: FileInputPropsType,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    children,
    state = State.default,
    label,
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    helperText = "",
    helperTextClassName = "",
    iconClassName = "",
    multiple = false,
    ...rest
  } = props;

  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selected]);
    }
    if (rest.onChange) rest.onChange(e);
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={`file-input-container ${containerClassName}`}>
      {files.length === 0 && (
        <label htmlFor={rest.name} className={`${labelClassName}`}>
          {label}
          <input
            type="file"
            ref={ref}
            multiple={multiple}
            onClick={(e) => {
              // Ensure re-opening and re-selecting the same file triggers onChange
              (e.currentTarget as HTMLInputElement).value = "";
            }}
            onChange={handleChange}
            className={`file-input ${inputClassName}`}
            {...rest}
          />
          {rest.required ? " *" : ""}
        </label>
      )}

      {files.length > 1 && (
        <ul className="file-preview-list">
          {files.map((file, i) => (
            <li key={i}>
              <Tooltip content={file.name}>
                <Chip
                  text={truncateFileName(file.name, 25)}
                  onDelete={() => handleRemove(i)}
                />
              </Tooltip>
            </li>
          ))}
        </ul>
      )}

      {files.length === 1 && (
        <div className="file-preview">
          <File className="file-icon" />
          <Tooltip content={files[0]?.name ?? ""} className="!cursor-default">
            <span>{truncateFileName(files[0]?.name ?? "", 25)}</span>
          </Tooltip>
          <button
            onClick={() => setFiles([])}
            className="chip-delete-button"
            type="button"
          >
            <Close />
          </button>
        </div>
      )}

      {children}
      {!!helperText && (
        <p className={`file-input-helper-text ${helperTextClassName}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});
