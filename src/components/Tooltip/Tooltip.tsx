// styles
import "./styles.css";

// types
import { TooltipPropsType } from "./types";

/**
 *
 * @param props
 */
export function Tooltip(props: TooltipPropsType) {
  const { content, children, className = "" } = props;

  return (
    <div className={`tooltip-container ${className}`}>
      {children}
      <div className="tooltip-text">{content}</div>
    </div>
  );
}
