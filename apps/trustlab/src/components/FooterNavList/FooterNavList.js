import { NavList, NavListItem } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box } from "@mui/material";
import React from "react";

function FooterNavList({ menus, children, sx }) {
  if (!menus?.length) {
    return null;
  }
  return (
    <Box
      component="nav"
      sx={[
        {
          display: "flex",
          justifyContent: { xs: "center", md: "flex-start" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <NavList
        direction="column"
        sx={{
          padding: "0 24px",
          alignItems: { md: "flex-start" },
        }}
      >
        {menus.map((item) => (
          <NavListItem key={item.label} sx={{ mb: 0, listStyleType: "disc" }}>
            <Link
              href={item.href}
              color="inherit"
              underline="none"
              variant="p2"
              sx={{
                "&:hover, &:active, &:focus, &:focus-within": {
                  textDecoration: "none",
                  color: "inherit",
                },
              }}
            >
              {item.label}
            </Link>
          </NavListItem>
        ))}
        {children}
      </NavList>
    </Box>
  );
}

export default FooterNavList;
