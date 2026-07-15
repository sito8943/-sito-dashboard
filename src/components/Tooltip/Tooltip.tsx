// styles
import "./styles.css";

import { classNames } from "lib";
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

// types
import { TooltipPropsType } from "./types";

const GAP = 8;

/**
 * Renders the Tooltip component.
 * @param props - props parameter.
 * @returns Function result.
 */
export function Tooltip(props: TooltipPropsType) {
  const { content, children, className = "" } = props;

  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") hide();
    },
    [hide],
  );

  // Measure trigger + tooltip once visible, then center / clamp / flip.
  useLayoutEffect(() => {
    if (!visible) return;
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const t = trigger.getBoundingClientRect();
    const tip = tooltip.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Center horizontally over the trigger, clamp to viewport.
    let left = t.left + t.width / 2 - tip.width / 2;
    left = Math.max(GAP, Math.min(left, vw - tip.width - GAP));

    // Prefer above; flip below when there is no room.
    let top = t.top - tip.height - GAP;
    if (top < GAP) top = Math.min(t.bottom + GAP, vh - tip.height - GAP);

    setCoords({ top, left });
  }, [visible, content]);

  // Fixed coords don't track scroll/resize, so close the tooltip instead of
  // letting it drift away from its trigger.
  useEffect(() => {
    if (!visible) return;
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, [visible, hide]);

  const trigger = isValidElement(children) ? (
    // Wrapper is the measurement box + event surface. focus/blur bubble up
    // from the (interactive) child, so we add no extra tab stop here.
    <span
      ref={triggerRef}
      className="tooltip-trigger"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={handleKeyDown}
    >
      {cloneElement(
        children as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        {
          // describedby goes on the focused child so screen readers announce it.
          "aria-describedby": visible ? tooltipId : undefined,
        },
      )}
    </span>
  ) : (
    children
  );

  return (
    <>
      {trigger}
      {visible &&
        createPortal(
          <div
            id={tooltipId}
            role="tooltip"
            ref={tooltipRef}
            className={classNames("tooltip-text", className)}
            style={{ top: coords.top, left: coords.left }}
          >
            {content}
          </div>,
          document.body,
        )}
    </>
  );
}
