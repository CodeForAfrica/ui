import { Section, RichTypography } from "@commons-ui/core";
import Grid from "@mui/material/Grid";
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
        <Grid
          container
          alignItems="stretch"
          rowSpacing={{ xs: 1.25, sm: 2.5, lg: 5 }}
          sx={{
            marginTop: { xs: "20px", lg: "40px" },
            justifyContent: "space-between",
          }}
        >
          {principles.map((principle) => (
            <Grid item key={principle.title}>
              <GuidingPrinciplesCard {...principle} />
            </Grid>
          ))}
        </Grid>
      </Section>
    );
  }
);

export default GuidingPrinciplesCardList;
