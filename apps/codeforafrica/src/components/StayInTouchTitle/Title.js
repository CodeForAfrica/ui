import { RichTypography } from "@commons-ui/core";
import { styled } from "@mui/material/styles";
import React from "react";

const TypographyRoot = styled(RichTypography)(
  ({ theme: { typography, breakpoints } }) => ({
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: typography.pxToRem(23),
    [breakpoints.up("md")]: {
      marginBottom: 0,
    },
  })
);

function Title({ children }) {
  return <TypographyRoot>{children}</TypographyRoot>;
}

export default Title;
