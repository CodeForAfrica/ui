import { createTheme as MuiCreateTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

const createTheme = (options = {}) => {
  const { breakpoints, contentWidths } = options;

  if (breakpoints && contentWidths) {
    return MuiCreateTheme(options);
  }
  return MuiCreateTheme(
    deepmerge(options, {
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
    })
  );
};

export default createTheme;
