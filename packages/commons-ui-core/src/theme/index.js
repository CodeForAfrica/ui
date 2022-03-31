import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 390, // mobile
      md: 768, // tablet
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
