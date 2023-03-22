import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import AllConsultations from "./AllConsultations";

const Consultations = forwardRef((props, ref) => {
  const { config, featuredConsultations, otherConsultations } = props;
  return (
    <Box ref={ref}>
      <AllConsultations
        sx={{ py: 6.25 }}
        title=""
        isFeatured
        airedOn={featuredConsultations.airedOn}
        consultationTitle={featuredConsultations?.title}
        items={featuredConsultations?.items}
        config={config}
      />
      <AllConsultations
        sx={{ py: 12.5 }}
        airedOn={otherConsultations.airedOn}
        title={config.previousTitle}
        consultationTitle={otherConsultations?.title}
        items={otherConsultations?.items}
        config={config}
      />
    </Box>
  );
});

Consultations.propTypes = {
  config: PropTypes.shape({}),
  featuredConsultations: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  otherConsultations: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

Consultations.defaultProps = {
  config: undefined,
  featuredConsultations: undefined,
  otherConsultations: undefined,
};

export default Consultations;
