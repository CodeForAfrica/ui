import { Box, Link, Typography } from "@mui/material";
import React from "react";

const QuickLinks = React.forwardRef(function QuickLinks(props, ref) {
  const { linkComponent, links, LinksProps, LinkProps, title, TitleProps, sx } =
    props;
  const LinkComponent = linkComponent || Link;

  return (
    <Box
      sx={{
        width: "100%",
        paddingBottom: {
          xs: "unset",
          md: "0.5rem",
        },
        ...sx,
      }}
      ref={ref}
    >
      <Typography
        {...TitleProps}
        sx={{
          lineHeight: "inherit",
          ...TitleProps?.sx,
        }}
      >
        {title}
      </Typography>
      <Typography
        {...LinksProps}
        sx={{
          listStyle: "none",
          padding: 0,
          paddingTop: "1rem",
          "& > li": {
            marginTop: {
              xs: "2.3125rem",
              md: "1.5rem",
            },
          },
          ...LinksProps?.sx,
        }}
        component="ul"
      >
        {links.map(({ label, ...others }) => (
          <li key={label}>
            <LinkComponent
              {...others}
              underline="none"
              {...LinkProps}
              sx={{
                textDecoration: "none",
                ...LinkProps?.sx,
              }}
            >
              {label}
            </LinkComponent>
          </li>
        ))}
      </Typography>
    </Box>
  );
});

export default QuickLinks;
