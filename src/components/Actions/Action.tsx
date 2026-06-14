// lib
import { BaseDto, classNames } from "lib";

// types
import { ActionPropsType } from "./types";

/**
 * Renders a single action button with optional icon, tooltip, and label.
 * @param props - Component props.
 * @param props.id - Unique identifier for the button element.
 * @param props.icon - Icon rendered inside the button.
 * @param props.tooltip - Accessible label shown as a tooltip or as visible text when `showText` is true.
 * @param props.onClick - Callback fired when the button is clicked.
 * @param props.children - Optional child elements rendered inside the button.
 * @param props.hidden - When `true`, the button is not rendered. Defaults to `false`.
 * @param props.disabled - When `true`, the button is disabled. Defaults to `false`.
 * @param props.showText - When `true`, `tooltip` is rendered as visible text next to the icon. Defaults to `false`.
 * @param props.className - Additional CSS class applied to the button.
 * @param props.stopPropagation - When `true`, `event.stopPropagation()` is called on click, preventing the event from bubbling to parent handlers. Defaults to `false`.
 * @returns The action button element, or `null` when `hidden` is `true`.
 */
export function Action<TEntity extends BaseDto>(
  props: ActionPropsType<TEntity>,
) {
  const {
    id,
    icon,
    tooltip,
    onClick,
    children,
    hidden = false,
    disabled = false,
    showText = false,
    className = "",
    stopPropagation = false,
    "aria-describedby": ariaDescribedBy,
  } = props;

  return !hidden ? (
    <button
      type="button"
      id={id}
      className={classNames(
        "action",
        showText ? "text-action" : "icon-action",
        className,
      )}
      disabled={disabled}
      aria-label={tooltip}
      aria-describedby={ariaDescribedBy}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        onClick?.();
      }}
      aria-disabled={disabled}
    >
      {icon} {showText && tooltip}
      {children}
    </button>
  ) : null;
}
