// providers
// components
import { ChevronLeft, ChevronRight, IconButton } from "components";
import { useTableOptions, useTranslation } from "providers";

/**
 * Renders the Navigation component.
 * @returns Function result.
 */
export const Navigation = () => {
  const { t } = useTranslation();

  const { total, pageSize, currentPage, setCurrentPage } = useTableOptions();

  return (
    <div className="table-navigation-pages">
      <IconButton
        icon={<ChevronLeft className="w-2.5" />}
        className="table-navigation-buttons"
        disabled={currentPage === 0}
        aria-label={t("_accessibility:buttons.previous")}
        name={t("_accessibility:buttons.previous")}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
      <IconButton
        icon={<ChevronRight className="w-2.5" />}
        disabled={Math.floor(total / ((currentPage + 1) * pageSize)) === 0}
        className="table-navigation-buttons"
        name={t("_accessibility:buttons.next")}
        aria-label={t("_accessibility:buttons.next")}
        onClick={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};
