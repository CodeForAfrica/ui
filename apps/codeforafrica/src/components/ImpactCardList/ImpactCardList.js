import { Section } from "@commons-ui/core";
import { Grid } from "@mui/material";
import React from "react";

import ImpactCard from "../ImpactCard/ImpactCard";

const ImpactCardList = React.forwardRef(function ImpactCardList(props, ref) {
  const { initiatives } = props;
  return (
    <Section
      sx={{
        backgroundColor: "background.main",
        px: { xs: 2.5, sm: 2.5, md: 0 },
        py: { xs: 5.25, sm: 5.25, md: 10.25, lg: 4.25, xl: 12.75 },
      }}
      ref={ref}
    >
      <Grid container justifyContent="space-around">
        {initiatives?.map((initiative) => {
          return <ImpactCard key={initiative.title} initiative={initiative} />;
        })}
      </Grid>
    </Section>
  );
});

export default ImpactCardList;
