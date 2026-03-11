// styles
import "./styles.css";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

// types
import { DropdownPropsType } from "./types";

const MARGIN = 8;

function computePosition(
  anchor: DOMRect,
  dropdown: HTMLElement,
): { top: number; left: number } {
  const rect = dropdown.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top = anchor.bottom + 4;
  let left = anchor.left;

  // Flip horizontally if overflows right edge
  if (left + rect.width > vw - MARGIN) {
    left = anchor.right - rect.width;
  }

  // Clamp to left edge
  if (left < MARGIN) left = MARGIN;

  // Flip vertically if not enough space below
  if (top + rect.height > vh - MARGIN) {
    top = anchor.top - rect.height - 4;
  }

  // Clamp to top edge
  if (top < MARGIN) top = MARGIN;

  return { top, left };
}

/**
 * Renders the Dropdown component.
 * @param props - props parameter.
 * @returns Function result.
 */
export const Dropdown = (props: DropdownPropsType) => {
  const { children, open, onClose, anchorEl } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Compute and set position before the browser paints to avoid flicker
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!open || !anchorEl || !el) return;

    const anchor = anchorEl.getBoundingClientRect();
    const { top, left } = computePosition(anchor, el);
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
  }, [open, anchorEl]);

  // Reposition on window resize while open
  useEffect(() => {
    if (!open || !anchorEl) return;
    const el = containerRef.current;
    if (!el) return;

    const onResize = () => {
      const anchor = anchorEl.getBoundingClientRect();
      const { top, left } = computePosition(anchor, el);
      el.style.top = `${top}px`;
      el.style.left = `${left}px`;
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, anchorEl]);

  const handlePointerDown = useCallback(
    (e: MouseEvent) => {
      const el = containerRef.current;
      if (!open || !el) return;
      // Ignore clicks on the trigger element so toggle logic on the trigger works correctly
      if (anchorEl?.contains(e.target as Node)) return;
      if (!el.contains(e.target as Node)) onClose();
    },
    [open, onClose, anchorEl],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    },
    [open, onClose],
  );

  useEffect(() => {
    if (!open) return;
    setTimeout(() => containerRef.current?.focus(), 0);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handlePointerDown, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      ref={containerRef}
      role="menu"
      tabIndex={-1}
      className="dropdown-main opened"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>,
    document.body,
  );
};
