import createTheme from "./createTheme";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 360, // mobile
      md: 720, // tablet
      lg: 1280, // desktop
    },
  },
  contentWidths: {
    values: {
      md: 608, // 0, 80, 0, 80 margin
      lg: 1160, // 0, 140, 0, 140 margin
    },
  },
});

export default theme;
