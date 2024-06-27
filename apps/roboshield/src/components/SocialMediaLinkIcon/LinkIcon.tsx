import { Link, RichTypography } from "@commons-ui/next";
import { Grid, SvgIcon } from "@mui/material";
import type { LinkProps, SvgIconProps } from "@mui/material";
import React from "react";

interface LinkIconProps extends LinkProps {
  IconProps: SvgIconProps;
}

const LinkIcon = React.forwardRef(function LinkIcon(
  { IconProps, ...props }: LinkIconProps,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Link {...props} ref={ref}>
      <SvgIcon {...IconProps} />
    </Link>
  );
});

export type { LinkIconProps };
export default LinkIcon;
