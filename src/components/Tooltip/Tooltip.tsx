// react
// styles
import "./styles.css";

import { cloneElement, isValidElement, useId } from "react";

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

  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement, {
        "aria-describedby": tooltipId,
      })
    : children;

  return (
    <div className={`tooltip-container ${className}`}>
      {trigger}
      <div id={tooltipId} role="tooltip" className="tooltip-text">
        {content}
      </div>
    </div>
  );
}
