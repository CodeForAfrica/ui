import { createTheme } from "@mui/material/styles";

const defaultTheme = createTheme({
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
    h1: {
      fontSize: 48,
      lineHeight: 48 / 56,
      fontStyle: "normal",
      fontWeight: 700,
    },
    h2: {
      fontSize: 39,
      lineHeight: 39 / 47,
      fontStyle: "normal",
      fontWeight: 700,
    },
    h3: {
      fontSize: 34,
      lineHeight: 39 / 40,
      fontStyle: "normal",
      fontWeight: 700,
    },
    h4: {
      fontSize: 28,
      lineHeight: 28 / 34,
      fontStyle: "normal",
      fontWeight: 700,
    },
    h5: {
      fontSize: 23,
      lineHeight: 28 / 28,
      fontStyle: "normal",
      fontWeight: 700,
    },
    body1: {
      fontSize: 20,
      lineHeight: 20 / 28,
      fontStyle: "normal",
      fontWeight: 400,
    },
    body2: {
      fontSize: 18,
      lineHeight: 18 / 28,
      fontStyle: "normal",
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 16 / 26,
      fontStyle: "normal",
      fontWeight: 400,
    },
    subtitle2: {
      fontSize: 14,
      lineHeight: 14 / 23,
      fontStyle: "normal",
      fontWeight: 400,
    },
    caption: {
      fontSize: 12,
      lineHeight: 12 / 14,
      fontStyle: "normal",
      fontWeight: 400,
    },
    button: {
      fontSize: 16,
      lineHeight: 16 / 19,
      fontStyle: "normal",
      fontWeight: 600,
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
});

const theme = createTheme(defaultTheme, {
  typography: {},
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        color: defaultTheme.palette.primary.main,
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            textTransform: "none",
            backgroundColor: defaultTheme.palette.secondary.main,
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            backgroundColor: defaultTheme.palette.primary.main,
          },
        },
      ],
    },
  },
});

export default theme;
