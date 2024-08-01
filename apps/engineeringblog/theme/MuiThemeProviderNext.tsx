import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { FunctionComponent, PropsWithChildren } from "react";

const MuiThemeProviderNext: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
};

export default MuiThemeProviderNext;
