"use client";

import theme from "@/theme/theme";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";

import { FunctionComponent, PropsWithChildren } from "react";
import MuiThemeProviderNext from "./MuiThemeProviderNext";

const ThemeRegistry: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <MuiThemeProviderNext>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </MuiThemeProviderNext>
  );
};

export default ThemeRegistry;
