// styles
import "./styles.css";

// types
import { LoadingPropsType } from "./types";

/**
 * Loading
 * @param {object} props - Props
 * @returns Loading component
 */
export function Loading(props: LoadingPropsType) {
  const {
    color = "stroke-blue-800",
    className = "",
    loaderClass = "",
    strokeWidth = "4",
    ...rest
  } = props;

  return (
    <div {...rest} className={`loading ${className}`}>
      <div className="loader-container">
        <div className={`loader ${loaderClass}`}>
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className={`path ${color}`}
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth={strokeWidth}
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
