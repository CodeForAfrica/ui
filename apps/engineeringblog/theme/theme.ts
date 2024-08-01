'use client';

import {
  createTheme,
  ThemeOptions,
} from "@mui/material";

const THEME_OPTIONS: ThemeOptions = {
  palette: {
    mode: "light",
  }
};
const THEME = createTheme(THEME_OPTIONS);

export default THEME;