import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { render } from "@testing-library/react";
import React from "react";

function createWrapper(theme) {
  function AllTheProviders({ children }) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    );
  }
  return AllTheProviders;
}

function createRender(options) {
  const { theme = createTheme() } = options || {};
  const AllTheProviders = createWrapper(theme);
  const customRender = (ui, renderOptions) =>
    render(ui, { wrapper: AllTheProviders, ...renderOptions });

  return customRender;
}

const customRender = createRender();

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render, createRender };
