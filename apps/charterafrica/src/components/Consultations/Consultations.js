import { RichTypography, Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import ConsultationList from "./ConsultationList";

import { neutral } from "@/charterafrica/colors";
import RichText from "@/charterafrica/components/RichText";

const Consultations = forwardRef((props, ref) => {
  const { config, description, featured, playlist, title } = props;
  return (
    <Box bgcolor="common.white" ref={ref}>
      <Section
        sx={{
          borderTop: `1px solid ${neutral[200]}`,
          px: { xs: 5, sm: 0 },
          py: { xs: 5, md: 10 },
        }}
      >
        <RichTypography color="neutral.dark" variant="h2">
          {title}
        </RichTypography>
        <RichText
          color="neutral.dark"
          elements={description}
          variant="p3"
          sx={{ mt: 2.5 }}
        />
      </Section>
      <ConsultationList isFeatured items={featured} config={config} />
      <ConsultationList {...playlist} config={config} />
    </Box>
  );
});

Consultations.propTypes = {
  config: PropTypes.shape({}),
  featured: PropTypes.arrayOf(PropTypes.shape({})),
  playlist: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string.isRequired,
  }),
};

Consultations.defaultProps = {
  config: undefined,
  featured: undefined,
  playlist: undefined,
};

export default Consultations;
