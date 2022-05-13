import { Link } from "@commons-ui/next";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import twitterDesktopIcon from "@/codeforafrica/assets/twitterDesktop.svg";
import twitterMobileIcon from "@/codeforafrica/assets/twitterMobile.svg";
import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function NavBarNavList({ menu }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!menu?.length) {
    return null;
  }
  return (
    <Box component="nav">
      <NavList
        direction={isMobile ? "column" : "row"}
        sx={{ alignItems: "flex-start" }}
      >
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
        <NavListItem sx={{ m: "20px" }}>
          <IconButton
            size={isMobile ? "large" : "small"}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Image
              src={isMobile ? twitterMobileIcon : twitterDesktopIcon}
              alt="twitter"
            />
          </IconButton>
        </NavListItem>
      </NavList>
    </Box>
  );
}

NavBarNavList.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

NavBarNavList.defaultProps = {
  menu: undefined,
};

export default NavBarNavList;
