import { RichTypography, Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import RichText from "@/charterafrica/components/RichText";

const Helpdesk = React.forwardRef(function Helpdesk(props, ref) {
  const { description, image, link, sx, title } = props;

  return (
    <Box bgcolor={secondary[200]} sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "74.5px" } }}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={7.5}
          justifyContent="center"
        >
          <Figure
            sx={{ height: 173.5, width: 173.5 }}
            ImageProps={{ alt: title, ...image }}
          />
          <Box display="flex" flexDirection="column">
            <RichTypography
              color="neutral.dark"
              html={false}
              textAlign={{ xs: "center", sm: "left" }}
              variant="h1Small"
              sx={{
                mb: 5,
                typography: { md: "h1" },
                width: { md: "max-content" },
              }}
            >
              {title}
            </RichTypography>
            <RichText
              elements={description}
              color="neutral.dark"
              maxWidth={478}
              variant="p3"
              sx={{ typography: { md: "subheading" } }}
            />
            {link?.label ? (
              <Button
                color="primary"
                component={link?.href ? Link : undefined}
                href={link?.href}
                size="small"
                variant="contained"
                sx={{ mt: 5, width: "fit-content" }}
              >
                {link?.label}
              </Button>
            ) : null}
          </Box>
        </Box>
      </Section>
    </Box>
  );
});

Helpdesk.propTypes = {
  description: PropTypes.arrayOf(PropTypes.shape({})),
  image: PropTypes.shape({}),
  title: PropTypes.node,
};

Helpdesk.defaultProps = {
  description: undefined,
  image: undefined,
  title: undefined,
};

export default Helpdesk;
