import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React from "react";

import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function FooterNavList({ menu }) {
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
        sx={{ alignItems: { xs: "center", md: "flex-start" } }}
      >
        {menu.map((item) => (
          <NavListItem key={item.label} sx={{ mb: "20px" }}>
            <Link
              href={item.href}
              color="inherit"
              underline="none"
              variant="h5"
              fontWeight="700"
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
      </NavList>
    </Box>
  );
}

FooterNavList.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

FooterNavList.defaultProps = {
  menu: undefined,
};

export default FooterNavList;
