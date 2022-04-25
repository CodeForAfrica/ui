import { RichTypography } from "@commons-ui/core";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
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

function Title({ title }) {
  return <TypographyRoot>{title}</TypographyRoot>;
}

Title.propTypes = {
  title: PropTypes.string,
};

Title.defaultProps = {
  title: undefined,
};

export default Title;
