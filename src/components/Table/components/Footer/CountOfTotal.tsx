// providers
import { useTableOptions, useTranslation } from "providers";

/**
 * Renders the CountOfTotal component.
 * @returns Function result.
 */
export const CountOfTotal = () => {
  const { t } = useTranslation();

  const { total, pageSize, pageSizes, currentPage } = useTableOptions();

  const max =
    (currentPage + 1) * pageSize > total ? total : (currentPage + 1) * pageSize;

  return (
    <div className="table-navigation-sizes">
      {pageSizes[0] < total && (
        <>
          <p>
            {currentPage * pageSize + 1}
            {" - "}
            {max} {t("_accessibility:components.table.of")}
          </p>
        </>
      )}
      <p>{total}</p>
    </div>
  );
};
