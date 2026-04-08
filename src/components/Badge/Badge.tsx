// styles
import "./styles.css";

// lib
import { classNames } from "lib";

// types
import { BadgePropsType } from "./types";

/**
 * Renders the Badge component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const Badge = (props: BadgePropsType) => {
  const { count, className = "" } = props;

  return <span className={classNames("badge-main", className)}>{count}</span>;
};
