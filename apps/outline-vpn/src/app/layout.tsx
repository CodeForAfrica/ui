import { CssBaseline, ThemeProvider } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import theme from "../theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CFA | VPN Manager",
  description: "A VPN Manager for CFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
