import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import RichText from "@/charterafrica/components/RichText";

const PageDescription = React.forwardRef(function PageDescription(props, ref) {
  const { description, sx } = props;

  if (!description) {
    return null;
  }
  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 10 } }}>
        <Box
          color="neutral.dark"
          sx={(theme) => ({
            "& h1": {
              ...theme.typography.h1Small,
              mb: 3.75,
              [theme.breakpoints.up("md")]: {
                ...theme.typography.h1Small,
              },
            },
            "& h2": {
              mb: 2.5,
              ...theme.typography.h2Small,
              [theme.breakpoints.up("md")]: {
                ...theme.typography.h2Small,
              },
            },
            "& p": {
              ...theme.typography.p1,
              mb: 2,
              [theme.breakpoints.up("md")]: {
                ...theme.typography.subheading,
              },
            },
            "& p:last-of-type": {
              mb: 0,
            },
          })}
        >
          <RichText color="neutral.dark" elements={description} />
        </Box>
      </Section>
    </Box>
  );
});

export default PageDescription;
