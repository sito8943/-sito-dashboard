import { CSSProperties, RefObject } from "react";

/** Side of the anchor where a dropdown list opens. */
export type DropdownSide = "bottom" | "top";

export interface DropdownBounds {
  top: number;
  bottom: number;
}

export interface UseDropdownPlacementOptions {
  /** Element the list hangs from (the input box). */
  anchorRef: RefObject<HTMLElement | null>;
  /** The rendered list. */
  listRef: RefObject<HTMLElement | null>;
  /** Whether the list is open. */
  open: boolean;
  /** Changes when the list content changes (e.g. option count), to measure again. */
  contentKey?: string | number;
}

export interface DropdownPlacement {
  side: DropdownSide;
  /** Inline styles for the list: opening side and, when space is short, max height. */
  style: CSSProperties;
}
