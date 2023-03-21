import { Box } from "@mui/material";
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
      />
    </Box>
  );
});

export default Consultations;
