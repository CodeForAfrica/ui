import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1020E1" },
    secondary: { main: "#000000" },
    text: {
      primary: { main: "#000000" },
      secondary: { main: "#FFFFFF" },
    },
    background: { main: "#EFF0FD" },
    highlight: { main: "#ED1C24" },
  },
  breakpoints: {
    values: {
      mobile: 390,
      tablet: 768,
      laptop: 1152,
      desktop: 1440,
      largeDesktop: 1920,
    },
  },
});

export default theme;
