import { useEffect, useRef } from "react";

// types
import { BadgePropsType } from "./types";

// styles
import "./styles.css";

export const Badge = (props: BadgePropsType) => {
  const { count, className = "" } = props;

  const spanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (spanRef.current?.parentNode)
      (spanRef.current?.parentNode as HTMLElement).style.position = "relative";
  }, [spanRef]);

  return (
    <span ref={spanRef} className={`${className} badge-main`}>
      {count}
    </span>
  );
};
