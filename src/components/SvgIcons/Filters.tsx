import { IconProps } from "./types";

/**
 *
 * @param props
 */
export const Filters = (props: IconProps) => {
  const { className = "" } = props;

  return (
    <svg className={className} viewBox="0 0 16 16">
      <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
    </svg>
  );
};
