import { RichTypography } from "@commons-ui/core";
import React from "react";

function Title({ children }) {
  return (
    <RichTypography
      sx={{ marginBottom: { md: 0, xs: "1.438rem" } }}
      variant="footerCap"
    >
      {children}
    </RichTypography>
  );
}

export default Title;
