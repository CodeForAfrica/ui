import { styled } from "@mui/material/styles";
import React from "react";

const ShareBarRoot = styled("div", {
  name: "ShareBar",
  slot: "Root",
})({
  display: "inline-flex",
  columnGap: 17,
});

const ShareBar = React.forwardRef(function ShareBar(props, ref) {
  return <ShareBarRoot {...props} ref={ref} />;
});

export default ShareBar;
