import createTheme from "../styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";

const theme = createTheme();

import "./styles.css";

const withThemeProvider = (Story, context) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Story {...context} />
      </ThemeProvider>
    </EmotionThemeProvider>
  );
};

export const decorators = [withThemeProvider];
