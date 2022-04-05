import { createTheme as MuiCreateTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

const createTheme = (options = {}) => {
  const { breakpoints, contentWidths } = options;

  if (breakpoints && contentWidths) {
    return MuiCreateTheme(options);
  }
  return MuiCreateTheme(
    deepmerge(options, {
      contentWidths: {
        values: {
          xs: 300,
          sm: 480,
          md: 608,
          lg: 1160,
          xl: 1440,
        },
      },
    })
  );
};

export default createTheme;
