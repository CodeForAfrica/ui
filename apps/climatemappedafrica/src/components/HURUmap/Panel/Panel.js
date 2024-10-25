import { useMediaQuery } from "@mui/material";
import React from "react";

import DesktopPanel from "./DesktopPanel";
import MobilePanel from "./MobilePanel";

function Panel(props) {
  // Since desktop uses a drawer (with a timer), display: "none" on DesktopPanel
  // may not be enough to stop the drawer from opening in mobile & hence use of
  // conditional rendering.
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  return (
    <>
      {!isDesktop && <MobilePanel {...props} />}
      {isDesktop && <DesktopPanel {...props} />}
    </>
  );
}

export default Panel;
