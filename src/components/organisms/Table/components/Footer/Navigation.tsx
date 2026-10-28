// providers
// components
import { ChevronLeft, ChevronRight } from "@/components/atoms/SvgIcons";
import { IconButton } from "@/components/atoms/IconButton";
import { useTableOptions } from "@/providers/TableOptions";
import { useTranslation } from "@/providers/Translation";

/**
 * Renders the Navigation component.
 * @returns Function result.
 */
export const Navigation = () => {
  const { t } = useTranslation();

  const { total, pageSize, currentPage, setCurrentPage } = useTableOptions();
  const totalPages = Math.ceil(total / pageSize);
  const canGoNext = currentPage < totalPages - 1;

  return (
    <div className="table-navigation-pages">
      <IconButton
        icon={<ChevronLeft className="table-navigation-icon" />}
        className="table-navigation-buttons"
        disabled={currentPage === 0}
        aria-label={t("_accessibility:buttons.previous")}
        name={t("_accessibility:buttons.previous")}
        onClick={() => setCurrentPage(currentPage - 1)}
      />
      <IconButton
        icon={<ChevronRight className="table-navigation-icon" />}
        disabled={!canGoNext}
        className="table-navigation-buttons"
        name={t("_accessibility:buttons.next")}
        aria-label={t("_accessibility:buttons.next")}
        onClick={() => {
          if (canGoNext) {
            setCurrentPage(currentPage + 1);
          }
        }}
      />
    </div>
  );
};
