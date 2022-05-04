import PropTypes from "prop-types";
import React from "react";

import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function NavMenu({ children, menu }) {
  if (!menu?.length) {
    return null;
  }

  return (
    <NavList direction={false}>
      {menu.map((item) => (
        <NavListItem
          label={item.label}
          key={item.label}
          href={item.href}
          direction={false}
        />
      ))}
      {children}
    </NavList>
  );
}

NavMenu.propTypes = {
  children: PropTypes.node,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

NavMenu.defaultProps = {
  children: undefined,
  menu: undefined,
};

export default NavMenu;
