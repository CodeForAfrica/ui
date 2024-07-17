import { Link } from "@commons-ui/next";
import { Typography } from "@mui/material";
import React from "react";

const Source = React.forwardRef(function Source(
  {
    LinkProps,
    TitleTypographyProps,
    children,
    href,
    title = "Source",
    ...props
  },
  ref,
) {
  if (!(href && children)) {
    return null;
  }
  return (
    <div {...props} ref={ref}>
      <Typography
        {...TitleTypographyProps}
        sx={(theme) => ({
          fontSize: theme.typography.pxToRem(13),
          lineHeight: 20 / 13,
          color: "#666666",
          display: "inline-flex",
          fontWeight: 500,
          ...TitleTypographyProps?.sx,
        })}
      >
        {title}:&nbsp;
      </Typography>
      <Link
        underline="always"
        href={href}
        {...LinkProps}
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontSize: theme.typography.pxToRem(13),
          lineHeight: 20 / 13,
          fontFamily: theme.typography.body1.fontFamily,
          fontWeight: 500,
          ...LinkProps?.sx,
        })}
      >
        {children}
      </Link>
    </div>
  );
});

export default Source;
