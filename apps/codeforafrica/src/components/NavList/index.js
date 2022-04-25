import PropTypes from "prop-types";
import React from "react";

import NavContainer from "./NavContainer";
import NavListItem from "./NavListItem";

function NavList({ children, menu }) {
  if (!menu?.length) {
    return null;
  }

  return (
    <NavContainer>
      {menu.map((item) => (
        <NavListItem label={item.label} key={item.label} href={item.href} />
      ))}
      {children}
    </NavContainer>
  );
}

NavList.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

NavList.defaultProps = {
  children: undefined,
  menu: undefined,
};

export default NavList;
