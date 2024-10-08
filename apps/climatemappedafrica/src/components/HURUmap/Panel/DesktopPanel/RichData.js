import PropTypes from "prop-types";
import React, { useRef } from "react";

import useStyles from "./useStyles";

import Profile from "@/climatemappedafrica/components/HURUmap/Panel/Profile";
import TreeView from "@/climatemappedafrica/components/HURUmap/TreeView";

function RichData({ primaryProfile, ...props }) {
  const classes = useStyles(props);
  const profileRef = useRef();

  const handleLabelClick = (id) => {
    const el = profileRef?.current;
    if (el && id) {
      el.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <TreeView
        items={primaryProfile.items}
        onLabelClick={handleLabelClick}
        classes={{ root: classes.treeView }}
      />
      <Profile
        {...props}
        categories={primaryProfile.items}
        primaryProfile={primaryProfile}
        ref={profileRef}
      />
    </>
  );
}

RichData.propTypes = {
  primaryProfile: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default RichData;
