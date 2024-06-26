import { RichTypography, Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichText from "@/charterafrica/components/RichText";

const Helpdesk = React.forwardRef(function Helpdesk(props, ref) {
  const { description, image, link, sx, title } = props;

  if (!title?.length) {
    return null;
  }
  return (
    <Box bgcolor="secondary.light" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "74.5px" } }}>
        <Box
          alignItems="center"
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          gap={7.5}
          justifyContent="center"
        >
          <Figure
            sx={{ height: 173.5, width: 173.5 }}
            ImageProps={{ alt: title, src: image.src || image.url }}
          />
          <Box display="flex" flexDirection="column">
            <RichTypography
              color="neutral.dark"
              html={false}
              textAlign={{ xs: "center", md: "left" }}
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
              color="neutral.dark"
              elements={description}
              maxWidth={478}
              textAlign={{ xs: "center", md: "left" }}
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
                sx={{
                  mt: 5,
                  mx: { xs: "auto", md: 0 },
                  width: "fit-content",
                }}
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
