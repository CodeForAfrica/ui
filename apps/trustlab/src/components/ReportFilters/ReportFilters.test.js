import { createRender } from "@commons-ui/testing-library";
import React from "react";

import ReportFilters from "./ReportFilters";

import theme from "@/trustlab/theme";

const render = createRender({ theme });

const defaultProps = {
  hasFilters: true,
  filterByLabel: "Filter By",
  filters: [
    { type: "year", label: "Year" },
    { type: "month", label: "Month" },
    { type: "report", label: "Report" },
  ],
  reportOptions: [
    { id: "r1", title: "Report 1" },
    { id: "r2", title: "Report 2" },
  ],
  applyFiltersLabel: "Apply Filters",
  clearFiltersLabel: "Clear Filters",
  onApply: jest.fn(),
  onClear: jest.fn(),
};

describe("ReportFilters", () => {
  it("renders unchanged", () => {
    const { container } = render(<ReportFilters {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
