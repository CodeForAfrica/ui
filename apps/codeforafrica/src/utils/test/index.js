/* eslint-disable import/no-extraneous-dependencies */
import { ThemeProvider, CssBaseline } from "@mui/material";
import { render } from "@testing-library/react";
import React from "react";

import theme from "@/codeforafrica/theme";

function AllTheProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
