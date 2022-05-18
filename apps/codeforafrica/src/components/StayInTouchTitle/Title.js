import { RichTypography } from "@commons-ui/core";
import React from "react";

function Title({ children }) {
  return <RichTypography variant="footerCap">{children}</RichTypography>;
}

export default Title;
