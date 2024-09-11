import { NavList, NavListItem } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function FooterNavList({ menus, children }) {
  if (!menus?.length) {
    return null;
  }
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <NavList
        direction="column"
        sx={{ padding: 0, alignItems: { xs: "center", md: "flex-start" } }}
      >
        {menus.map((item, i) => (
          <NavListItem
            key={item.label}
            sx={{ mb: i < menus.length - 1 ? "20px" : 0 }}
          >
            <Link
              href={item.href}
              color="inherit"
              underline="none"
              variant="h5"
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

FooterNavList.propTypes = {
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

export default FooterNavList;
