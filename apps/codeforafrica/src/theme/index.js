import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1020E1", light: "#EFF0FD" },
    secondary: { main: "#000000", light: "#7F7272" },
    text: {
      primary: { main: "#000000" },
      secondary: { main: "#FFFFFF" },
    },
    background: { main: "#F6F5F5" },
    highlight: { main: "#ED1C24" },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h2: {
      fontSize: 39,
      lineHeight: 39 / 47,
    },
    h3: {
      fontSize: 34,
      lineHeight: 39 / 40,
    },
    h4: {
      fontSize: 28,
      lineHeight: 28 / 34,
    },
    h5: {
      fontSize: 23,
      lineHeight: 28 / 28,
    },
    body1: {
      fontSize: 20,
      lineHeight: 20 / 28,
    },
    body2: {
      fontSize: 18,
      lineHeight: 18 / 28,
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 16 / 26,
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 14 / 23,
    },
  },
  breakpoints: {
    values: {
      mobile: 390,
      tablet: 768,
      laptop: 1152,
      desktop: 1440,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
  },
});

export default theme;
