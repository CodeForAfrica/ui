"use client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/engineeringblog/theme";
import { CssBaseline } from "@mui/material";

export default function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
