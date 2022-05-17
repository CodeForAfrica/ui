import { Link } from "@commons-ui/next";
import SvgIcon from "@mui/material/SvgIcon";
import PropTypes from "prop-types";
import React from "react";

import TwitterIcon from "@/codeforafrica/assets/twitterDesktop.svg";
import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function NavBarNavList({ menu, direction }) {
  if (!menu?.length) {
    return null;
  }
  return (
    <NavList direction={direction} sx={{ alignItems: "flex-start" }}>
      {menu.map((item) => (
        <NavListItem key={item.label} sx={{ m: "20px" }}>
          <Link
            href={item.href}
            color="inherit"
            underline="none"
            sx={{
              typography: { xs: "h4", md: "subtitle1" },
              fontWeight: { xs: 700, md: 400 },
              "&:hover, &:active, &:focus, &:focus-within": {
                textDecoration: "none",
                color: { xs: "inherit", md: "primary.main" },
              },
            }}
          >
            {item.label}
          </Link>
        </NavListItem>
      ))}
      <NavListItem sx={{ mr: 0, mt: "20px", mb: "20px", ml: "20px" }}>
        <Link
          href="https://twitter.com/?lang=en"
          sx={{ color: { xs: "white" } }}
        >
          <SvgIcon
            component={TwitterIcon}
            viewBox="0 0 32 32"
            stroke="inherit"
            sx={{
              color: "inherit",
              mt: { xs: 0, md: 1 },
              "& >path": {
                stroke: { xs: "inherit", md: "black" },
              },
            }}
          />
        </Link>
      </NavListItem>
    </NavList>
  );
}

NavBarNavList.propTypes = {
  direction: PropTypes.string,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

NavBarNavList.defaultProps = {
  direction: undefined,
  menu: undefined,
};

export default NavBarNavList;
