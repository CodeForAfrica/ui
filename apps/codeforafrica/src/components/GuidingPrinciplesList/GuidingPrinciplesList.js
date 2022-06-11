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
    <Section ref={ref}>
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
