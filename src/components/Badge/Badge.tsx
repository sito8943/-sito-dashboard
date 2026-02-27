// styles
import "./styles.css";

// types
import { BadgePropsType } from "./types";

/**
 * Renders the Badge component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const Badge = (props: BadgePropsType) => {
  const { count, className = "" } = props;

  return <span className={`${className} badge-main`}>{count}</span>;
};
