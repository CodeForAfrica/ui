import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

import logoLight from "@/techlabblog/assets/images/logo-light.png";
import Footer from "@/techlabblog/components/Footer";
import NavBar from "@/techlabblog/components/NavBar";
import { getSettings } from "@/techlabblog/lib/data";
import theme from "@/techlabblog/theme";

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
  const settings = await getSettings();
  if (!settings) {
    // TODO(kilemensi): log to sentry
    return null;
  }
  const { analytics, connect, primaryNavigation, secondaryNavigation } =
    settings;
  // TODO(kilemensi): blurWidth/blurHeight https://github.com/vercel/next.js/issues/56511
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
              connect={connect}
              copyright={secondaryNavigation?.copyright}
              secondaryMenus={secondaryNavigation?.menus}
            />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
      <GoogleAnalytics gaId={analytics?.analyticsId} />
    </html>
  );
}
