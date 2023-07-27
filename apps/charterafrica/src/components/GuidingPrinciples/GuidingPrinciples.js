import { RichTypography, Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import Accordion from "@/charterafrica/components/Accordion";

const GuidingPrinciples = React.forwardRef(
  function GuidingPrinciples(props, ref) {
    const { items, sx, title } = props;

    if (!items?.length) {
      return null;
    }
    return (
      <Box bgcolor="common.white" sx={sx} ref={ref}>
        <Section
          sx={{
            maxWidth: { md: "920px" },
            px: { xs: 2.5, sm: 0 },
            py: { xs: 5, md: 10 },
          }}
        >
          <RichTypography
            color="neutral.dark"
            mb={{ xs: 7.5 }}
            textAlign="center"
            typography={{ md: "h1" }}
            variant="h1Small"
          >
            {title}
          </RichTypography>
          <Accordion items={items} />
        </Section>
      </Box>
    );
  },
);

export default GuidingPrinciples;
