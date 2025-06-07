// providers
import { useTranslation } from "providers";

/**
 * Empty component
 * @returns Empty component
 */
export function Empty() {
  const { t } = useTranslation();

  return (
    <div className="table-empty">
      <p>{t("_accessibility:components.table.empty")}</p>
    </div>
  );
}
