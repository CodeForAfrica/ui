import { Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import SvgIcon from "@mui/material/SvgIcon";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import React from "react";

import { ReactComponent as TwitterDesktopIcon } from "@/codeforafrica/assets/twitterDesktop.svg";
import { ReactComponent as TwitterMobileIcon } from "@/codeforafrica/assets/twitterMobile.svg";
import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function NavBarNavList({ menu, direction }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!menu?.length) {
    return null;
  }
  return (
    <Box component="nav">
      <NavList direction={direction} sx={{ alignItems: "flex-start" }}>
        {menu.map((item) => (
          <NavListItem key={item.label} sx={{ m: "20px" }}>
            <Link
              href={item.href}
              color="inherit"
              underline="none"
              variant={isMobile ? "h4" : "subtitle1"}
              fontWeight={isMobile ? 700 : 400}
              sx={{
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
          <Link href="https://twitter.com/?lang=en">
            <SvgIcon
              component={isMobile ? TwitterMobileIcon : TwitterDesktopIcon}
              viewBox="0 0 32 32"
              sx={{ color: "white", mt: { xs: 0, md: 1 } }}
            />
          </Link>
        </NavListItem>
      </NavList>
    </Box>
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
