import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const NavLinkItemRoot = styled("li")(
  ({ theme: { breakpoints, typography } }) => ({
    marginBottom: `${typography.pxToRem(20)}`,
    listStyle: "none",
    [breakpoints.up("lg")]: {
      marginBottom: `${typography.pxToRem(10)}`,
      listStyle: "none",
    },
  })
);

const NavListItem = React.forwardRef(function NavListItem(props, ref) {
  const { key, children } = props;
  return (
    <NavLinkItemRoot key={key} ref={ref}>
      {children}
    </NavLinkItemRoot>
  );
});

NavListItem.propTypes = {
  key: PropTypes.string,
  children: PropTypes.node,
};

NavListItem.defaultProps = {
  key: undefined,
  children: undefined,
};

export default NavListItem;
