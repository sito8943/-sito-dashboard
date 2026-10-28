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
      return "input-error";
    case State.good:
      return "input-good";
    default:
      return "input-normal";
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
      return "input-label-error";
    case State.good:
      return "input-label-good";
    default:
      return "input-label-normal";
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
      return "input-helper-text-error";
    case State.good:
      return "input-helper-text-good";
    default:
      return "input-helper-text-normal";
  }
};
