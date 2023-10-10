import { Stack } from "@mui/material";
import React from "react";

import OpportunityCard from "@/codeforafrica/components/OpportunityCard";

const OpportunityCardList = React.forwardRef(
  function OpportunityCardList(props, ref) {
    const { opportunities, readMore, ...other } = props;

    if (!opportunities?.length) {
      return null;
    }
    return (
      <Stack spacing={{ xs: 5, md: 10 }} {...other} ref={ref}>
        {opportunities.map((opportunity) => (
          <OpportunityCard
            {...opportunity}
            key={opportunity.href}
            readMore={readMore}
          />
        ))}
      </Stack>
    );
  },
);

export default OpportunityCardList;
