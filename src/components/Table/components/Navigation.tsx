// providers
import { useTranslation, useTableOptions } from "providers";

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
    <div className="table-navigation">
      <div className="table-navigation-sizes">
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
      <div className="table-navigation-pages">
        <button
          className="table-navigation-buttons"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {t("_accessibility:buttons.previous")}
        </button>
        <button
          disabled={Math.floor(total / ((currentPage + 1) * pageSize)) === 0}
          className="table-navigation-buttons"
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {t("_accessibility:buttons.next")}
        </button>
      </div>
    </div>
  );
}
