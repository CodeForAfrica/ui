import { Link } from "@commons-ui/next";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Figure from "@/codeforafrica/components/Figure";

function FooterDescription({ description, logo }) {
  if (!description) {
    return null;
  }
  return (
    <>
      <Link href="/">
        <Figure
          priority
          {...logo}
          sx={{
            display: {
              sm: "block",
            },
            height: { sm: "113px", md: "113px", lg: "113px" },
            width: { sm: "251px", md: "251px", lg: "251px" },
          }}
        />
      </Link>
      <Typography
        variant="body1"
        sx={{ marginTop: "3.125rem", fontSize: { md: 12, xs: 12 } }}
      >
        {description}
      </Typography>
    </>
  );
}

FooterDescription.propTypes = {
  description: PropTypes.string,
};

FooterDescription.defaultProps = {
  description: undefined,
};

export default FooterDescription;
