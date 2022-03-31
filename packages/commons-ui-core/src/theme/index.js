import { createTheme } from "@mui/material/styles";

const customTheme = (options) => {
  const theme = createTheme(options, {
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

  return theme;
};

export default customTheme;
