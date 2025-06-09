// styles
import "./styles.css";

// types
import { TooltipPropsType } from "./types";

export function Tooltip(props: TooltipPropsType) {
  const { content, children } = props;

  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-text">{content}</div>
    </div>
  );
}
