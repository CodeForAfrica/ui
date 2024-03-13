import type { Metadata } from "next";

import { CssBaseline, ThemeProvider } from "@mui/material";

import theme from "./theme";

export const metadata: Metadata = {
  title: "CFA | Outline VPN",
  description: "AN outline VPN Manager for CFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </html>
  );
}
