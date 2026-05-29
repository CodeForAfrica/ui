import { Box, Link, Typography } from "@mui/material";
import React from "react";

const QuickLinks = React.forwardRef(function QuickLinks(props, ref) {
  const { links, LinksProps, LinkProps, title, TitleProps, sx } = props;
  const LinkComponent = LinksProps?.linkComponent || Link;

  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        paddingBottom: {
          md: "0.5rem",
        },
        ...sx,
      }}
      ref={ref}
    >
      <Typography {...TitleProps}>{title}</Typography>
      <Typography {...LinksProps} component="ul">
        {links &&
          links.map(({ label, ...others }) => (
            <li key={label}>
              <LinkComponent {...others} underline="none" {...LinkProps}>
                {label}
              </LinkComponent>
            </li>
          ))}
      </Typography>
    </Box>
  );
});

export default QuickLinks;
