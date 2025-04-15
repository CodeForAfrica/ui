import { ThemeProvider } from "@mui/material/styles";

import theme from "@/twoopstracker/theme";
// import createTheme from "@commons-ui/core/styles/createTheme";

import "./styles.css";

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
  md: {
    name: "Medium",
    styles: {
      width: "608px",
      height: "800px",
    },
  },
  lg: {
    name: "Large",
    styles: {
      width: "1160px",
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
