// components
import { IconButton, Tooltip } from "components";
// lib
import { BaseDto } from "lib";
// providers
import { useTranslation } from "providers";

// types
import { ActionType } from "../types";

type TableSelectionBarProps<TRow extends BaseDto> = {
  count: number;
  multiActions: ActionType<TRow>[];
  onActionClick: (action: ActionType<TRow>) => void;
};

/**
 * Renders the selection bar shown when one or more table rows are selected.
 * Displays the count of selected rows and optional bulk action buttons.
 * @param root0 - Component props.
 * @param root0.count - Number of currently selected rows.
 * @param root0.multiActions - List of actions available for the selected rows.
 * @param root0.onActionClick - Callback invoked when a bulk action button is clicked.
 * @returns Selection bar element.
 */
export function TableSelectionBar<TRow extends BaseDto>({
  count,
  multiActions,
  onActionClick,
}: TableSelectionBarProps<TRow>) {
  const { t } = useTranslation();

  return (
    <div className="table-selection-bar">
      <p className="table-selection-bar-count">
        {t("_accessibility:components.table.selectedCount", { count })}
      </p>
      {multiActions.length > 0 && (
        <div className="table-selection-bar-actions">
          {multiActions.map((action) => (
            <Tooltip key={action.id} content={action.tooltip}>
              <IconButton
                icon={action.icon}
                className="multi-table-action"
                onClick={() => onActionClick(action)}
                disabled={action.disabled}
              />
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}
