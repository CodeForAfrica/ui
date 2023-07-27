import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import RichText from "@/charterafrica/components/RichText";

const HelpdeskPageContent = React.forwardRef(function HelpdeskPageContent(
  props,
  ref
) {
  const { description, link, sx } = props;

  return (
    <Box sx={{ backgroundColor: secondary[50], ...sx }} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "74.5px" } }}>
        <Box display="flex" flexDirection="column">
          <RichText
            elements={description}
            color="neutral.dark"
            variant="p3"
            sx={{
              mb: 2.5,
              typography: { md: "subheading" },
              "&:last-of-type": {
                mb: 0,
              },
            }}
          />
          {link?.label ? (
            <Button
              color="primary"
              component={link.href ? Link : undefined}
              href={link.href}
              size="small"
              variant="contained"
              sx={{ m: "0 auto", mt: 5, width: "fit-content" }}
            >
              {link.label}
            </Button>
          ) : null}
        </Box>
      </Section>
    </Box>
  );
});

HelpdeskPageContent.propTypes = {
  description: PropTypes.arrayOf(PropTypes.shape({})),
  link: PropTypes.shape({}),
};

HelpdeskPageContent.defaultProps = {
  description: undefined,
  link: undefined,
};

export default HelpdeskPageContent;
