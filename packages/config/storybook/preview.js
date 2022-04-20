/** MUI Breakpoints
 * https://mui.com/material-ui/customization/breakpoints/#main-content
 */
const muiViewports = {
  xs: {
    name: "Extra Small",
    styles: {
      width: "444px",
      height: "800px",
    },
  },
  sm: {
    name: "Small",
    styles: {
      width: "600px",
      height: "800px",
    },
  },
  md: {
    name: "Medium",
    styles: {
      width: "900px",
      height: "800px",
    },
  },
  lg: {
    name: "Large",
    styles: {
      width: "1200px",
      height: "800px",
    },
  },
  xl: {
    name: "Extra Large",
    styles: {
      width: "1536px",
      height: "800px",
    },
  },
};

export const parameters = {
  viewport: { viewports: muiViewports },
};
