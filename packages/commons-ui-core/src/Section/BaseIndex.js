import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import Layout from "../Layout";
import RichTypography from "../RichTypography";

const RichTypographyStyled = styled(RichTypography)(() => ({
  title: {},
}));

const LayoutStyled = styled(Layout)(({ theme }) => ({
  boxSizing: "border-box",
  display: "block", // Fix IE 11 layout when used with main.
  marginLeft: "auto",
  marginRight: "auto",
  minWidth: theme.typography.pxToRem(360),
  padding: `0 ${theme.typography.pxToRem(15)}`,
  width: "100%",
}));

const Section = React.forwardRef(function Section(
  { children, title, titleProps, ...props },
  ref
) {
  if (!children) {
    return null;
  }
  return (
    <LayoutStyled {...props} ref={ref}>
      {title?.length ? (
        <RichTypographyStyled variant="h2" {...titleProps}>
          {title}
        </RichTypographyStyled>
      ) : null}

      {children}
    </LayoutStyled>
  );
});

Section.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  title: PropTypes.string,
  titleProps: PropTypes.shape({}),
};

Section.defaultProps = {
  title: undefined,
  titleProps: undefined,
};

export default Section;
