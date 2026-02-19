// components
import { SelectInput } from "components";
// providers
import { useTableOptions, useTranslation } from "providers";
import { useMemo } from "react";

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
    <div className="jump-to-page">
      <p>{t("_accessibility:components.table.jumpToPage")}</p>
      <SelectInput
        value={currentPage}
        options={pages}
        inputClassName="jump-to-page-input"
        containerClassName="jump-to-page-input-container"
        helperTextClassName="hidden"
        onChange={(e) =>
          setCurrentPage(Number((e.target as HTMLInputElement).value))
        }
      />
    </div>
  );
}
