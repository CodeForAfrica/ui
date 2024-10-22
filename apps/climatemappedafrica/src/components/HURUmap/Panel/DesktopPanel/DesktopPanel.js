import { Box, Drawer } from "@mui/material";
import { useTour } from "@reactour/tour";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";

import PanelButtons from "./PanelButtons";
import PanelItem from "./PanelItem";

function DesktopPanel({ sx, ...props }) {
  const [value, setValue] = useState();
  const { isOpen: tutorialOpen } = useTour();

  const closeDrawer = () => {
    setValue(undefined);
  };
  const handleValueChange = useCallback((newValue) => {
    console.log("BOOM H: ", newValue);
    // toggle value if the same
    setValue((oldValue) => (oldValue !== newValue ? newValue : undefined));
  }, []);

  const open = value === "rich-data" && !tutorialOpen;
  return (
    <Box sx={sx}>
      <Drawer
        // variant="persistent"
        anchor="left"
        onClose={closeDrawer}
        open={open}
        sx={({ typography }) => ({
          display: "flex",
          height: "100%",
          minWidth: typography.pxToRem(1050),
          maxWidth: "max-content",
          overflowY: "visible",
          position: "relative",
        })}
        // This needs to match panel button open/close duration
        transitionDuration={200}
        ModalProps={{
          sx: {
            overflowY: "scroll",
            overscrollBehaviorBlock: "none",
            top: 104, // Toolbar height
          },
        }}
        PaperProps={{
          elevation: 0,
          square: true,
          sx: {
            background: "transparent",
            border: "none",
            display: "flex",
            flexDirection: "row",
            height: "100%",
            overflowY: "visible",
            position: "absolute",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
          }}
        >
          <PanelItem {...props} item={{ value: "rich-data" }} />
        </Box>
      </Drawer>
      <PanelButtons
        {...props}
        onValueChange={handleValueChange}
        open={open}
        value={value}
      />
    </Box>
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
