import { BadgePropsType } from "./types";

export const Badge = (props: BadgePropsType) => {
  const { count, className = "" } = props;

  return <span className={`${className} badge-main`}>{count}</span>;
};
