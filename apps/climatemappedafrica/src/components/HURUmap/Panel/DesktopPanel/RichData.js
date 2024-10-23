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
      sx={({ palette }) => ({
        bgcolor: "background.paper",
        border: `1px solid ${palette.grey.main}`,
        borderLeft: "none",
        borderRight: "none",
        scrollMargin: "40px",
      })}
    >
      <TreeView
        items={primaryProfile.items}
        onLabelClick={handleLabelClick}
        sx={(theme) => ({
          width: `calc((100vw - ${theme.widths.values.lg}px)/2 + 79px)`,
          minWidth: theme.typography.pxToRem(300),
          paddingTop: theme.typography.pxToRem(76),
          flexShrink: 0,
          top: theme.typography.pxToRem(104),
          bottom: 0,
          position: "fixed",
          left: 0,
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
