import { Grid } from "@mui/material";
import Link from "@mui/material/Link";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import * as React from "react";

const NavLinkGrid = styled(Grid)(({ theme: { breakpoints, typography } }) => ({
  margin: `${typography.pxToRem(6)} 0`,
  [breakpoints.up("lg")]: {
    margin: 0,
  },
}));

const NavLink = styled(Link)(
  ({ theme: { breakpoints, palette, typography } }) => ({
    boxShadow: "none",
    textTransform: "capitalize",
    color: palette.text.secondary.main,
    textDecoration: "none",
    fontSize: typography.pxToRem(28),
    backgroundColor: "transparent",
    "&:hover, &:active, &:focus, &:focus-within": {
      color: palette.text.secondary.main,
    },
    [breakpoints.up("lg")]: {
      boxShadow: "none",
      textTransform: "capitalize",
      color: palette.text.primary.main,
      textDecoration: "none",
      fontSize: typography.pxToRem(18),
      margin: typography.pxToRem(24),
      backgroundColor: "transparent",
      borderColor: "none",
      "&:hover, &:active, &:focus, &:focus-within": {
        textDecoration: "underline",
        color: palette.primary.main, // passprops for color
      },
    },
  })
);
function NavMenu({ children, menu }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (!menu?.length) {
    return null;
  }

  return (
    <Grid
      container
      direction={isMobile ? "column" : "row"}
      alignItems="flex-start"
      justifyContent={isMobile ? "flex-start" : "flex-end"}
    >
      {menu.map((item) => (
        <NavLinkGrid item key={item.label}>
          <NavLink href={item.href} variant="body1">
            {item.label}
          </NavLink>
        </NavLinkGrid>
      ))}
      {children}
    </Grid>
  );
}

NavMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }).isRequired
  ).isRequired,
  children: PropTypes.node,
};

NavMenu.defaultProps = {
  children: undefined,
};

export default NavMenu;
