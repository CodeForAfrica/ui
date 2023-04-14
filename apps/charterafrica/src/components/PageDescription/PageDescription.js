import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import LongFormRichText from "@/charterafrica/components/LongFormRichText";

const PageDescription = React.forwardRef(function PageDescription(props, ref) {
  const { description, sx } = props;

  if (!description) {
    return null;
  }
  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 10 } }}>
        <LongFormRichText
          color="neutral.dark"
          richTextBlockFields={{ content: description }}
        />
      </Section>
    </Box>
  );
});

export default PageDescription;
