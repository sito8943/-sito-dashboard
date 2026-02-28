// react
// styles
import "./styles.css";

import {
  cloneElement,
  isValidElement,
  useCallback,
  useId,
  useRef,
} from "react";

// types
import { TooltipPropsType } from "./types";

/**
 * Renders the Tooltip component.
 * @param props - props parameter.
 * @returns Function result.
 */
export function Tooltip(props: TooltipPropsType) {
  const { content, children, className = "" } = props;

  const tooltipId = useId();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    const tooltip = tooltipRef.current;
    if (!tooltip) return;

    // Reset to CSS default so we can measure the natural position
    tooltip.style.transform = "";

    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    if (rect.left < 0) {
      tooltip.style.transform = `translateX(calc(-50% + ${Math.ceil(-rect.left)}px))`;
    } else if (rect.right > viewportWidth) {
      tooltip.style.transform = `translateX(calc(-50% - ${Math.ceil(rect.right - viewportWidth)}px))`;
    }
  }, []);

  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement, {
        "aria-describedby": tooltipId,
      })
    : children;

  return (
    <div
      className={`tooltip-container ${className}`}
      onMouseEnter={handleMouseEnter}
    >
      {trigger}
      <div
        id={tooltipId}
        role="tooltip"
        className="tooltip-text"
        ref={tooltipRef}
      >
        {content}
      </div>
    </div>
  );
}
