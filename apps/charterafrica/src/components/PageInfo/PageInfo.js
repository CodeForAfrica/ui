import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import RichText from "@/charterafrica/components/RichText";

const PageInfo = React.forwardRef(function PageInfo(props, ref) {
  const { description, sx } = props;

  if (!description?.length) {
    return null;
  }
  return (
    <Box bgcolor="secondary.light" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: 2.5 }}>
        <RichText
          elements={description}
          color="neutral.dark"
          variant="p1"
          textAlign="center"
        />
      </Section>
    </Box>
  );
});

export default PageInfo;
