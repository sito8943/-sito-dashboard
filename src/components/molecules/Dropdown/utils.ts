import { DROPDOWN_ANCHOR_OFFSET, DROPDOWN_VIEWPORT_MARGIN } from "./constants";
import { DropdownPositionType } from "./types";

/**
 * Computes a viewport-safe position for a dropdown anchored to an element.
 * @param anchor Bounding client rect of the anchor element.
 * @param dropdown Dropdown element used to calculate rendered dimensions.
 * @returns Top and left coordinates for fixed positioning.
 */
export function computeDropdownPosition(
  anchor: DOMRect,
  dropdown: HTMLElement,
): DropdownPositionType {
  const rect = dropdown.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let top = anchor.bottom + DROPDOWN_ANCHOR_OFFSET;
  let left = anchor.left;

  // Flip horizontally if overflows right edge.
  if (left + rect.width > viewportWidth - DROPDOWN_VIEWPORT_MARGIN) {
    left = anchor.right - rect.width;
  }

  // Clamp to left edge.
  if (left < DROPDOWN_VIEWPORT_MARGIN) {
    left = DROPDOWN_VIEWPORT_MARGIN;
  }

  // Flip vertically if not enough space below.
  if (top + rect.height > viewportHeight - DROPDOWN_VIEWPORT_MARGIN) {
    top = anchor.top - rect.height - DROPDOWN_ANCHOR_OFFSET;
  }

  // Clamp to top edge.
  if (top < DROPDOWN_VIEWPORT_MARGIN) {
    top = DROPDOWN_VIEWPORT_MARGIN;
  }

  return { top, left };
}
