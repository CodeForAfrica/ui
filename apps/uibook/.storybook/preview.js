import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@commons-ui/core";
// import createTheme from "@commons-ui/core/styles/createTheme";

import "./styles.css";

const theme = createTheme();
const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

/** MUI Breakpoints
 * https://mui.com/material-ui/customization/breakpoints/#main-content
 */
const viewports = {
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

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [withThemeProvider],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
    tags: ["autodocs"],
    viewport: { viewports },
  },
};

export default preview;
