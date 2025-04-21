import { HTMLAttributes } from "react";

// types
interface TooltipPropsType extends HTMLAttributes<HTMLDivElement> {
  content: string;
  children: React.ReactNode;
}

export function Tooltip(props: TooltipPropsType) {
  const { content, children } = props;

  return (
    <div className="tooltip-container">
      {children}
      <div className="tooltip-text">{content}</div>
    </div>
  );
}
