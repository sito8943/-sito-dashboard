// styles
import "./styles.css";

// components
import { Dropdown } from "@/components/molecules/Dropdown";
import { IconButton } from "@/components/atoms/IconButton";
// icons
import { Ellipsis } from "@/components/atoms/SvgIcons";
// lib
import { BaseDto, classNames } from "@/lib";
import { useTranslation } from "@/providers/Translation";
import { useState } from "react";

// components
import { Actions } from "./Actions";
// types
import { ActionsContainerPropsType } from "./types";

/**
 * Renders an ellipsis trigger button that opens a {@link Dropdown} containing an {@link Actions} list.
 * @param props - Component props.
 * @param props.actions - Array of action definitions displayed inside the dropdown. Defaults to `[]`.
 * @param props.className - Additional CSS class applied to the root container.
 * @returns A container with an ellipsis `IconButton` and a `Dropdown` holding the actions list.
 */
export const ActionsDropdown = <TRow extends BaseDto>(
  props: ActionsContainerPropsType<TRow>,
) => {
  const { actions = [], className = "" } = props;

  const { t } = useTranslation();

  const [openMenu, setOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <div className={classNames("actions-dropdown", className)}>
      <IconButton
        icon={<Ellipsis />}
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
          setOpenMenu((prev) => !prev);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        className="actions-dropdown-trigger"
        aria-label={t("_accessibility:buttons.openActions")}
        name={t("_accessibility:buttons.openActions")}
      />
      <Dropdown
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        anchorEl={anchorEl}
      >
        <Actions
          showActionTexts
          actions={actions}
          itemClassName="w-full"
          actionClassName="action-dropdown-item"
          className="actions-dropdown-list"
          showTooltips={false}
        />
      </Dropdown>
    </div>
  );
};
