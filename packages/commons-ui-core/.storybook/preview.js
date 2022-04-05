import createTheme from "../styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";

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
