// styles
import "./styles.css";

// components
import { Chip, Close, File, IconButton, Tooltip } from "components";
// lib
import { classNames } from "lib";
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useCallback,
  useState,
} from "react";

// types
import { FileInputPropsType } from "./types";
// utils
import { truncateFileName } from "./utils";

/**
 * Renders a file input with preview and clear/remove actions.
 */
export const FileInput = forwardRef(function (
  props: FileInputPropsType,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const {
    children,
    label,
    containerClassName = "",
    inputClassName = "",
    labelClassName = "",
    helperText = "",
    helperTextClassName = "",
    iconClassName = "",
    multiple = false,
    onChange,
    onClear,
    ...rest
  } = props;

  const [files, setFiles] = useState<File[]>([]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selected = Array.from(e.target.files);
        setFiles((prev) =>
          multiple ? [...prev, ...selected] : selected.slice(0, 1),
        );
      }
      onChange?.(e);
    },
    [multiple, onChange],
  );

  const handleRemove = useCallback(
    (index: number) => {
      setFiles((prev) => {
        const next = prev.filter((_, i) => i !== index);
        if (next.length === 0) onClear?.();
        return next;
      });
    },
    [onClear],
  );

  const handleClear = useCallback(() => {
    setFiles([]);
    onClear?.();
  }, [onClear]);

  const handleInputClick = useCallback(
    (e: React.MouseEvent<HTMLInputElement>) => {
      // Ensure re-opening and re-selecting the same file triggers onChange
      (e.currentTarget as HTMLInputElement).value = "";
    },
    [],
  );

  return (
    <div className={classNames("file-input-container", containerClassName)}>
      {files.length === 0 && (
        <label htmlFor={rest.id} className={classNames(labelClassName)}>
          {label}
          <input
            type="file"
            ref={ref}
            multiple={multiple}
            onClick={handleInputClick}
            onChange={handleChange}
            className={classNames("file-input", inputClassName)}
            {...rest}
          />
          {rest.required ? " *" : ""}
        </label>
      )}

      {files.length > 1 && (
        <ul className="file-preview-list">
          {files.map((file, i) => (
            <li key={`${file.name}-${file.lastModified}`}>
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
          <File className={classNames("file-icon", iconClassName)} />
          <Tooltip content={files[0]?.name ?? ""}>
            <span className="file-preview-name">
              {truncateFileName(files[0]?.name ?? "", 25)}
            </span>
          </Tooltip>
          <IconButton icon={<Close />} onClick={handleClear} type="button" />
        </div>
      )}

      {children}
      {!!helperText && (
        <p
          className={classNames("file-input-helper-text", helperTextClassName)}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});
