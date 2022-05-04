import Link from "@commons-ui/next";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavLinkItemRoot = styled("li")(
  ({ theme: { breakpoints, typography } }) => ({
    margin: `${typography.pxToRem(20)} 0`,
    listStyle: "none",
    [breakpoints.up("lg")]: {
      margin: `${typography.pxToRem(10)} 0`,
      listStyle: "none",
    },
  })
);

const NavLink = styled(Link, {
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.root, ownerState.direction && styles.direction];
  },
})(({ theme: { breakpoints, palette, typography }, ownerState }) => ({
  textTransform: "capitalize",
  color: "white",
  textDecoration: "none",
  fontSize: typography.pxToRem(28),
  backgroundColor: "transparent",
  "&:hover, &:active, &:focus, &:focus-within": {
    color: "white",
  },
  [breakpoints.up("lg")]: {
    textTransform: "capitalize",
    color: "white",
    textDecoration: "none",
    fontSize: typography.pxToRem(23),
    margin: typography.pxToRem(24),
    fontweight: 700,
    lineHeight: typography.pxToRem(28),
    backgroundColor: "transparent",
    borderColor: "none",
    "&:hover, &:active, &:focus, &:focus-within": {
      color: "white",
    },
  },
  ...(!ownerState.direction && {
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
  }),
}));

const NavListItem = React.forwardRef(function NavListItem(props, ref) {
  const { direction = true, label, href, ...others } = props;
  const ownerState = { ...others, direction };

  return (
    <NavLinkItemRoot key={label}>
      <NavLink
        href={href}
        ownerState={ownerState}
        direction={direction}
        ref={ref}
      >
        {label}
      </NavLink>
    </NavLinkItemRoot>
  );
});

NavListItem.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  direction: PropTypes.bool,
};

NavListItem.defaultProps = {
  label: undefined,
  href: undefined,
  direction: undefined,
};

export default NavListItem;
