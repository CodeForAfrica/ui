import { Section, RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import GuidingPrinciplesCard from "../GuidingPrinciplesCard";

const GuidingPrinciplesCardList = React.forwardRef(
  function GuidingPrinciplesCardList(props, ref) {
    const { principles, title, ...other } = props;

    if (!principles?.length) {
      return null;
    }
    return (
      <Section {...other} ref={ref}>
        <RichTypography variant="h4">{title}</RichTypography>
        <Box
          sx={{
            marginTop: { xs: "20px", lg: "40px" },
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
