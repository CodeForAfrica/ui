import { Drawer } from "@mui/material";
import PropTypes from "prop-types";
import React, { useRef } from "react";

import PanelButtons from "./PanelButtons";
import PanelItem from "./PanelItem";
import useStyles from "./useStyles";

function DesktopPanel(props) {
  const classes = useStyles(props);
  const paperRef = useRef();

  return (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        open
        classes={{
          root: classes.root,
          paper: classes.paper,
        }}
        PaperProps={{ ref: paperRef }}
      >
        <div className={classes.tabPanel}>
          <PanelItem {...props} item={{ value: "rich-data" }} />
        </div>
      </Drawer>
      <PanelButtons {...props} drawerRef={paperRef} />
    </>
  );
}

DesktopPanel.propTypes = {
  isCompare: PropTypes.bool,
  isPinning: PropTypes.bool,
  onClickPin: PropTypes.func,
  onClickUnpin: PropTypes.func,
  panelItems: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      children: PropTypes.node,
      tree: PropTypes.shape({}),
    }),
  ),
  primaryProfile: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default DesktopPanel;
