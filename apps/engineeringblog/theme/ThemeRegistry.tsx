import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

export function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
