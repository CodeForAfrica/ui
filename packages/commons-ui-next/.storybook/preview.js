import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@commons-ui/core";
import { RouterContext } from "next/dist/shared/lib/router-context";
import NextImage from "next/image";

// Deoptimize next/image
const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

// Wrap stories in MUI theme
const theme = createTheme();
import "./styles.css";
const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

import { parameters as defaultParameters } from "storybook-config-commons-ui/preview";

export const parameters = {
  ...defaultParameters,
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};
export const decorators = [withThemeProvider];
