import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavLinkGrid = styled("li")(({ theme: { breakpoints, typography } }) => ({
  margin: `${typography.pxToRem(6)} 0`,
  listStyle: "none",
  [breakpoints.up("lg")]: {
    margin: 0,
    listStyle: "none",
  },
}));

const NavLink = styled("a")(
  ({ theme: { breakpoints, palette, typography } }) => ({
    textTransform: "capitalize",
    color: palette.text.secondary,
    textDecoration: "none",
    fontSize: typography.pxToRem(28),
    backgroundColor: "transparent",
    "&:hover, &:active, &:focus, &:focus-within": {
      color: palette.text.secondary.main,
    },
    [breakpoints.up("lg")]: {
      textTransform: "capitalize",
      color: palette.secondary.main,
      textDecoration: "none",
      fontSize: typography.pxToRem(18),
      margin: typography.pxToRem(24),
      backgroundColor: "transparent",
      borderColor: "none",
      "&:hover, &:active, &:focus, &:focus-within": {
        textDecoration: "underline",
        color: palette.primary.main,
      },
    },
  })
);

function NavListItem({ label, href }) {
  return (
    <NavLinkGrid key={label}>
      <NavLink href={href}>{label}</NavLink>
    </NavLinkGrid>
  );
}

NavListItem.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
};

NavListItem.defaultProps = {
  label: undefined,
  href: undefined,
};

export default NavListItem;
