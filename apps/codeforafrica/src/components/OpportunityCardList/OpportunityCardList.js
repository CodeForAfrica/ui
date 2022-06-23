import Stack from "@mui/material/Stack";
import React from "react";

import OpportunityCard from "@/codeforafrica/components/OpportunityCard";

const OpportunityCardList = React.forwardRef(function OpportunityCardList(
  props,
  ref
) {
  const { opportunities, ...other } = props;

  if (!opportunities?.length) {
    return null;
  }
  return (
    <Stack spacing={{ xs: 5, md: 10 }} {...other} ref={ref}>
      {opportunities.map((opportunity) => (
        <OpportunityCard key={opportunity.name} {...opportunity} />
      ))}
    </Stack>
  );
});

export default OpportunityCardList;
