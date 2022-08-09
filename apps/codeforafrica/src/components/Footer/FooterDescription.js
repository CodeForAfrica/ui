import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import React from "react";

import Figure from "@/codeforafrica/components/Figure";

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
          {...logo}
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
        sx={{ mt: "52px", textAlign: { xs: "center", md: "left" } }}
      >
        {children}
      </RichTypography>
    </Stack>
  );
});

FooterDescription.propTypes = {
  children: PropTypes.node,
  logo: PropTypes.string,
};

FooterDescription.defaultProps = {
  children: undefined,
  logo: undefined,
};

export default FooterDescription;
