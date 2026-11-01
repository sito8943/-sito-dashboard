import { useLayoutEffect, useRef, useState } from "react";

import { DropdownPlacement, UseDropdownPlacementOptions } from "./types";
import {
  getClippingBounds,
  getCssMaxHeight,
  getNaturalListHeight,
  resolveDropdownPlacement,
} from "./utils";

const BELOW: DropdownPlacement = { side: "bottom", style: {} };

/**
 * Keeps an absolutely positioned dropdown list inside its clipping container
 * (e.g. a scrolling dialog): opens it upwards or shortens it when the space
 * below the anchor is not enough. Recomputes on scroll, resize and when
 * `contentKey` changes while open.
 * @param options - Anchor, list, open state and content key
 */
export const useDropdownPlacement = ({
  anchorRef,
  listRef,
  open,
  contentKey,
}: UseDropdownPlacementOptions): DropdownPlacement => {
  const [placement, setPlacement] = useState<DropdownPlacement>(BELOW);
  const cssMaxHeightRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      cssMaxHeightRef.current = null;
      setPlacement(BELOW);
      return;
    }

    const update = () => {
      const anchor = anchorRef.current;
      const list = listRef.current;
      if (!anchor || !list) return;

      // Read once per opening, before the inline max height overrides it.
      if (cssMaxHeightRef.current === null) {
        cssMaxHeightRef.current = getCssMaxHeight(list);
      }

      const next = resolveDropdownPlacement(
        anchor.getBoundingClientRect(),
        getClippingBounds(anchor),
        getNaturalListHeight(list, cssMaxHeightRef.current),
      );
      setPlacement((current) =>
        current.side === next.side &&
        current.style.maxHeight === next.style.maxHeight
          ? current
          : next,
      );
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [anchorRef, listRef, open, contentKey]);

  return placement;
};
