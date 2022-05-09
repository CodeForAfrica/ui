import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import React from "react";

import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function NavigationNavList({ menu }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!menu?.length) {
    return null;
  }
  return (
    <Box
      component="nav"
      sx={{
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <NavList
        direction={isMobile ? "column" : "row"}
        sx={{ alignItems: { xs: "center", md: "flex-start" } }}
      >
        {menu.map((item) => (
          <NavListItem key={item.label} sx={{ m: "20px" }}>
            <Link
              href={item.href}
              color="inherit"
              underline="none"
              variant="subtitle1"
              fontWeight="400"
              sx={{
                "&:hover, &:active, &:focus, &:focus-within": {
                  textDecoration: "underline",
                  color: "#1020E1",
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

NavigationNavList.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

NavigationNavList.defaultProps = {
  menu: undefined,
};

export default NavigationNavList;
