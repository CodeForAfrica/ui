import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import { Grid } from "@mui/material";
import React from "react";

import GuidingPrinciplesCard from "../GuidingPrinciplesCard";

const GuidingPrinciplesCardList = React.forwardRef(
  function GuidingPrinciplesCardList(props, ref) {
    const { list, title, sx } = props;

    if (!list?.length) {
      return null;
    }
    return (
      <Section
        sx={{
          px: { xs: 2.5, sm: 0 },
          py: { xs: 2.5, md: 10 },
          ...sx,
        }}
        ref={ref}
      >
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
          {list.map((principle) => (
            <Grid item key={principle.title}>
              <GuidingPrinciplesCard {...principle} />
            </Grid>
          ))}
        </Grid>
      </Section>
    );
  },
);

export default GuidingPrinciplesCardList;
