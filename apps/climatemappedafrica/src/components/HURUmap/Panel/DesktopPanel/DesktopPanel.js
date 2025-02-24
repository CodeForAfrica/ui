import { Drawer } from "@mui/material";
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
    // toggle value if the same
    setValue((oldValue) => (oldValue !== newValue ? newValue : undefined));
  }, []);

  const open = value === "rich-data" && !tutorialOpen;
  return (
    <>
      <PanelButtons
        {...props}
        onValueChange={handleValueChange}
        open={open}
        value={value}
      />
      <Drawer
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
          },
        }}
        {...(open && { variant: "persistent" })}
        PaperProps={{
          elevation: 0,
          square: true,
          sx: () => ({
            background: "transparent",
            border: "none",
            display: "flex",
            flexDirection: "row",
            // Setting Drawer persistent causes header to be non sticky. We are setting the height to 100vh - 88px to account for the toolbar height.
            height: "calc(100vh - 88px)", // Toolbar height
            overflowY: "visible",
            position: "relative",
            top: 0,
          }),
        }}
      >
        <PanelItem {...props} item={{ value: "rich-data" }} />
      </Drawer>
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
