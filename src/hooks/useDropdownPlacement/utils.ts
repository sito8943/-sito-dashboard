import { DROPDOWN_EDGE_MARGIN } from "./constants";
import { DropdownBounds, DropdownPlacement } from "./types";

const CLIPPING_OVERFLOW = /(auto|scroll|hidden|clip)/;

/**
 * Visible vertical area for an element: the viewport intersected with every
 * ancestor that clips its overflow (scrolling dialogs, panels, ...).
 * @param element - Element whose clipping area is needed
 */
export const getClippingBounds = (element: HTMLElement): DropdownBounds => {
  const bounds: DropdownBounds = { top: 0, bottom: window.innerHeight };

  let parent = element.parentElement;
  while (parent && parent !== document.body) {
    const { overflowY } = window.getComputedStyle(parent);
    if (CLIPPING_OVERFLOW.test(overflowY)) {
      const rect = parent.getBoundingClientRect();
      bounds.top = Math.max(bounds.top, rect.top);
      bounds.bottom = Math.min(bounds.bottom, rect.bottom);
    }
    parent = parent.parentElement;
  }

  return bounds;
};

/**
 * Height the list would take without an inline max height: its content height
 * capped by the max height from its CSS.
 * @param list - Rendered list
 * @param cssMaxHeight - Max height from the stylesheet, in px
 */
export const getNaturalListHeight = (
  list: HTMLElement,
  cssMaxHeight: number,
): number => {
  const borders = list.offsetHeight - list.clientHeight;
  return Math.min(list.scrollHeight + borders, cssMaxHeight);
};

/**
 * Max height a list gets from its stylesheet (Infinity when unset).
 * Read it before the hook applies an inline max height.
 * @param list - Rendered list
 */
export const getCssMaxHeight = (list: HTMLElement): number => {
  const value = Number.parseFloat(window.getComputedStyle(list).maxHeight);
  return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY;
};

/**
 * Chooses where a list fits: below when it fits, otherwise the side with more
 * room, capping the height to the available space.
 * @param anchor - Anchor rect (top/bottom in viewport coordinates)
 * @param bounds - Visible area from `getClippingBounds`
 * @param listHeight - Natural list height, already capped by its CSS max height
 */
export const resolveDropdownPlacement = (
  anchor: DropdownBounds,
  bounds: DropdownBounds,
  listHeight: number,
): DropdownPlacement => {
  const spaceBelow = bounds.bottom - anchor.bottom - DROPDOWN_EDGE_MARGIN;
  const spaceAbove = anchor.top - bounds.top - DROPDOWN_EDGE_MARGIN;

  if (listHeight <= spaceBelow) return { side: "bottom", style: {} };

  const opensUp = spaceAbove > spaceBelow;
  const side = opensUp ? "top" : "bottom";
  const space = Math.max(opensUp ? spaceAbove : spaceBelow, 0);
  const maxHeight = listHeight > space ? space : undefined;

  return {
    side,
    style: {
      ...(opensUp ? { top: "auto", bottom: "100%" } : {}),
      ...(maxHeight !== undefined ? { maxHeight } : {}),
    },
  };
};
