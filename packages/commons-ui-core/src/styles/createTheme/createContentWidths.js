function createContentWidths(contentWidths, breakpoints) {
  if (contentWidths) {
    return contentWidths;
  }
  if (breakpoints) {
    // Use https://mui.com/customization/breakpoints/#default-breakpoints
    // as is for content widths i.e. body
    const { values: breakpointValues, unit } = breakpoints;
    const values = { ...breakpointValues };
    // Assume values are sorted, remove the first value so that content width
    // is 100% of the size.
    delete values[Object.keys(breakpointValues)[0]];
    return {
      values,
      unit,
    };
  }
  // Using https://mui.com/customization/breakpoints/#default-breakpoints
  // viewport sizes and
  // https://material.io/design/layout/responsive-layout-grid.html#breakpoints
  // suggested margins, we compute contentWidths
  // Material Designs uses alternating scalling of margins and content widths
  // i.e. body but we'll use fixed values for body and scale margins except for
  // xs where we'll scale body and margins
  return {
    values: {
      // xs should have 100% content or small margins but responsive
      sm: 568,
      md: 840,
      lg: 1000,
      xl: 1260,
    },
    unit: "px",
  };
}

export default createContentWidths;
