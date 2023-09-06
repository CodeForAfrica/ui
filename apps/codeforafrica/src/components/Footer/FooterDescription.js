/* eslint-env browser */
import { Figure, Link } from "@commons-ui/next";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichText from "@/codeforafrica/components/RichText";

const FooterDescription = React.forwardRef(
  function FooterDescription(props, ref) {
    const { description, logo, sx } = props;

    if (!(logo || description)) {
      return null;
    }
    return (
      <Stack alignItems={{ xs: "center", md: "flex-start" }} sx={sx} ref={ref}>
        <Link href="/">
          <Figure
            ImageProps={{ alt: logo.alt, src: logo.url }}
            sx={{
              display: {
                sm: "block",
              },
              height: { xs: "113px", md: "113px", lg: "113px" },
              width: { xs: "251px", md: "251px", lg: "251px" },
            }}
          />
        </Link>
        <RichText
          variant="footer"
          sx={{
            mt: "52px",
            textAlign: { xs: "center", md: "left" },
          }}
          ref={ref}
          elements={description}
        />
      </Stack>
    );
  },
);

FooterDescription.propTypes = {
  description: PropTypes.arrayOf(PropTypes.shape({})),
  logo: PropTypes.shape({}),
};

FooterDescription.defaultProps = {
  description: undefined,
  logo: undefined,
};

export default FooterDescription;
