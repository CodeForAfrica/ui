/* eslint-env browser */
import { Figure, Link, RichTypography } from "@commons-ui/next";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const FooterDescription = React.forwardRef(function FooterDescription(
  props,
  ref
) {
  const { children, logo, sx } = props;

  if (!(logo || children)) {
    return null;
  }
  return (
    <Stack alignItems={{ xs: "center", md: "flex-start" }} sx={sx} ref={ref}>
      <Link href="/">
        <Figure
          ImageProps={{ alt: "Code for Africa", ...logo }}
          sx={{
            display: {
              sm: "block",
            },
            height: { xs: "113px", md: "113px", lg: "113px" },
            width: { xs: "251px", md: "251px", lg: "251px" },
          }}
        />
      </Link>
      <RichTypography
        variant="footer"
        LinkProps={{
          color: "text.secondary",
        }}
        sx={{
          mt: "52px",
          textAlign: { xs: "center", md: "left" },
        }}
        ref={ref}
      >
        {children}
      </RichTypography>
    </Stack>
  );
});

FooterDescription.propTypes = {
  children: PropTypes.node,
  logo: PropTypes.shape({}),
};

FooterDescription.defaultProps = {
  children: undefined,
  logo: undefined,
};

export default FooterDescription;
