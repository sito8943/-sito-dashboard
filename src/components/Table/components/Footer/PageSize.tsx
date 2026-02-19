// components
import { Option, SelectInput } from "components";
// providers
import { useTableOptions, useTranslation } from "providers";
import { useMemo } from "react";

/**
 * Page size component
 * @returns Page size component
 */
export function PageSize() {
  const { t } = useTranslation();

  const { pageSizes, pageSize, setPageSize } = useTableOptions();

  const optionPageSize = useMemo(
    () => pageSizes?.map((size) => ({ id: size, value: size })),
    [pageSizes],
  );

  return (
    <div className="page-size">
      <p>{t("_accessibility:components.table.pageSizes")}</p>
      <SelectInput
        value={pageSize}
        options={optionPageSize as Option[]}
        inputClassName="page-size-input"
        containerClassName="page-size-input-container"
        helperTextClassName="hidden"
        onChange={(e) =>
          setPageSize(Number((e.target as HTMLInputElement).value))
        }
      />
    </div>
  );
}
