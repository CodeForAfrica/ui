import { Link } from "@commons-ui/next";
import SvgIcon from "@mui/material/SvgIcon";
import PropTypes from "prop-types";
import React from "react";

import TwitterIcon from "@/codeforafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
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
              typography: { xs: "h4", md: "body3" },
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
      <NavListItem sx={{ mr: 0, my: "20px", ml: "20px" }}>
        <Link
          href="https://twitter.com/?lang=en"
          sx={{ color: { xs: "white" } }}
        >
          <SvgIcon
            component={TwitterIcon}
            stroke="inherit"
            sx={{
              mt: direction === "column" ? 0 : 1,
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
