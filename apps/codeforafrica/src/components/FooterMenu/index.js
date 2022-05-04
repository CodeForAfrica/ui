import PropTypes from "prop-types";
import React from "react";

import NavList from "@/codeforafrica/components/NavList";
import NavListItem from "@/codeforafrica/components/NavListItem";

function FooterMenu({ menu }) {
  if (!menu?.length) {
    return null;
  }

  return (
    <NavList direction>
      {menu.map((item) => (
        <NavListItem {...item} direction />
      ))}
    </NavList>
  );
}

FooterMenu.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
};

FooterMenu.defaultProps = {
  menu: undefined,
};

export default FooterMenu;
