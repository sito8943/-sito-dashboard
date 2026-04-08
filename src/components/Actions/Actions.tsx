// styles
import "./styles.css";

// lib
import { BaseDto, classNames } from "lib";

// components
import { Action } from "./Action";
// types
import { ActionsContainerPropsType } from "./types";

/**
 * Renders a list of {@link Action} buttons from an array of action definitions.
 * @param props - Component props.
 * @param props.actions - Array of action definitions to render. Defaults to `[]`.
 * @param props.className - Additional CSS class applied to the `<ul>` container.
 * @param props.itemClassName - Additional CSS class applied to each `<li>` item.
 * @param props.actionClassName - Additional CSS class applied to each `Action` button.
 * @param props.showTooltips - Whether to show tooltips on each action. Defaults to `true`.
 * @param props.showActionTexts - Whether to render the action label as visible text. Defaults to `false`.
 * @returns A `<ul>` element containing one `<li>` per action.
 */
export function Actions<TRow extends BaseDto>(
  props: ActionsContainerPropsType<TRow>,
) {
  const {
    actions = [],
    className = "",
    itemClassName = "",
    actionClassName = "",
    showTooltips = true,
    showActionTexts = false,
  } = props;
  return (
    <ul className={classNames("actions-container", className)}>
      {actions.map((action) => (
        <li
          key={action.id}
          className={classNames("actions-container-item", itemClassName)}
        >
          <Action
            showTooltips={showTooltips}
            showText={showActionTexts}
            className={actionClassName}
            {...action}
          />
        </li>
      ))}
    </ul>
  );
}
