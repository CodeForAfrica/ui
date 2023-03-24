import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import ConsultationList from "./ConsultationList";

const Consultations = forwardRef((props, ref) => {
  const { config, featured, consultations, title } = props;
  return (
    <Box bgcolor="common.white" ref={ref}>
      <ConsultationList
        sx={{ py: 6.25 }}
        isFeatured
        items={featured}
        config={config}
      />
      <ConsultationList title={title} items={consultations} config={config} />
    </Box>
  );
});

Consultations.propTypes = {
  config: PropTypes.shape({}),
  featured: PropTypes.arrayOf(PropTypes.shape({})),
  consultations: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string.isRequired,
};

Consultations.defaultProps = {
  config: undefined,
  featured: undefined,
  consultations: undefined,
};

export default Consultations;
