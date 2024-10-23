import PropTypes from "prop-types";
import React from "react";

import SubcategoryList from "./SubcategoryList";

import Profile from "@/climatemappedafrica/components/HURUmap/Panel/Profile";

function RichData({ item, geography, ...props }) {
  return (
    <>
      <SubcategoryList items={item.children} />
      <Profile {...props} categories={[item]} isMobile />
    </>
  );
}

RichData.propTypes = {
  item: PropTypes.shape({
    children: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  geography: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default RichData;
