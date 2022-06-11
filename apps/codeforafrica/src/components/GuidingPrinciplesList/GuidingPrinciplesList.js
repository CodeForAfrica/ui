import { Section, RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import GuidingPrinciplesCard from "../GuidingPrinciplesCard";

const GuidingPrinciplesList = React.forwardRef(function GuidingPrinciplesList(
  props,
  ref
) {
  const { title, principles } = props;

  if (!principles) {
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
});

export default GuidingPrinciplesList;
