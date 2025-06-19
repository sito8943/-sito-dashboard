// components
import { Navigation } from "./Navigation";
import { CountOfTotal } from "./CountOfTotal";
import { PageSize } from "./PageSize";
import { JumpToPage } from "./JumpToPage";

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
