import createContentWidths from "./createContentWidths";

const breakpoints = {
  values: { mobile: 400, tablet: 800, desktop: 1200 },
  unit: "px",
};
const contentWidths = { values: { desktop: 1200 }, unit: "px" };

describe("createContentWidths", () => {
  describe("returns default contentWidths", () => {
    it("when both contentWidths and breakpoints arguments are missing", () => {
      const defaultContentWidths = {
        values: {
          sm: 568,
          md: 840,
          lg: 1000,
          xl: 1260,
        },
        unit: "px",
      };
      const computedContentWidths = createContentWidths();
      expect(computedContentWidths).toEqual(defaultContentWidths);
    });
  });

  describe("returns contentWidths unchanged", () => {
    it("when contentWidths argument is present but breakpoints is missing", () => {
      const computedContentWidths = createContentWidths(contentWidths);
      expect(computedContentWidths).toEqual(contentWidths);
    });

    it("when both contentWidths and breakpoints arguments are present", () => {
      const computedContentWidthsWithBreakpoints = createContentWidths(
        contentWidths,
        breakpoints
      );
      expect(computedContentWidthsWithBreakpoints).toEqual(contentWidths);
    });
  });

  describe("returns contentWidths computed from breakpoints", () => {
    it("when contentWidths argument is missing but breakpoints is present", () => {
      const contentWidthsFromBreakpoints = {
        values: { tablet: 800, desktop: 1200 },
        unit: "px",
      };
      const computedContentWidths = createContentWidths(undefined, breakpoints);
      expect(computedContentWidths).toEqual(contentWidthsFromBreakpoints);
    });
  });
});
