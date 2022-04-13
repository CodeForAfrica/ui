import { ThemeProvider } from "@mui/material/styles";
import createTheme from "@/commons-ui/core/styles/createTheme";

export * from "config/storybook/preview";

const theme = createTheme();

import "./styles.css";

const withThemeProvider = (Story, context) => {
  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];
