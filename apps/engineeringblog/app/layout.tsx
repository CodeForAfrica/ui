import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";

import NavBar from "@/engineeringblog/components/NavBar";
import theme from "@/engineeringblog/theme";

// TODO: blurWidth/blueHeight https://github.com/vercel/next.js/issues/56511
import logoLight from "@/engineeringblog/assets/images/logo-light.png";

export const metadata: Metadata = {
  title: "Technology | Code for Africa",
  description:
    "Tech adventures in Africa's civic labs: Coding, innovating, and disrupting for good across the continent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const logo = {
    ...logoLight,
    alt: "Technology | Code for Africa",
    title: "Technology",
  };

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <NavBar logo={logo} />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
