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
    highlight: { main: "#ED1C24" },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
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
});

export default theme;
