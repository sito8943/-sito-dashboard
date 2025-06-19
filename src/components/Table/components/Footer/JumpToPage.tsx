import { useMemo } from "react";
// providers
import { useTranslation, useTableOptions } from "providers";

// components
import { SelectInput, Option } from "components";

/**
 * Page size component
 * @returns Page size component
 */
export function JumpToPage() {
  const { t } = useTranslation();

  const { total, pageSize, currentPage, setCurrentPage } = useTableOptions();

  const pages = useMemo(() => {
    const totalPages = Math.ceil(total / pageSize); // 6

    return Array.from({ length: totalPages }, (_, i) => ({
      id: i,
      value: i + 1,
    }));
  }, [total, pageSize]);

  return (
    <div className="page-size">
      <p>{t("_accessibility:components.table.jumpToPage")}</p>
      <SelectInput
        value={currentPage}
        options={pages}
        inputClassName="page-size-input"
        containerClassName="page-size-input-container"
        helperTextClassName="hidden"
        onChange={(e) => setCurrentPage(Number(e.target.value))}
      />
    </div>
  );
}
