import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import ConsultationList from "./ConsultationList";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const Consultations = forwardRef((props, ref) => {
  const {
    config,
    featuredConsultations: { items },
    otherConsultations,
  } = props;
  return (
    <Box bgcolor="common.white" ref={ref}>
      <ConsultationList
        sx={{ py: 6.25 }}
        isFeatured
        items={items}
        config={config}
      />
      <Box sx={{ py: 12.5 }}>
        <LineClampedRichTypography
          color="neutral.dark"
          lineClamp={1}
          textAlign="center"
          variant="h2"
        >
          {config.previousTitle}
        </LineClampedRichTypography>
        <ConsultationList
          title={otherConsultations?.title}
          items={otherConsultations?.items}
          config={config}
        />
      </Box>
    </Box>
  );
});

Consultations.propTypes = {
  config: PropTypes.shape({}),
  featuredConsultations: PropTypes.arrayOf(PropTypes.shape({})),
  otherConsultations: PropTypes.arrayOf(PropTypes.shape({})),
};

Consultations.defaultProps = {
  config: undefined,
  featuredConsultations: undefined,
  otherConsultations: undefined,
};

export default Consultations;
