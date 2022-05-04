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

const NavLink = styled("a", {
  slot: "Root",
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    return [styles.root, ownerState.footer && styles.footer];
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
  ...(!ownerState.footer && {
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
  const { footer = true, label, href, ...others } = props;
  const ownerState = { ...others, footer };

  return (
    <NavLinkItemRoot key={label}>
      <NavLink href={href} ownerState={ownerState} footer={footer} ref={ref}>
        {label}
      </NavLink>
    </NavLinkItemRoot>
  );
});

NavListItem.propTypes = {
  label: PropTypes.string,
  href: PropTypes.string,
  footer: PropTypes.bool,
};

NavListItem.defaultProps = {
  label: undefined,
  href: undefined,
  footer: undefined,
};

export default NavListItem;
