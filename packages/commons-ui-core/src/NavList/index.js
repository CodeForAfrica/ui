import PropTypes from "prop-types";
import * as React from "react";

import Menu from "./Menu";
import MenuIcon from "./MenuIcon";

function NavList({ menu, links }) {
  if (!menu?.length) {
    return null;
  }
  if (!links?.length) {
    return null;
  }
  return (
    <Menu menu={menu}>
      <MenuIcon links={links} />
    </Menu>
  );
}

NavList.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      alt: PropTypes.string,
    }).isRequired
  ).isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }).isRequired
  ).isRequired,
};

export default NavList;
