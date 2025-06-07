import { useMemo } from "react";
// providers
import { useTranslation } from "providers";

// components
import { SelectInput, Option } from "../../Form";

// hooks
import { useTableOptions } from "../hooks/TableOptionsProvider";

/**
 * Page size component
 * @returns Page size component
 */
export function PageSize() {
  const { t } = useTranslation();

  const { pageSizes, pageSize, setPageSize } = useTableOptions();

  const optionPageSize = useMemo(
    () => pageSizes?.map((size) => ({ id: size, value: size })),
    [pageSizes]
  );

  return (
    <div className="page-size">
      <p>{t("_accessibility:components.table.pageSizes")}</p>
      <SelectInput
        value={pageSize}
        options={optionPageSize as Option[]}
        containerClassName="!w-auto !mb-0 !border-none"
        helperTextClassName="hidden"
        onChange={(e) => setPageSize(e.target.value)}
      />
    </div>
  );
}
