import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import React from "react";

import Figure from "@/codeforafrica/components/Figure";

function FooterDescription({ children, logo }) {
  if (!(logo || children)) {
    return null;
  }
  return (
    <Stack alignItems={{ xs: "center", md: "flex-start" }}>
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
        sx={{ mt: "3.125rem", textAlign: { xs: "center", md: "left" } }}
      >
        {children}
      </RichTypography>
    </Stack>
  );
}

FooterDescription.propTypes = {
  description: PropTypes.string,
};

FooterDescription.defaultProps = {
  description: undefined,
};

export default FooterDescription;
