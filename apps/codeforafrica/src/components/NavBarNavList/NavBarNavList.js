import { Link } from "@commons-ui/next";
import SvgIcon from "@mui/material/SvgIcon";
import PropTypes from "prop-types";
import React from "react";

import TwitterIcon from "@/codeforafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

const NavBarNavList = React.forwardRef(function NavBarNavList(props, ref) {
  const { direction, menu, ...other } = props;

  if (!menu?.length) {
    return null;
  }
  return (
    <NavList direction={direction} {...other} ref={ref}>
      {menu.map((item) => (
        <NavListItem key={item.content} sx={{ m: "20px" }}>
          <Link
            href={item.href}
            color="inherit"
            underline="none"
            variant="h4"
            sx={{
              typography: { md: "body3" },
              "&:hover, &:active, &:focus, &:focus-within": {
                textDecoration: "none",
                color: { xs: "inherit", md: "primary.main" },
              },
            }}
          >
            {item.content}
          </Link>
        </NavListItem>
      ))}
      <NavListItem sx={{ m: "20px", mr: 0 }}>
        <Link
          href="https://twitter.com/Code4Africa"
          sx={{ color: { xs: "inherit" } }}
        >
          <SvgIcon
            component={TwitterIcon}
            sx={{
              mt: direction === "column" ? 0 : 1,
              fill: { xs: "none" },
            }}
          />
        </Link>
      </NavListItem>
    </NavList>
  );
});

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
