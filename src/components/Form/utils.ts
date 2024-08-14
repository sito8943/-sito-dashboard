export enum State {
  error = "error",
  good = "good",
  default = "default",
}

/**
 * Input State Class Name
 * @param {string} state - input state
 * @returns input class name by
 */
export const inputStateClassName = (state: State) => {
  switch (state) {
    case State.error:
      return "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500";
    case State.good:
      return "border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500";
    default:
      return "text-gray-900 border-gray-300 focus:border-blue-600";
  }
};

/**
 * Label State Class Name
 * @param {string} state - input state
 * @returns input class name by
 */
export const labelStateClassName = (state: State) => {
  switch (state) {
    case State.error:
      return "peer-focus:text-red-700 text-red-700";
    case State.good:
      return "peer-focus:text-green-700 text-green-700";
    default:
      return "peer-focus:text-blue-600 text-gray-500";
  }
};

/**
 * Helper Text State Class Name
 * @param {string} state - input state
 * @returns input class name by
 */
export const helperTextStateClassName = (state: State) => {
  switch (state) {
    case State.error:
      return "text-red-600";
    case State.good:
      return "text-green-600";
    default:
      return "text-gray-500";
  }
};
