import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";

import NavBar from "@/engineeringblog/components/NavBar";
import theme from "@/engineeringblog/theme";

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
  // TODO: blurWidth/blurHeight https://github.com/vercel/next.js/issues/56511
  const { blurWidth, blurHeight, ...logoProps } = logoLight;
  const logo = {
    ...logoProps,
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
