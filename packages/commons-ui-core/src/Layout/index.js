import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const BoxRoot = styled(Box)(() => ({
  root: {
    width: "100%",
  },
}));

const Layout = React.forwardRef(function Layout({ children, ...props }, ref) {
  return (
    <BoxRoot {...props} ref={ref}>
      {children}
    </BoxRoot>
  );
});

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
