import { Section, RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import GuidingPrinciplesCard from "../GuidingPrinciplesCard";

const GuidingPrinciplesCardList = React.forwardRef(
  function GuidingPrinciplesCardList(props, ref) {
    const { title, principles } = props;

    if (!principles?.length) {
      return null;
    }
    return (
      <Section
        sx={{
          py: { xl: 10, lg: 7.75, md: 6.5, xs: 5 },
          px: { xs: 2.5, sm: 0, md: 0 },
        }}
        ref={ref}
      >
        <RichTypography variant="h4">{title}</RichTypography>
        <Box
          sx={{
            marginTop: { lg: "40px", xs: "20px" },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {principles.map((principle) => (
            <GuidingPrinciplesCard key={principle.title} {...principle} />
          ))}
        </Box>
      </Section>
    );
  }
);

export default GuidingPrinciplesCardList;
