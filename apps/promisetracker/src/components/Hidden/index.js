import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React from "react";

// MUI v4/v5 Hidden compatibility for v6: supports xsUp/xsDown/... and `only`.
// implementation prop is accepted but ignored (JS only).
export default function Hidden(props) {
  const {
    children,
    className,
    style,
    implementation: _, // ignored
    only,
    xsUp,
    smUp,
    mdUp,
    lgUp,
    xlUp,
    xsDown,
    smDown,
    mdDown,
    lgDown,
    xlDown,
  } = props;

  const theme = useTheme();

  const bps = theme.breakpoints;
  // Precompute in a stable hooks order
  const up = {
    xs: useMediaQuery(bps.up("xs")),
    sm: useMediaQuery(bps.up("sm")),
    md: useMediaQuery(bps.up("md")),
    lg: useMediaQuery(bps.up("lg")),
    xl: useMediaQuery(bps.up("xl")),
  };
  const down = {
    xs: useMediaQuery(bps.down("xs")),
    sm: useMediaQuery(bps.down("sm")),
    md: useMediaQuery(bps.down("md")),
    lg: useMediaQuery(bps.down("lg")),
    xl: useMediaQuery(bps.down("xl")),
  };
  const onlyMatches = {
    xs: useMediaQuery(bps.only("xs")),
    sm: useMediaQuery(bps.only("sm")),
    md: useMediaQuery(bps.only("md")),
    lg: useMediaQuery(bps.only("lg")),
    xl: useMediaQuery(bps.only("xl")),
  };

  const onlyList = Array.isArray(only) ? only : only ? [only] : [];
  const matchOnly = onlyList.some((bp) => onlyMatches[bp]);

  const matchUp =
    (xsUp && up.xs) ||
    (smUp && up.sm) ||
    (mdUp && up.md) ||
    (lgUp && up.lg) ||
    (xlUp && up.xl);
  const matchDown =
    (xsDown && down.xs) ||
    (smDown && down.sm) ||
    (mdDown && down.md) ||
    (lgDown && down.lg) ||
    (xlDown && down.xl);

  const shouldHide = Boolean(matchOnly || matchUp || matchDown);

  if (shouldHide) {
    return null;
  }

  // If used as a wrapper, render children directly; if used as a root via
  // Grid's `component={Hidden}` pattern, preserve className by rendering a div.
  if (children != null) {
    return <>{children}</>;
  }
  // Do not forward unknown props to the DOM
  return <div className={className} style={style} />;
}
