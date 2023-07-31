import { NavList } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import NavListItem from "@/codeforafrica/components/NavListItem";

function FooterNavList({ menu, children }) {
  if (!menu?.length) {
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
        {menu.map((item, i) => (
          <NavListItem
            key={item.id}
            sx={{ mb: i < menu.length - 1 ? "20px" : 0 }}
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
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

FooterNavList.defaultProps = {
  menu: undefined,
};

export default FooterNavList;
