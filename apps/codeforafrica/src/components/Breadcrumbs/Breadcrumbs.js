import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import React from "react";

const BreadcrumbsRoot = styled(MuiBreadcrumbs, {
  slot: "Root",
})(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const Breadcrumbs = React.forwardRef(function Breadcrumbs(props, ref) {
  const { crumbs, ...other } = props;

  if (!crumbs?.length) {
    return null;
  }
  return (
    <BreadcrumbsRoot {...other} ref={ref}>
      {crumbs.map(({ href, label }) => {
        if (href) {
          return (
            <Link
              key={label}
              color="inherit"
              href={href}
              underline="always"
              variant="body1Underline"
            >
              {label}
            </Link>
          );
        }
        return (
          <RichTypography key={label} variant="body1">
            {label}
          </RichTypography>
        );
      })}
    </BreadcrumbsRoot>
  );
});

export default Breadcrumbs;
