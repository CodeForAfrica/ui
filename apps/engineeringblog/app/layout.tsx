import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";

import Footer from "@/engineeringblog/components/Footer";
import NavBar from "@/engineeringblog/components/NavBar";
import theme from "@/engineeringblog/theme";

import { getSettings } from "@/engineeringblog/lib/data";
import logoLight from "@/engineeringblog/assets/images/logo-light.png";

export const metadata: Metadata = {
  title: "Technology | Code for Africa",
  description:
    "Tech adventures in Africa's civic labs: Coding, innovating, and disrupting for good across the continent.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { connect, primaryNavigation, secondaryNavigation } =
    await getSettings();
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
            <NavBar {...primaryNavigation} logo={logo} />
            {children}
            <Footer
              copyright={secondaryNavigation.copyright}
              connect={connect}
              secondaryMenus={secondaryNavigation.menus}
            />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
