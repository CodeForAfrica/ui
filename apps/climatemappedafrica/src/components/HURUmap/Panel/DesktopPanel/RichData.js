import { Paper } from "@mui/material";
import PropTypes from "prop-types";
import React, { useRef } from "react";

import Profile from "@/climatemappedafrica/components/HURUmap/Panel/Profile";
import TreeView from "@/climatemappedafrica/components/HURUmap/TreeView";

function RichData({ primaryProfile, ...props }) {
  const profileRef = useRef();

  const handleLabelClick = (id) => {
    const el = profileRef?.current;
    if (el && id) {
      el.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Paper
      elevation={0}
      square
      sx={{
        bgcolor: "background.paper",
        borderLeft: "none",
        borderRight: "none",
        position: "relative",
        display: "flex",
        scrollMargin: "40px",
      }}
    >
      <TreeView
        items={primaryProfile.items}
        onLabelClick={handleLabelClick}
        sx={({ typography, contentWidths }) => ({
          flexShrink: 0,
          bottom: 0,
          left: 0,
          minWidth: typography.pxToRem(300),
          paddingTop: typography.pxToRem(76),
          // by default, fixed is completely taken out of the flow i.e. not
          // relative to parent. This means we need to to make sure it still
          // appears below main toolbar
          position: "fixed",
          top: typography.pxToRem(88), // Toolbar height
          width: `calc((100vw - ${contentWidths.values.lg}px)/2 + 79px)`,
        })}
      />
      <Profile
        {...props}
        categories={primaryProfile.items}
        primaryProfile={primaryProfile}
        sx={{}}
        ref={profileRef}
      />
    </Paper>
  );
}

RichData.propTypes = {
  primaryProfile: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default RichData;
