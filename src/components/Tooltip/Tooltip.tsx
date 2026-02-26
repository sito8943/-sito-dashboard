// react
// styles
import "./styles.css";

import { useId } from "react";

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

  return (
    <div
      className={`tooltip-container ${className}`}
      aria-describedby={tooltipId}
    >
      {children}
      <div id={tooltipId} role="tooltip" className="tooltip-text">
        {content}
      </div>
    </div>
  );
}
