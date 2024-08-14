import { useTranslation } from "react-i18next";

// hooks
import { useTableOptions } from "../hooks/TableOptionsProvider";

/**
 * Navigation component
 * @returns Navigation component
 */
export function Navigation() {
  const { t } = useTranslation();

  const { total, pageSize, pageSizes, currentPage, setCurrentPage } =
    useTableOptions();

  const max =
    (currentPage + 1) * pageSize > total ? total : (currentPage + 1) * pageSize;

  return (
    <div className="flex w-full items-center justify-between mt-5">
      <div className="flex w-full items-center justify-start gap-1">
        <p>{t("_accessibility:components.table.pageSizes")}</p>
        {pageSizes[0] < total && (
          <>
            <p>
              {t("_accessibility:components.table.from")}{" "}
              {currentPage * pageSize + 1}{" "}
              {t("_accessibility:components.table.to")} {max}{" "}
              {t("_accessibility:components.table.of")}
            </p>
          </>
        )}
        <p>
          {total} {t("_accessibility:components.table.results")}
        </p>
      </div>
      <div className="flex gap-5 items-center justify-end">
        <button
          className="disabled:text-light-primary/40"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {t("_accessibility:buttons.previous")}
        </button>
        <button
          disabled={Math.floor(total / ((currentPage + 1) * pageSize)) === 0}
          className="disabled:text-light-primary/40"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {t("_accessibility:buttons.next")}
        </button>
      </div>
    </div>
  );
}
