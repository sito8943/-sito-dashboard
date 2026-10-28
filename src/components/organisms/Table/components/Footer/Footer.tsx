// components
import { CountOfTotal } from "./CountOfTotal";
import { JumpToPage } from "./JumpToPage";
import { Navigation } from "./Navigation";
import { PageSize } from "./PageSize";

/**
 * @returns Footer component
 */
export function Footer() {
  return (
    <div className="table-footer">
      <JumpToPage />
      <PageSize />
      <CountOfTotal />
      <Navigation />
    </div>
  );
}
