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
